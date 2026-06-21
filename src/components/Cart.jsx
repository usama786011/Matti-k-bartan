import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus, CreditCard, Truck, CheckCircle, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from 'emailjs-com';

const Cart = ({ onBack }) => {
  const { cartItems, removeFromCart, decrementQuantity, addToCart, clearCart, totalAmount } = useCart();
  const { commitStockToFirebase } = useProducts();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderNumber = `MA-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const orderDetails = cartItems.map(item => `${item.name} (x${item.quantity}) - Rs. ${item.price * item.quantity}`).join('\n');

    const orderData = {
      orderNumber,
      customer: shippingData,
      items: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
      totalAmount,
      paymentMethod,
      status: 'Pending',
      createdAt: new Date()
    };

    try {
      if (db) {
        await addDoc(collection(db, 'orders'), orderData);
        // Only NOW commit the stock deductions to Firebase
        commitStockToFirebase(orderData.items);
      }
    } catch (error) {
      console.error("Error saving order to database:", error);
    }

    setPlacedOrderNumber(orderNumber);

    // Prepare data for FormSubmit API
    // FormSubmit automatically sends this data to clebiztesting@gmail.com
    // And _autoresponse automatically sends a "Thank you" email back to the customer's email
    const formData = {
      name: shippingData.name,
      email: shippingData.email, // Customer's email for the autoresponse
      Phone: shippingData.phone,
      Address: `${shippingData.address}, ${shippingData.city}`,
      Payment_Method: paymentMethod,
      Order_Number: orderNumber,
      Order_Total: `Rs. ${totalAmount.toLocaleString()}`,
      Order_Details: orderDetails,
      _subject: `New Order #${orderNumber} from ${shippingData.name}!`, // Admin email subject
      _template: "table", // Formats the admin email nicely
      _autoresponse: `Thank you for your order, ${shippingData.name}!\n\nYour Order Number is: ${orderNumber}\n\nYour order total is Rs. ${totalAmount.toLocaleString()}.\nPayment Method: ${paymentMethod}\n\nOrder Details:\n${orderDetails}\n\nWe are processing your order and will dispatch it to ${shippingData.city} soon.\n\nRegards,\nRiwaayat Pots Team`
    };

    fetch("https://formsubmit.co/ajax/clebiztesting@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("FormSubmit Success:", data);
        setIsProcessing(false);
        setIsOrderPlaced(true);
        clearCart(true); // Don't return to stock
      })
      .catch(error => {
        console.error("FormSubmit Error:", error);
        alert("Order placed, but there was an issue sending the confirmation email. Our team will contact you.");
        setIsProcessing(false);
        setIsOrderPlaced(true);
        clearCart(true); // Don't return to stock
      });
  };

  if (isOrderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '4rem 0' }}
      >
        <div style={{
          background: 'var(--accent)',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: 'white',
          boxShadow: '0 10px 30px rgba(22, 101, 52, 0.3)'
        }}>
          <CheckCircle size={50} />
        </div>
        <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', marginBottom: '1rem' }}>Order Placed!</h2>
        <div style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#f0fdf4', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1.5rem', borderRadius: '12px', border: '1px solid rgba(21, 128, 61, 0.15)' }}>
          Order Number: {placedOrderNumber}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Thank you, {shippingData.name}! Your order has been received and is being prepared for shipment.
        </p>
        <button
          onClick={onBack}
          style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '16px',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 4px 15px rgba(194, 65, 12, 0.2)'
          }}
        >
          <Package size={20} /> Back to Collection
        </button>
      </motion.div>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{
          background: 'var(--glass-border)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: 'var(--text-muted)'
        }}>
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your bag is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Discover our unique handcrafted pottery pieces.</p>
        <button
          onClick={onBack}
          style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '16px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ArrowLeft size={20} /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <button
            onClick={isCheckingOut ? () => setIsCheckingOut(false) : onBack}
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}
          >
            <ArrowLeft size={18} /> {isCheckingOut ? 'Back to Bag' : 'Continue Shopping'}
          </button>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', fontWeight: '600' }}>
            {isCheckingOut ? 'Secure Checkout' : 'Your Shopping Bag'}
          </h2>
        </div>
        {!isCheckingOut && (
          <button
            onClick={() => clearCart(false)}
            style={{ color: 'var(--danger)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      <div className={`responsive-two-column-grid ${isCheckingOut ? 'checkout' : ''}`}>
        {/* Left Side: Items or Checkout Form */}
        <div>
          {isCheckingOut ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism"
              style={{ padding: '2.5rem', background: 'white' }}
            >
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Truck size={24} style={{ color: 'var(--primary)' }} /> Shipping Information
              </h3>
              <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Full Name</label>
                  <input
                    type="text" required placeholder="John Doe"
                    value={shippingData.name}
                    onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                    style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
                    <input
                      type="email" required placeholder="john@example.com"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Phone Number</label>
                    <input
                      type="tel" required placeholder="+92 300 1234567"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', outline: 'none' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Shipping Address</label>
                  <input
                    type="text" required placeholder="Street address, Apartment, etc."
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>City</label>
                  <select
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', outline: 'none' }}
                  >
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                    <div
                      onClick={() => setPaymentMethod('COD')}
                      style={{ padding: '1rem', borderRadius: '12px', border: paymentMethod === 'COD' ? '2px solid var(--primary)' : '1px solid #eee', background: paymentMethod === 'COD' ? '#fff9f5' : '#f9f9f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                    >
                      <input type="radio" checked={paymentMethod === 'COD'} readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Cash on Delivery (COD)</span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Pay when you receive your order.</span>
                      </div>
                    </div>
                    <div
                      onClick={() => setPaymentMethod('Easypaisa')}
                      style={{ padding: '1rem', borderRadius: '12px', border: paymentMethod === 'Easypaisa' ? '2px solid var(--primary)' : '1px solid #eee', background: paymentMethod === 'Easypaisa' ? '#fff9f5' : '#f9f9f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                    >
                      <input type="radio" checked={paymentMethod === 'Easypaisa'} readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Easypaisa</span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Pay securely via your Easypaisa account.</span>
                      </div>
                    </div>
                    <div
                      onClick={() => setPaymentMethod('Jazzcash')}
                      style={{ padding: '1rem', borderRadius: '12px', border: paymentMethod === 'Jazzcash' ? '2px solid var(--primary)' : '1px solid #eee', background: paymentMethod === 'Jazzcash' ? '#fff9f5' : '#f9f9f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                    >
                      <input type="radio" checked={paymentMethod === 'Jazzcash'} readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Jazzcash</span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Pay securely via your Jazzcash account.</span>
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {(paymentMethod === 'Easypaisa' || paymentMethod === 'Jazzcash') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1rem', background: '#fff4eb', borderRadius: '12px', border: '1px dashed var(--primary)', marginTop: '0.5rem' }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                            Please transfer the total amount to the following {paymentMethod} account to confirm your order:
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #eee' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>03125587469</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>Account Title: Riwaayat Pots</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    marginTop: '1rem',
                    opacity: isProcessing ? 0.7 : 1,
                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isProcessing ? 'Processing Order...' : `Confirm Order - Rs. ${totalAmount.toLocaleString()}`}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="glass-morphism" style={{ background: 'white', padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: '600', margin: 0 }}>Cart Items ({cartItems.length})</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        background: 'white',
                        borderBottom: index !== cartItems.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                        <div style={{ flexGrow: 1 }}>
                          <h3 style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{item.name}</h3>
                          <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '0.95rem' }}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: '#f8f9fa',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '8px',
                            border: '1px solid #eee'
                          }}>
                            <button onClick={() => decrementQuantity(item.id)} style={{ color: '#666', display: 'flex', alignItems: 'center' }}><Minus size={14} /></button>
                            <span style={{ fontWeight: '700', minWidth: '16px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                            <button onClick={() => addToCart(item)} style={{ color: '#666', display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              color: 'var(--danger)',
                              opacity: 0.7,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.4rem',
                              borderRadius: '6px',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#fff0f0'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary (Simplified when checking out) */}
        <div className="glass-morphism" style={{ padding: '2rem', height: 'fit-content', position: 'sticky', top: '7rem', background: 'white' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Subtotal</span>
              <span>Rs. {totalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Estimated Shipping</span>
              <span style={{ color: 'var(--success)', fontWeight: '600' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Taxes</span>
              <span>Rs. 0</span>
            </div>
            <div style={{ height: '1px', background: '#eee', margin: '0.5rem 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {!isCheckingOut && (
            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '1.25rem',
                borderRadius: '16px',
                fontSize: '1.1rem'
              }}
            >
              <CreditCard size={20} /> Checkout Now
            </button>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <CheckCircle size={14} style={{ color: 'var(--success)' }} /> Safe & Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
