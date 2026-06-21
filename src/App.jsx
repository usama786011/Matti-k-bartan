import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AdminPanel from './components/AdminPanel';
import Inventory from './components/Inventory';
import UserStory from './components/UserStory';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import { useProducts } from './context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, LogIn, Store, Palette, LayoutDashboard, ScrollText } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('shop');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false); // For the modal in Inventory view
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { products, deleteProduct, categories } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleViewChange = (view, category = null) => {
    if ((view === 'admin' || view === 'inventory' || view === 'orders') && !isAdminLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      if (view === 'catalog') {
        setActiveCategory(category);
      } else {
        setActiveCategory(null);
      }
      setCurrentView(view);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCredentials.user === 'clebiztesting@gmail.com' && loginCredentials.pass === '123') {
      setIsAdminLoggedIn(true);
      setIsLoginModalOpen(false);
      setCurrentView('inventory');
      setLoginError('');
      setLoginCredentials({ user: '', pass: '' });
    } else {
      setLoginError('Invalid credentials. Hint: clebiztesting@gmail.com / 123');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('shop');
  };

  const openAdminModal = (product = null) => {
    setEditingProduct(product);
    setIsAdminPanelOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar
        onViewChange={handleViewChange}
        currentView={currentView}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
      />

      <main className="container" style={{ paddingBottom: '5rem' }}>
        <AnimatePresence mode="wait">
          {currentView === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <UserStory onViewChange={handleViewChange} />
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div id="catalog-section" style={{ marginTop: '2rem' }}>
                <header style={{ margin: '3rem 0', textAlign: 'center' }}>
                  <h2 style={{
                    fontSize: '3.5rem',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--secondary)',
                    letterSpacing: '-1px'
                  }}>
                    {activeCategory ? activeCategory : 'Full Collection'}
                  </h2>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                  }}>
                    {activeCategory ? `Browse our complete range of ${activeCategory}.` : 'Browse our complete range of handcrafted clay masterpieces.'}
                  </p>
                </header>

                {/* Category Filter Pills */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                  <button
                    onClick={() => setActiveCategory(null)}
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                    className={!activeCategory ? "btn-primary" : "btn-secondary"}
                  >
                    All Items
                  </button>
                  {categories && categories.filter(cat => products.some(p => p.category === cat)).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                      className={activeCategory === cat ? "btn-primary" : "btn-secondary"}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="product-grid-responsive">
                  {products.filter(p => !activeCategory || p.category === activeCategory).map(product => (
                    <ProductCard key={product.id} product={product} isAdmin={false} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'inventory' && isAdminLoggedIn && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Inventory
                onAdd={() => openAdminModal(null)}
                onEdit={(p) => openAdminModal(p)}
                onDelete={deleteProduct}
                onLogout={handleLogout}
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}

          {currentView === 'orders' && isAdminLoggedIn && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderHistory onBack={() => setCurrentView('inventory')} />
            </motion.div>
          )}

          {currentView === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Cart onBack={() => setCurrentView('shop')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Admin Panel Modal (Internal usage for Inventory) */}
      {isAdminPanelOpen && (
        <AdminPanel
          isModalOpen={isAdminPanelOpen}
          setIsModalOpen={setIsAdminPanelOpen}
          editingProduct={editingProduct}
          onLogout={handleLogout}
        />
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-morphism"
              style={{
                width: '90%',
                maxWidth: '450px',
                padding: '3rem',
                position: 'relative',
                background: 'white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAdminLoggedIn(false);
                  setCurrentView('shop');
                  setIsLoginModalOpen(false);
                }}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{
                  background: 'var(--primary)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(194, 65, 12, 0.2)'
                }}>
                  <Lock size={28} />
                </div>
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>Admin Access</h2>
                <p style={{ color: 'var(--text-muted)' }}>Secure portal for collection management</p>
              </div>

              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Username</label>
                  <input
                    type="text"
                    required
                    value={loginCredentials.user}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, user: e.target.value })}
                    placeholder="clebiztesting@gmail.com"
                    style={{
                      padding: '0.85rem',
                      borderRadius: '14px',
                      border: '1px solid #eee',
                      background: '#f9f9f9',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Password</label>
                  <input
                    type="password"
                    required
                    value={loginCredentials.pass}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, pass: e.target.value })}
                    placeholder="Enter 123"
                    style={{
                      padding: '0.85rem',
                      borderRadius: '14px',
                      border: '1px solid #eee',
                      background: '#f9f9f9',
                      outline: 'none'
                    }}
                  />
                </div>

                {loginError && (
                  <p style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center' }}>{loginError}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1.1rem',
                    borderRadius: '16px',
                    marginTop: '1rem',
                    fontSize: '1rem'
                  }}
                >
                  <LogIn size={18} /> Authorize
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer style={{
        background: 'linear-gradient(135deg, #1a0f00 0%, #2d1800 50%, #1a0f00 100%)',
        color: '#fff',
        marginTop: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top decorative wave */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--primary), #f59e0b, var(--primary))',
        }} />

        {/* Subtle background texture circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(194,65,12,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(245,158,11,0.05)', pointerEvents: 'none' }} />

        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '4rem'
          }} className="footer-grid">

            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem'
                }}>🏺</div>
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>Riwaayat Pots</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '2rem', maxWidth: '260px' }}>
                Preserving the ancient craft of clay pottery while bringing modern design to your everyday lifestyle.
              </p>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: '📘', label: 'Facebook', color: '#1877f2' },
                  { icon: '📸', label: 'Instagram', color: '#e1306c' },
                  { icon: '🐦', label: 'Twitter', color: '#1da1f2' },
                  { icon: '▶️', label: 'YouTube', color: '#ff0000' },
                ].map(({ icon, label, color }) => (
                  <button
                    key={label}
                    title={label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  { label: 'Home & Story', view: 'shop' },
                  { label: 'Our Collection', view: 'catalog' },
                  { label: 'Cart & Checkout', view: 'cart' },
                  { label: 'Admin Portal', view: 'inventory' },
                ].map(({ label, view }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleViewChange(view)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: 0,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >
                      <span style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>▶</span> {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Contact Us
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '📍', text: 'Multan Road, Lahore, Pakistan' },
                  { icon: '✉️', text: 'support@mattiart.pk' },
                  { icon: '📞', text: '+92 42 1234 5678' },
                  { icon: '⏰', text: 'Mon – Sat: 9am – 7pm' },
                ].map(({ icon, text }) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1.4 }}>{icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: '1.5' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Newsletter
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                Get new arrivals and exclusive offers straight to your inbox.
              </p>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.07)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
                    color: 'white',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 20px rgba(194,65,12,0.35)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Subscribe →
                </button>
              </form>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                🔒 No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', margin: '0 0 2rem' }} />

          {/* Bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', margin: 0 }}>
              © 2026 <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Riwaayat Pots</span>. Handcrafted with ❤️ in Pakistan. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Return Policy'].map(item => (
                <span key={item} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
