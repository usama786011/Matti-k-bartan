import React, { useState } from 'react';
import { ShoppingCart, Edit, Trash2, Ban } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import { motion } from 'framer-motion';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product, isAdmin, onEdit }) => {
  const { addToCart } = useCart();
  const { deleteProduct } = useProducts();
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOutOfStock = !product.quantity || product.quantity <= 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) {
      showNotification(`${product.name} is currently out of stock!`, 'error');
      return;
    }
    addToCart(product);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -8 }}
        className="premium-card glass-morphism"
        onClick={() => !isAdmin && setIsModalOpen(true)}
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          opacity: isOutOfStock ? 0.82 : 1,
          cursor: isAdmin ? 'default' : 'pointer',
        }}
      >
        {/* ─── Image Area ─────────────────────────────── */}
        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
          {/* Sold-out overlay */}
          {isOutOfStock && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'rgba(0,0,0,0.38)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.65)', color: 'white',
                padding: '0.5rem 1.25rem', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: '700',
                letterSpacing: '1px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Ban size={14} /> Sold Out
              </div>
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: isOutOfStock ? 'grayscale(45%)' : 'none',
              transition: 'filter 0.3s',
            }}
            className="product-image"
          />
        </div>

        {/* ─── Info Area ──────────────────────────────── */}
        <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{product.name}</h3>
            <p style={{
              color: 'var(--text-muted)', fontSize: '0.9rem',
              marginBottom: '0.6rem',
              display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {product.description}
            </p>
            <span style={{
              color: isOutOfStock ? 'var(--text-muted)' : 'var(--primary)',
              fontWeight: 'bold', fontSize: '1.2rem',
              display: 'block',
            }}>
              Rs. {product.price ? product.price.toLocaleString() : '0'}
            </span>
          </div>

          {/* ─── Action Buttons ──────────────────────── */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
            {isAdmin ? (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                  style={{
                    flex: 1, background: '#f8f9fa', color: 'var(--secondary)',
                    padding: '0.75rem', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', fontWeight: '600', border: '1px solid #eee',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e9ecef'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f8f9fa'}
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}
                  style={{
                    padding: '0.75rem', background: '#fff5f5',
                    color: 'var(--danger)', borderRadius: '12px',
                    border: '1px solid rgba(239,68,68,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ffe3e3'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff5f5'}
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem', borderRadius: '14px',
                  fontSize: '0.9rem', fontWeight: '700', border: 'none',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  background: isOutOfStock
                    ? '#e5e7eb'
                    : 'linear-gradient(135deg, var(--primary), #e55a00)',
                  color: isOutOfStock ? '#9ca3af' : 'white',
                  boxShadow: isOutOfStock ? 'none' : '0 4px 15px rgba(194,65,12,0.25)',
                  transition: 'all 0.2s',
                }}
              >
                {isOutOfStock
                  ? <><Ban size={16} /> Out of Stock</>
                  : <><ShoppingCart size={16} /> Add to Cart</>
                }
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <ProductDetailModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
