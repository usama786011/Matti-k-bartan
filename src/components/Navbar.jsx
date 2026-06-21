import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag, Store, Palette, Package,
  User, LogOut, ChevronDown, Tag, Menu, X, Home
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};

const Navbar = ({ onViewChange, currentView, isAdminLoggedIn, onLogout }) => {
  const { cartItems } = useCart();
  const { products, categories } = useProducts();
  const isMobile = useIsMobile();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCatOpen, setIsCatOpen]         = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const catRef  = useRef(null);
  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  const activeCategories = categories.filter(cat =>
    products.some(p => p.category === cat)
  );

  // close desktop cat dropdown on outside click
  useEffect(() => {
    const h = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setIsCatOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navigate = (view, cat = null) => {
    onViewChange(view, cat);
    setIsMenuOpen(false);
    setMobileCatOpen(false);
  };

  /* ── shared active pill style ── */
  const pill = (active) => ({
    padding: '0.55rem 1rem',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    fontWeight: '600', fontSize: '0.88rem', border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--primary)' : 'transparent',
    color:      active ? 'white'           : 'var(--secondary)',
    boxShadow:  active ? '0 4px 12px rgba(194,65,12,0.18)' : 'none',
    transition: 'all 0.22s ease',
  });

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(194,65,12,0.07)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.04)',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: '62px',
        }}>

          {/* ── Logo ── */}
          <div
            onClick={() => navigate('shop')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--primary), #e55a00)',
              padding: '7px', borderRadius: '11px', color: 'white',
              display: 'flex', boxShadow: '0 4px 12px rgba(194,65,12,0.25)',
            }}>
              <Palette size={18} />
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: '800',
              fontSize: '1.45rem', color: 'var(--secondary)', letterSpacing: '-0.5px',
            }}>
              Riwaayat Pots
            </span>
          </div>

          {/* ── Desktop Nav ── */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>

              <button style={pill(currentView === 'shop')} onClick={() => navigate('shop')}>
                <Home size={15} /> Home
              </button>

              <button style={pill(currentView === 'catalog')} onClick={() => navigate('catalog')}>
                <Store size={15} /> Catalog
              </button>

              {/* Collections dropdown */}
              {activeCategories.length > 0 && (
                <div ref={catRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setIsCatOpen(p => !p)}
                    style={{
                      ...pill(isCatOpen),
                      background: isCatOpen ? 'var(--primary-light)' : 'transparent',
                      color:      isCatOpen ? 'var(--primary)'       : 'var(--secondary)',
                      border: isCatOpen ? '1px solid rgba(194,65,12,0.15)' : '1px solid transparent',
                    }}
                  >
                    <Tag size={14} />
                    Collections
                    <motion.span
                      animate={{ rotate: isCatOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', lineHeight: 1 }}
                    >
                      <ChevronDown size={13} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isCatOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 10px)',
                          left: '50%', transform: 'translateX(-50%)',
                          minWidth: '210px', background: 'white',
                          borderRadius: '16px',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.11)',
                          border: '1px solid rgba(194,65,12,0.07)',
                          padding: '0.45rem', zIndex: 1100,
                        }}
                      >
                        <p style={{
                          fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)',
                          textTransform: 'uppercase', letterSpacing: '1px',
                          padding: '0.4rem 0.8rem 0.55rem',
                          borderBottom: '1px solid #f3f3f3', marginBottom: '0.3rem',
                        }}>
                          Browse by Category
                        </p>

                        {activeCategories.map((cat, i) => {
                          const count = products.filter(p => p.category === cat).length;
                          return (
                            <button
                              key={cat}
                              onClick={() => { navigate('catalog', cat); setIsCatOpen(false); }}
                              style={{
                                width: '100%', padding: '0.55rem 0.8rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                borderRadius: '9px', cursor: 'pointer',
                                background: 'transparent', border: 'none', transition: 'background 0.13s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                                <div style={{
                                  width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                                  background: `hsl(${(i * 53) % 360}, 62%, 52%)`,
                                }} />
                                <span style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--secondary)' }}>
                                  {cat}
                                </span>
                              </div>
                              <span style={{
                                fontSize: '0.7rem', fontWeight: '700',
                                background: '#f2f2f2', color: 'var(--text-muted)',
                                padding: '0.1rem 0.5rem', borderRadius: '20px',
                              }}>
                                {count}
                              </span>
                            </button>
                          );
                        })}

                        <div style={{ borderTop: '1px solid #f3f3f3', marginTop: '0.3rem', paddingTop: '0.3rem' }}>
                          <button
                            onClick={() => { navigate('catalog'); setIsCatOpen(false); }}
                            style={{
                              width: '100%', padding: '0.55rem 0.8rem',
                              borderRadius: '9px', border: 'none', cursor: 'pointer',
                              background: 'var(--primary-light)', color: 'var(--primary)',
                              fontWeight: '700', fontSize: '0.8rem',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              gap: '0.35rem', transition: 'background 0.13s',
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

              {isAdminLoggedIn && (
                <button style={pill(currentView === 'inventory')} onClick={() => navigate('inventory')}>
                  <Package size={15} /> Inventory
                </button>
              )}

              {/* Divider */}
              <div style={{ width: '1px', height: '18px', background: '#e5e5e5', margin: '0 0.3rem' }} />

              {/* Cart */}
              <button
                onClick={() => navigate('cart')}
                style={{
                  position: 'relative', padding: '0.55rem 1rem',
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  fontWeight: '600', fontSize: '0.88rem',
                  background: currentView === 'cart' ? 'var(--accent)' : 'rgba(21,128,61,0.07)',
                  color:      currentView === 'cart' ? 'white'          : 'var(--accent)',
                  boxShadow:  currentView === 'cart' ? '0 4px 12px rgba(21,128,61,0.18)' : 'none',
                  transition: 'all 0.22s',
                }}
              >
                <ShoppingBag size={15} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    background: 'var(--primary)', color: 'white',
                    fontSize: '0.6rem', width: '17px', height: '17px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', border: '2px solid white',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile avatar */}
              <div style={{ position: 'relative', marginLeft: '0.2rem' }}>
                <button
                  onClick={() => isAdminLoggedIn ? setIsProfileOpen(p => !p) : navigate('inventory')}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: isAdminLoggedIn
                      ? 'linear-gradient(135deg, var(--secondary), #6b2d0a)'
                      : '#f1f3f5',
                    color: isAdminLoggedIn ? 'white' : '#888',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: isAdminLoggedIn ? 'none' : '1px solid #e9ecef',
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: isAdminLoggedIn ? '0 3px 10px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <User size={15} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && isAdminLoggedIn && (
                    <>
                      <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.14 }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                          width: '185px', background: 'white', borderRadius: '14px',
                          boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
                          border: '1px solid #f0f0f0', padding: '0.4rem', zIndex: 1001,
                        }}
                      >
                        <div style={{ padding: '0.6rem 0.85rem 0.7rem', borderBottom: '1px solid #f5f5f5', marginBottom: '0.3rem' }}>
                          <p style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Signed in as</p>
                          <p style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--secondary)' }}>Administrator</p>
                        </div>
                        <button
                          onClick={() => { onLogout(); setIsProfileOpen(false); }}
                          style={{
                            width: '100%', padding: '0.6rem 0.85rem',
                            display: 'flex', alignItems: 'center', gap: '0.55rem',
                            color: 'var(--danger)', borderRadius: '9px',
                            background: 'transparent', border: 'none',
                            cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <LogOut size={15} /> Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ── Mobile Right: Cart + Hamburger ── */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Cart */}
              <button
                onClick={() => navigate('cart')}
                style={{
                  position: 'relative', width: '40px', height: '40px',
                  borderRadius: '11px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: currentView === 'cart' ? 'var(--accent)' : 'rgba(21,128,61,0.08)',
                  color: currentView === 'cart' ? 'white' : 'var(--accent)',
                }}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    background: 'var(--primary)', color: 'white',
                    fontSize: '0.58rem', width: '16px', height: '16px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', border: '2px solid white',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(p => !p)}
                style={{
                  width: '40px', height: '40px', borderRadius: '11px',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isMenuOpen ? 'var(--primary)' : '#f5f5f5',
                  color: isMenuOpen ? 'white' : 'var(--secondary)',
                  transition: 'all 0.2s',
                }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 998,
                background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)',
              }}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={{
                position: 'fixed', top: '62px', left: 0, right: 0, zIndex: 999,
                background: 'white',
                borderRadius: '0 0 24px 24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                padding: '1.25rem 1.25rem 1.5rem',
                borderTop: '1px solid rgba(194,65,12,0.07)',
              }}
            >
              {/* Nav items */}
              {[
                { label: 'Home',      view: 'shop',      icon: <Home size={17} /> },
                { label: 'Catalog',   view: 'catalog',   icon: <Store size={17} /> },
                ...(isAdminLoggedIn ? [{ label: 'Inventory', view: 'inventory', icon: <Package size={17} /> }] : []),
              ].map(item => (
                <button
                  key={item.view}
                  onClick={() => navigate(item.view)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    borderRadius: '13px', border: 'none', cursor: 'pointer',
                    marginBottom: '0.3rem',
                    background: currentView === item.view ? 'var(--primary)' : 'transparent',
                    color:      currentView === item.view ? 'white'           : 'var(--secondary)',
                    fontWeight: '600', fontSize: '0.95rem',
                    transition: 'background 0.18s',
                  }}
                  onMouseEnter={e => { if (currentView !== item.view) e.currentTarget.style.background = '#f5f5f5'; }}
                  onMouseLeave={e => { if (currentView !== item.view) e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.icon} {item.label}
                </button>
              ))}

              {/* Collections accordion */}
              {activeCategories.length > 0 && (
                <div style={{ marginBottom: '0.3rem' }}>
                  <button
                    onClick={() => setMobileCatOpen(p => !p)}
                    style={{
                      width: '100%', padding: '0.85rem 1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderRadius: '13px', border: 'none', cursor: 'pointer',
                      background: mobileCatOpen ? 'var(--primary-light)' : 'transparent',
                      color: mobileCatOpen ? 'var(--primary)' : 'var(--secondary)',
                      fontWeight: '600', fontSize: '0.95rem',
                      transition: 'background 0.18s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Tag size={17} /> Collections
                    </div>
                    <motion.span
                      animate={{ rotate: mobileCatOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex' }}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {mobileCatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingLeft: '0.75rem', paddingTop: '0.3rem', paddingBottom: '0.2rem' }}>
                          {activeCategories.map((cat, i) => {
                            const count = products.filter(p => p.category === cat).length;
                            return (
                              <button
                                key={cat}
                                onClick={() => navigate('catalog', cat)}
                                style={{
                                  width: '100%', padding: '0.7rem 0.9rem',
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                                  background: 'transparent', marginBottom: '0.15rem',
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                  <div style={{
                                    width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                                    background: `hsl(${(i * 53) % 360}, 62%, 52%)`,
                                  }} />
                                  <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--secondary)' }}>
                                    {cat}
                                  </span>
                                </div>
                                <span style={{
                                  fontSize: '0.7rem', fontWeight: '700',
                                  background: '#f2f2f2', color: 'var(--text-muted)',
                                  padding: '0.1rem 0.5rem', borderRadius: '20px',
                                }}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Divider */}
              <div style={{ height: '1px', background: '#f0f0f0', margin: '0.75rem 0' }} />

              {/* Admin logout / login */}
              {isAdminLoggedIn ? (
                <button
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  style={{
                    width: '100%', padding: '0.85rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    borderRadius: '13px', border: 'none', cursor: 'pointer',
                    background: '#fff5f5', color: 'var(--danger)',
                    fontWeight: '600', fontSize: '0.95rem',
                  }}
                >
                  <LogOut size={17} /> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate('inventory')}
                  style={{
                    width: '100%', padding: '0.85rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    borderRadius: '13px', border: 'none', cursor: 'pointer',
                    background: '#f5f5f5', color: 'var(--secondary)',
                    fontWeight: '600', fontSize: '0.95rem',
                  }}
                >
                  <User size={17} /> Admin Login
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
