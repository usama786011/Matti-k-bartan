import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Package, Search, ArrowLeft, Clock, CheckCircle, Truck, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderHistory = ({ onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchString = `${order.orderNumber || ''} ${order.id} ${order.customer?.name} ${order.customer?.phone} ${order.customer?.city}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pendingOrders = orders.filter(o => !o.status || o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    let date;
    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    return new Intl.DateTimeFormat('en-PK', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#fff7ed', text: '#c2410c', icon: <Clock size={14} /> };
      case 'Processing': return { bg: '#eff6ff', text: '#1d4ed8', icon: <Info size={14} /> };
      case 'Shipped': return { bg: '#fef08a', text: '#ca8a04', icon: <Truck size={14} /> };
      case 'Delivered': return { bg: '#dcfce7', text: '#15803d', icon: <CheckCircle size={14} /> };
      default: return { bg: '#f3f4f6', text: '#4b5563', icon: <Info size={14} /> };
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <button
            onClick={onBack}
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={18} /> Back to Inventory
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)' }}>Order History</h2>
            <div style={{
              background: 'rgba(194, 65, 12, 0.1)',
              color: 'var(--primary)',
              padding: '0.4rem 0.8rem',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Package size={14} /> {orders.length} Total Orders
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Monitor and track all customer orders placed on Riwaayat Pots.</p>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="Search by ID, Name or City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '12px',
              border: '1px solid #eee',
              outline: 'none',
              background: 'white',
              width: '280px',
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
        </div>
      </div>

      {/* Stats Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div className="glass-morphism" style={{ padding: '1.5rem 2rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem', borderRadius: '20px' }}>
          <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Orders</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{orders.length}</div>
          </div>
        </div>
        <div className="glass-morphism" style={{ padding: '1.5rem 2rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem', borderRadius: '20px' }}>
          <div style={{ background: '#fff7ed', color: '#c2410c', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Pending Dispatch</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{pendingOrders}</div>
          </div>
        </div>
        <div className="glass-morphism" style={{ padding: '1.5rem 2rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem', borderRadius: '20px' }}>
          <div style={{ background: '#dcfce7', color: '#15803d', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Fulfilled Orders</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{deliveredOrders}</div>
          </div>
        </div>
        <div className="glass-morphism" style={{ padding: '1.5rem 2rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem', borderRadius: '20px' }}>
          <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>
            Rs
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Revenue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>Rs. {totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="glass-morphism" style={{ background: 'white', padding: '1rem', overflowX: 'auto', borderRadius: '24px' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Loading orders...</div>
        ) : (
          <table className="inventory-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f8f9fa' }}>
                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Order Info</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Customer</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Items</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total & Payment</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? paginatedOrders.map(order => {
                const statusStyles = getStatusColor(order.status || 'Pending');
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>
                        {order.orderNumber || `#${order.id.slice(-6).toUpperCase()}`}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(order.createdAt)}</div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--secondary)' }}>{order.customer?.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.customer?.phone}</div>
                      <div style={{ fontSize: '0.8rem', color: '#999' }}>{order.customer?.city}</div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--secondary)', maxWidth: '250px' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span style={{ fontWeight: 'bold' }}>{item.quantity}x</span> {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>Rs. {order.totalAmount?.toLocaleString()}</div>
                      <div style={{ fontSize: '0.8rem', background: '#f1f5f9', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', marginTop: '0.4rem', color: '#475569', fontWeight: '600' }}>
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{
                        background: statusStyles.bg,
                        color: statusStyles.text,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        border: '1px solid rgba(0,0,0,0.02)'
                      }}>
                        {statusStyles.icon}
                        <select
                          value={order.status || 'Pending'}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{
                            background: 'transparent',
                            color: 'inherit',
                            border: 'none',
                            outline: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            paddingRight: '4px'
                          }}
                        >
                          <option value="Pending" style={{ color: '#c2410c', background: '#fff' }}>Pending</option>
                          <option value="Processing" style={{ color: '#1d4ed8', background: '#fff' }}>Processing</option>
                          <option value="Shipped" style={{ color: '#ca8a04', background: '#fff' }}>Shipped</option>
                          <option value="Delivered" style={{ color: '#15803d', background: '#fff' }}>Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#999' }}>
                    <Package size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                    <p>No orders found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                background: currentPage === 1 ? '#f9fafb' : 'white',
                color: currentPage === 1 ? '#aaa' : 'var(--secondary)',
                fontWeight: '600',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  border: page === currentPage ? 'none' : '1px solid #e5e7eb',
                  background: page === currentPage ? 'var(--primary)' : 'white',
                  color: page === currentPage ? 'white' : 'var(--secondary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: page === currentPage ? '0 4px 12px rgba(194,65,12,0.25)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                background: currentPage === totalPages ? '#f9fafb' : 'white',
                color: currentPage === totalPages ? '#aaa' : 'var(--secondary)',
                fontWeight: '600',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
