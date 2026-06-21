import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, LayoutDashboard, Store, Palette, Package, User, LogOut, ChevronDown, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onViewChange, currentView, isAdminLoggedIn, onLogout }) => {
  const { cartItems } = useCart();
  const { products, categories } = useProducts();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const catRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Only categories that have at least 1 product
  const activeCategories = categories.filter(cat =>
    products.some(p => p.category === cat)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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

        {/* ── Logo ── */}
        <div
          onClick={() => onViewChange('shop')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            cursor: 'pointer', fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem', color: 'var(--secondary)'
          }}
        >
          <div style={{
            background: 'var(--primary)', padding: '6px',
            borderRadius: '10px', color: 'white', display: 'flex'
          }}>
            <Palette size={20} />
          </div>
          <span className="hide-on-mobile" style={{ fontWeight: '800', letterSpacing: '-1px' }}>Riwaayat Pots</span>
        </div>

        {/* ── Nav Buttons ── */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>

          {/* Home */}
          <button
            onClick={() => onViewChange('shop')}
            className="nav-btn"
            style={{
              padding: '0.6rem 1.1rem', borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: '600', fontSize: '0.9rem',
              background: currentView === 'shop' ? 'var(--primary)' : 'transparent',
              color: currentView === 'shop' ? 'white' : 'var(--secondary)',
              boxShadow: currentView === 'shop' ? '0 4px 12px rgba(194,65,12,0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            <Palette size={16} /> <span className="hide-on-mobile">Home</span>
          </button>

          {/* Catalog */}
          <button
            onClick={() => onViewChange('catalog')}
            className="nav-btn"
            style={{
              padding: '0.6rem 1.1rem', borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: '600', fontSize: '0.9rem',
              background: currentView === 'catalog' ? 'var(--primary)' : 'transparent',
              color: currentView === 'catalog' ? 'white' : 'var(--secondary)',
              boxShadow: currentView === 'catalog' ? '0 4px 12px rgba(194,65,12,0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            <Store size={16} /> <span className="hide-on-mobile">Catalog</span>
          </button>

          {/* ── Categories Dropdown ── */}
          {activeCategories.length > 0 && (
            <div ref={catRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsCatOpen(prev => !prev)}
                className="nav-btn"
                style={{
                  padding: '0.6rem 1.1rem', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontWeight: '600', fontSize: '0.9rem',
                  background: isCatOpen ? 'var(--primary-light)' : 'transparent',
                  color: isCatOpen ? 'var(--primary)' : 'var(--secondary)',
                  border: isCatOpen ? '1px solid rgba(194,65,12,0.2)' : '1px solid transparent',
                  transition: 'all 0.25s',
                }}
              >
                <Tag size={15} />
                <span className="hide-on-mobile">Collections</span>
                <motion.span
                  animate={{ rotate: isCatOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {isCatOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: '200px',
                      background: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(194,65,12,0.08)',
                      padding: '0.5rem',
                      zIndex: 1100,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      padding: '0.5rem 0.85rem 0.6rem',
                      borderBottom: '1px solid #f5f5f5',
                      marginBottom: '0.35rem',
                    }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Browse by Category
                      </p>
                    </div>

                    {activeCategories.map((cat, i) => {
                      const count = products.filter(p => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            onViewChange('catalog', cat);
                            setIsCatOpen(false);
                          }}
                          style={{
                            width: '100%', padding: '0.6rem 0.85rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderRadius: '10px', cursor: 'pointer',
                            background: 'transparent', border: 'none',
                            transition: 'background 0.15s',
                            textAlign: 'left',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--primary-light)';
                            e.currentTarget.querySelector('.cat-name').style.color = 'var(--primary)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.querySelector('.cat-name').style.color = 'var(--secondary)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{
                              width: '8px', height: '8px', borderRadius: '50%',
                              background: `hsl(${(i * 47) % 360}, 65%, 55%)`,
                              flexShrink: 0,
                            }} />
                            <span
                              className="cat-name"
                              style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--secondary)', transition: 'color 0.15s' }}
                            >
                              {cat}
                            </span>
                          </div>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: '700',
                            background: '#f5f5f5', color: 'var(--text-muted)',
                            padding: '0.15rem 0.55rem', borderRadius: '20px',
                          }}>
                            {count}
                          </span>
                        </button>
                      );
                    })}

                    {/* View All */}
                    <div style={{ borderTop: '1px solid #f5f5f5', marginTop: '0.35rem', paddingTop: '0.35rem' }}>
                      <button
                        onClick={() => { onViewChange('catalog'); setIsCatOpen(false); }}
                        style={{
                          width: '100%', padding: '0.6rem 0.85rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: '0.4rem', borderRadius: '10px', cursor: 'pointer',
                          background: 'var(--primary-light)', border: 'none',
                          color: 'var(--primary)', fontWeight: '700', fontSize: '0.82rem',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fde8d0'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--primary-light)'}
                      >
                        View All Products →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Inventory (admin only) */}
          {isAdminLoggedIn && (
            <button
              onClick={() => onViewChange('inventory')}
              className="nav-btn"
              style={{
                padding: '0.6rem 1.1rem', borderRadius: '12px',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: '600', fontSize: '0.9rem',
                background: currentView === 'inventory' ? 'var(--primary)' : 'transparent',
                color: currentView === 'inventory' ? 'white' : 'var(--secondary)',
                boxShadow: currentView === 'inventory' ? '0 4px 12px rgba(194,65,12,0.15)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)'
              }}
            >
              <Package size={16} /> <span className="hide-on-mobile">Inventory</span>
            </button>
          )}

          <div style={{ width: '1px', height: '20px', background: '#eee', margin: '0 0.4rem' }} />

          {/* Cart */}
          <button
            onClick={() => onViewChange('cart')}
            style={{
              padding: '0.6rem 1.1rem', borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: '600', fontSize: '0.9rem',
              background: currentView === 'cart' ? 'var(--accent)' : 'rgba(34,197,94,0.08)',
              color: currentView === 'cart' ? 'white' : 'var(--accent)',
              position: 'relative',
              boxShadow: currentView === 'cart' ? '0 4px 12px rgba(34,197,94,0.15)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: 'var(--primary)', color: 'white',
                fontSize: '0.65rem', width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 'bold',
                border: '1.5px solid white'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div style={{ position: 'relative', marginLeft: '0.25rem' }}>
            <button
              onClick={() => isAdminLoggedIn ? setIsProfileOpen(!isProfileOpen) : onViewChange('inventory')}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: isAdminLoggedIn ? 'var(--secondary)' : '#f1f3f5',
                color: isAdminLoggedIn ? 'white' : '#777',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: isAdminLoggedIn ? '1.5px solid rgba(255,255,255,0.2)' : '1px solid #e9ecef',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: isAdminLoggedIn ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
              onMouseEnter={e => !isAdminLoggedIn && (e.currentTarget.style.background = '#e9ecef')}
              onMouseLeave={e => !isAdminLoggedIn && (e.currentTarget.style.background = '#f1f3f5')}
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
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      width: '180px', background: 'white', borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f1f1f1', padding: '0.4rem', zIndex: 1001
                    }}
                  >
                    <div style={{ padding: '0.6rem 0.8rem', borderBottom: '1px solid #f8f9fa', marginBottom: '0.3rem' }}>
                      <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.1rem' }}>Administrator</p>
                      <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary)' }}>Admin Profile</p>
                    </div>
                    <button
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      style={{
                        width: '100%', padding: '0.6rem 0.8rem',
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        color: 'var(--danger)', borderRadius: '8px',
                        transition: 'background 0.2s', cursor: 'pointer', fontSize: '0.85rem'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
