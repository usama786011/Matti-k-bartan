import React, { useState } from 'react';
import { ShoppingBag, LayoutDashboard, Store, Palette, Package, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onViewChange, currentView, isAdminLoggedIn, onLogout }) => {
  const { cartItems } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(15px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      padding: '0.75rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          onClick={() => onViewChange('shop')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            color: 'var(--secondary)'
          }}
        >
          <div style={{
            background: 'var(--primary)',
            padding: '6px',
            borderRadius: '10px',
            color: 'white',
            display: 'flex'
          }}>
            <Palette size={20} />
          </div>
          <span className="hide-on-mobile" style={{ fontWeight: '800', letterSpacing: '-1px' }}>Riwaayat Pots</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => onViewChange('shop')}
            className="nav-btn"
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              background: currentView === 'shop' ? 'var(--primary)' : 'transparent',
              color: currentView === 'shop' ? 'white' : 'var(--secondary)',
              boxShadow: currentView === 'shop' ? '0 4px 12px rgba(194, 65, 12, 0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Palette size={16} /> <span className="hide-on-mobile">Home</span>
          </button>

          <button
            onClick={() => onViewChange('catalog')}
            className="nav-btn"
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              background: currentView === 'catalog' ? 'var(--primary)' : 'transparent',
              color: currentView === 'catalog' ? 'white' : 'var(--secondary)',
              boxShadow: currentView === 'catalog' ? '0 4px 12px rgba(194, 65, 12, 0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Store size={16} /> <span className="hide-on-mobile">Catalog</span>
          </button>

          {isAdminLoggedIn && (
            <button
              onClick={() => onViewChange('inventory')}
              className="nav-btn"
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem',
                background: currentView === 'inventory' ? 'var(--primary)' : 'transparent',
                color: currentView === 'inventory' ? 'white' : 'var(--secondary)',
                boxShadow: currentView === 'inventory' ? '0 4px 12px rgba(194, 65, 12, 0.15)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <Package size={16} /> <span className="hide-on-mobile">Inventory</span>
            </button>
          )}

          <div style={{ width: '1px', height: '20px', background: '#eee', margin: '0 0.4rem' }}></div>

          <button
            onClick={() => onViewChange('cart')}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              background: currentView === 'cart' ? 'var(--accent)' : 'rgba(34, 197, 94, 0.08)',
              color: currentView === 'cart' ? 'white' : 'var(--accent)',
              position: 'relative',
              boxShadow: currentView === 'cart' ? '0 4px 12px rgba(34, 197, 94, 0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '0.65rem',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1.5px solid white'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Section */}
          <div style={{ position: 'relative', marginLeft: '0.25rem' }}>
            <button
              onClick={() => isAdminLoggedIn ? setIsProfileOpen(!isProfileOpen) : onViewChange('inventory')}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: isAdminLoggedIn ? 'var(--secondary)' : '#f1f3f5',
                color: isAdminLoggedIn ? 'white' : '#777',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isAdminLoggedIn ? '1.5px solid rgba(255,255,255,0.2)' : '1px solid #e9ecef',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isAdminLoggedIn ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
              onMouseEnter={(e) => !isAdminLoggedIn && (e.currentTarget.style.background = '#e9ecef')}
              onMouseLeave={(e) => !isAdminLoggedIn && (e.currentTarget.style.background = '#f1f3f5')}
            >
              <User size={16} />
            </button>

            <AnimatePresence>
              {isProfileOpen && isAdminLoggedIn && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: '180px',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f1f1f1',
                      padding: '0.4rem',
                      zIndex: 1001
                    }}
                  >
                    <div style={{ padding: '0.6rem 0.8rem', borderBottom: '1px solid #f8f9fa', marginBottom: '0.3rem' }}>
                      <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.1rem' }}>Administrator</p>
                      <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary)' }}>Admin Profile</p>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        color: 'var(--danger)',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fff5f5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span style={{ fontWeight: '600' }}>Logout</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
