import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Ban, Tag, Package, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!product) return null;

  const isOutOfStock = !product.quantity || product.quantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    onClose();
  };

  /* ── Mobile bottom-sheet ── */
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 4000,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-end',
          }}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxHeight: '92vh',
              background: 'white',
              borderRadius: '28px 28px 0 0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: '44px', height: '5px', borderRadius: '3px',
              background: '#ddd', margin: '12px auto 0',
              flexShrink: 0,
            }} />

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '16px', right: '16px', zIndex: 10,
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.08)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#555',
              }}
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div style={{
              height: '240px', flexShrink: 0,
              position: 'relative', background: '#f5ebe0',
              margin: '12px 16px 0',
              borderRadius: '20px', overflow: 'hidden',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: isOutOfStock ? 'grayscale(40%)' : 'none',
                }}
              />
              {isOutOfStock && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.7)', color: 'white',
                    padding: '0.5rem 1.25rem', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: '700',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <Ban size={14} /> Sold Out
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable content */}
            <div style={{
              overflowY: 'auto', padding: '1.25rem 1.25rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              flex: 1,
            }}>
              {/* Chips */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  padding: '0.3rem 0.75rem', borderRadius: '20px',
                  fontSize: '0.72rem', fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                }}>
                  <Tag size={11} /> {product.category}
                </span>
                <span style={{
                  background: isOutOfStock ? '#fef2f2' : '#f0fdf4',
                  color: isOutOfStock ? 'var(--danger)' : 'var(--success)',
                  padding: '0.3rem 0.75rem', borderRadius: '20px',
                  fontSize: '0.72rem', fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  border: isOutOfStock ? '1px solid #fecaca' : '1px solid #bbf7d0',
                }}>
                  <Package size={11} />
                  {isOutOfStock ? 'Out of Stock' : product.quantity <= 3 ? `Only ${product.quantity} Left` : `${product.quantity} In Stock`}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '1.45rem', fontFamily: 'var(--font-heading)',
                color: 'var(--secondary)', lineHeight: '1.25', fontWeight: '400',
              }}>
                {product.name}
              </h2>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                  Handcrafted Quality
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#f0f0f0' }} />

              {/* Description */}
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.88rem',
                lineHeight: '1.75',
              }}>
                {product.description}
              </p>

              {/* Price box */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-light), #fff7ed)',
                borderRadius: '14px', padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Price</span>
                <span style={{
                  fontSize: '1.6rem', fontWeight: '800',
                  color: isOutOfStock ? '#9ca3af' : 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                }}>
                  Rs. {product.price ? product.price.toLocaleString() : '0'}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{
                  width: '100%', padding: '0.9rem',
                  borderRadius: '14px', border: 'none',
                  fontSize: '0.95rem', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  background: isOutOfStock
                    ? '#e5e7eb'
                    : 'linear-gradient(135deg, var(--primary), #e55a00)',
                  color: isOutOfStock ? '#9ca3af' : 'white',
                  boxShadow: isOutOfStock ? 'none' : '0 6px 20px rgba(194,65,12,0.3)',
                }}
              >
                {isOutOfStock
                  ? <><Ban size={17} /> Out of Stock</>
                  : <><ShoppingCart size={17} /> Add to Cart</>
                }
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── Desktop centered modal ── */
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 4000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '28px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '860px',
            maxHeight: '90vh',
            display: 'flex',
            boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10,
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.07)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#555', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.07)'}
          >
            <X size={20} />
          </button>

          {/* Left — Image */}
          <div style={{
            width: '45%', flexShrink: 0, position: 'relative',
            background: '#f5ebe0', overflow: 'hidden',
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: isOutOfStock ? 'grayscale(40%)' : 'none',
                transition: 'transform 0.5s',
              }}
            />
            {isOutOfStock && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.7)', color: 'white',
                  padding: '0.6rem 1.5rem', borderRadius: '24px',
                  fontSize: '0.85rem', fontWeight: '700',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <Ban size={15} /> Sold Out
                </div>
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div style={{
            flex: 1, padding: '2.75rem 2.5rem',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}>
            {/* Category & Stock row */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'var(--primary-light)', color: 'var(--primary)',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <Tag size={12} /> {product.category}
              </span>
              <span style={{
                background: isOutOfStock ? '#fef2f2' : '#f0fdf4',
                color: isOutOfStock ? 'var(--danger)' : 'var(--success)',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                border: isOutOfStock ? '1px solid #fecaca' : '1px solid #bbf7d0',
              }}>
                <Package size={12} />
                {isOutOfStock ? 'Out of Stock' : product.quantity <= 3 ? `Only ${product.quantity} Left` : `${product.quantity} In Stock`}
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '1.75rem', fontFamily: 'var(--font-heading)',
              color: 'var(--secondary)', marginBottom: '0.75rem',
              lineHeight: '1.25', fontWeight: '400',
            }}>
              {product.name}
            </h2>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.4rem', alignSelf: 'center' }}>
                Handcrafted Quality
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#f0f0f0', marginBottom: '1.25rem' }} />

            {/* Description */}
            <p style={{
              color: 'var(--text-muted)', fontSize: '0.95rem',
              lineHeight: '1.8', marginBottom: '2rem', flexGrow: 1,
            }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-light), #fff7ed)',
              borderRadius: '16px', padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Price</span>
              <span style={{
                fontSize: '2rem', fontWeight: '800',
                color: isOutOfStock ? '#9ca3af' : 'var(--primary)',
                fontFamily: 'var(--font-heading)',
              }}>
                Rs. {product.price ? product.price.toLocaleString() : '0'}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                width: '100%', padding: '1rem',
                borderRadius: '16px', border: 'none',
                fontSize: '1rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.6rem', cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                background: isOutOfStock
                  ? '#e5e7eb'
                  : 'linear-gradient(135deg, var(--primary), #e55a00)',
                color: isOutOfStock ? '#9ca3af' : 'white',
                boxShadow: isOutOfStock ? 'none' : '0 6px 20px rgba(194,65,12,0.3)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { if (!isOutOfStock) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isOutOfStock
                ? <><Ban size={18} /> Out of Stock</>
                : <><ShoppingCart size={18} /> Add to Cart</>
              }
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
