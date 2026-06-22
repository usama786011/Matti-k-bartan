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
import PrivacyPolicy from './components/StorePolicy';
import ShopTerms from './components/ShopTerms';
import WapsiPage from './components/WapsiPage';
import StoreSettings from './components/StoreSettings';
import AdminReviews from './components/AdminReviews';
import { useStore } from './context/StoreContext';

const VIEW_TO_PATH = {
  shop: '/', catalog: '/catalog', cart: '/cart',
  privacy: '/privacy', terms: '/terms', returns: '/returns',
  inventory: '/inventory', orders: '/orders', settings: '/settings', reviews: '/reviews',
};
const PATH_TO_VIEW = Object.fromEntries(Object.entries(VIEW_TO_PATH).map(([v, p]) => [p, v]));
const pathToView = (path) => PATH_TO_VIEW[path] || PATH_TO_VIEW[path.replace(/\/$/, '')] || 'shop';

const App = () => {
  const [currentView, setCurrentView] = useState(() => pathToView(window.location.pathname));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { products, deleteProduct, categories } = useProducts();
  const { settings } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const path = VIEW_TO_PATH[currentView] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ view: currentView }, '', path);
    }
  }, [currentView]);

  useEffect(() => {
    const onPop = (e) => {
      const view = pathToView(window.location.pathname);
      setCurrentView(view);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleViewChange = (view, category = null) => {
    if ((view === 'admin' || view === 'inventory' || view === 'orders' || view === 'settings' || view === 'reviews') && !isAdminLoggedIn) {
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

        {currentView === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PrivacyPolicy onBack={() => handleViewChange('shop')} />
          </motion.div>
        )}

        {currentView === 'terms' && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ShopTerms onBack={() => handleViewChange('shop')} />
          </motion.div>
        )}

        {currentView === 'returns' && (
          <motion.div
            key="returns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WapsiPage onBack={() => handleViewChange('shop')} />
          </motion.div>
        )}

        {currentView === 'settings' && isAdminLoggedIn && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StoreSettings onBack={() => handleViewChange('inventory')} />
          </motion.div>
        )}

        {currentView === 'reviews' && isAdminLoggedIn && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AdminReviews onBack={() => handleViewChange('inventory')} />
          </motion.div>
        )}
      </AnimatePresence>

      {!['inventory', 'orders', 'settings', 'admin', 'reviews'].includes(currentView) && <footer style={{
        background: 'linear-gradient(135deg, #1a0f00 0%, #2d1800 50%, #1a0f00 100%)',
        color: '#fff',
        marginTop: '0',
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
            gridTemplateColumns: '1.6fr 1fr 1fr',
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
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>{settings.name}</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '2rem', maxWidth: '260px' }}>
                {settings.tagline}
              </p>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  {
                    label: 'WhatsApp', color: '#25d366',
                    href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
                    svg: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.124 1.526 5.855L.057 23.428a.75.75 0 0 0 .918.943l5.747-1.505A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.21-3.668.961.977-3.565-.23-.366A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" /></svg>
                  },
                  {
                    label: 'Facebook', color: '#1877f2',
                    href: 'https://facebook.com',
                    svg: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                  },
                  {
                    label: 'Instagram', color: '#e1306c',
                    href: 'https://instagram.com',
                    svg: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                  },
                  {
                    label: 'YouTube', color: '#ff0000',
                    href: 'https://youtube.com',
                    svg: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                  },
                ].map(({ label, color, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '10px',
                      background: color,
                      border: `1px solid ${color}`,
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1'; }}
                  >
                    {svg}
                  </a>
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
                  { icon: '📍', text: settings.address },
                  { icon: '✉️', text: settings.email },
                  { icon: '📞', text: settings.phone },
                  { icon: '⏰', text: settings.timing },
                ].map(({ icon, text }) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1.4 }}>{icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: '1.5' }}>{text}</span>
                  </li>
                ))}
              </ul>
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
              {[
                { label: 'Privacy Policy', view: 'privacy' },
                { label: 'Terms of Service', view: 'terms' },
                { label: 'Return Policy', view: 'returns' },
              ].map(({ label, view }) => (
                <span
                  key={label}
                  onClick={() => view && handleViewChange(view)}
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', cursor: view ? 'pointer' : 'default', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = view ? 'var(--primary)' : 'rgba(255,255,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >{label}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>}
    </div>
  );
};

export default App;
