import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Package, Search, Edit3, Trash2, Plus, ExternalLink, ShieldCheck, AlertCircle, X, Settings, Check, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Inventory = ({ onAdd, onDelete, onViewChange }) => {
  const { products, categories, addCategory, deleteCategory, updateProduct } = useProducts();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const reviewCount = (() => { try { return JSON.parse(localStorage.getItem('rp_reviews') || '[]').length; } catch { return 0; } })();

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, category: product.category, price: product.price, quantity: product.quantity ?? 0, image: product.image, description: product.description ?? '' });
  };

  const saveEdit = (product) => {
    updateProduct({ ...product, name: editForm.name, category: editForm.category, price: Number(editForm.price), quantity: Number(editForm.quantity), image: editForm.image, description: editForm.description });
    setEditingId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const cancelEdit = () => setEditingId(null);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      onDelete(deleteTarget);
      setDeleteTarget(null);
    }
  };

  const iconBtn = (onClick, icon, label, variant = 'ghost') => {
    const styles = {
      primary: { background: 'linear-gradient(135deg, var(--primary), #f59e0b)', color: 'white', border: 'none', shadow: '0 4px 14px rgba(194,65,12,0.3)' },
      outline: { background: 'white', color: 'var(--primary)', border: '1.5px solid rgba(194,65,12,0.22)', shadow: 'none' },
      ghost:   { background: '#f5f5f5', color: '#444', border: 'none', shadow: 'none' },
    }[variant];
    return (
      <button onClick={onClick} title={label} style={{
        display: 'flex', alignItems: 'center', gap: isMobile ? '0' : '0.45rem',
        padding: isMobile ? '0.65rem' : '0.65rem 1.1rem',
        borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
        fontSize: '0.84rem', transition: 'all 0.18s', whiteSpace: 'nowrap',
        boxShadow: styles.shadow, background: styles.background,
        color: styles.color, border: styles.border,
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {icon}
        {!isMobile && <span>{label}</span>}
      </button>
    );
  };

  return (
    <div style={{ padding: isMobile ? '1rem 0' : '2rem 0' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '1.75rem' }}>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', margin: 0 }}>
            Live Inventory
          </h2>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'rgba(34,197,94,0.1)', color: '#16a34a',
            padding: '0.3rem 0.75rem', borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: '700',
          }}>
            <ShieldCheck size={12} /> Secured
          </span>
          <span style={{
            background: 'rgba(194,65,12,0.08)', color: 'var(--primary)',
            padding: '0.3rem 0.75rem', borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: '700',
          }}>
            {filteredProducts.length} Products
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          Manage your collection — edit inline, update stock, add new items.
        </p>
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        flexWrap: 'wrap', marginBottom: '1.25rem',
        background: 'white', borderRadius: '16px',
        padding: '0.75rem 1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}>
        {/* Search — grows */}
        <div style={{ position: 'relative', flex: 1, minWidth: isMobile ? '100%' : '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#bbb' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '0.6rem 0.9rem 0.6rem 2.4rem',
              borderRadius: '10px', border: '1.5px solid #ececec',
              outline: 'none', background: '#fafafa',
              fontSize: '0.85rem', boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onBlur={e => e.currentTarget.style.borderColor = '#ececec'}
          />
        </div>

        {/* Divider */}
        {!isMobile && <div style={{ width: '1px', height: '28px', background: '#ececec' }} />}

        {/* Action buttons */}
        {iconBtn(() => onViewChange('orders'),          <ExternalLink size={15} />,   'Orders',          'ghost')}
        <button onClick={() => onViewChange('reviews')} title="Reviews" style={{
          display: 'flex', alignItems: 'center', gap: isMobile ? '0' : '0.45rem',
          padding: isMobile ? '0.65rem' : '0.65rem 1.1rem',
          borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
          fontSize: '0.84rem', background: '#f5f5f5', color: '#444',
          border: 'none', whiteSpace: 'nowrap', position: 'relative',
          transition: 'all 0.18s',
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <MessageSquare size={15} />
          {!isMobile && <span>Reviews</span>}
          {reviewCount > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-6px',
              background: 'var(--primary)', color: 'white',
              borderRadius: '50%', width: '18px', height: '18px',
              fontSize: '0.65rem', fontWeight: '800',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}>{reviewCount > 99 ? '99+' : reviewCount}</span>
          )}
        </button>
        {iconBtn(() => setIsCategoryModalOpen(true),    <Package size={15} />,        'Categories',      'outline')}
        {iconBtn(() => onViewChange('settings'),        <Settings size={15} />,       'Store Settings',  'outline')}
        {iconBtn(onAdd,                                 <Plus size={15} />,           'Add Product',     'primary')}
      </div>

      <div style={{ background: 'white', borderRadius: '24px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f3f3' }}>
              {['Product', 'Category', 'Description', 'Price', 'Quantity', 'Status', 'Actions'].map((col, i) => (
                <th key={col} style={{
                  padding: isMobile ? '0.9rem 0.75rem' : '1.25rem 1.5rem',
                  color: 'var(--text-muted)', fontWeight: '700',
                  fontSize: isMobile ? '0.75rem' : '0.85rem',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  textAlign: i === 6 ? 'right' : 'left',
                  background: '#fafaf9',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? filteredProducts.map((product, idx) => {
              const isEditing = editingId === product.id;
              const p = isMobile ? '0.6rem 0.75rem' : '1rem 1.5rem';
              const inputStyle = {
                width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px',
                border: '1.5px solid var(--primary)', outline: 'none',
                fontSize: isMobile ? '0.8rem' : '0.88rem', background: '#fffbf7',
                color: 'var(--secondary)', boxSizing: 'border-box',
              };
              return (
                <tr key={product.id} style={{
                  borderBottom: '1px solid #f3f3f3',
                  background: isEditing ? '#fffbf7' : idx % 2 === 0 ? 'white' : '#fdfcfb',
                  transition: 'background 0.2s',
                }}>
                  {/* Product */}
                  <td style={{ padding: p, whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {/* Image — click to change when editing */}
                      <label style={{ position: 'relative', flexShrink: 0, cursor: isEditing ? 'pointer' : 'default' }}>
                        <img
                          src={isEditing ? editForm.image : product.image}
                          alt={product.name}
                          style={{ width: isMobile ? '38px' : '48px', height: isMobile ? '38px' : '48px', borderRadius: '9px', objectFit: 'cover', display: 'block', opacity: isEditing ? 0.75 : 1, transition: 'opacity 0.2s' }}
                        />
                        {isEditing && (
                          <>
                            <div style={{
                              position: 'absolute', inset: 0, borderRadius: '9px',
                              background: 'rgba(194,65,12,0.55)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageChange}
                              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                          </>
                        )}
                      </label>

                      <div style={{ minWidth: isEditing ? '120px' : 'auto' }}>
                        {isEditing ? (
                          <input
                            style={inputStyle}
                            value={editForm.name}
                            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                          />
                        ) : (
                          <>
                            <div style={{ fontWeight: '600', color: 'var(--secondary)', fontSize: isMobile ? '0.82rem' : '0.9rem' }}>{product.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>#{product.id}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: p, whiteSpace: 'nowrap' }}>
                    {isEditing ? (
                      <select
                        style={{ ...inputStyle, minWidth: '110px' }}
                        value={editForm.category}
                        onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <span style={{ padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', background: '#f3f3f3', color: '#666', fontWeight: '600' }}>
                        {product.category}
                      </span>
                    )}
                  </td>

                  {/* Description */}
                  <td style={{ padding: p, maxWidth: '220px' }}>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        style={{ ...inputStyle, minWidth: '160px', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.4' }}
                        value={editForm.description}
                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Product description..."
                      />
                    ) : (
                      <span style={{
                        fontSize: isMobile ? '0.78rem' : '0.83rem',
                        color: 'var(--text-muted)', lineHeight: '1.45',
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {product.description || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>—</span>}
                      </span>
                    )}
                  </td>

                  {/* Price */}
                  <td style={{ padding: p, whiteSpace: 'nowrap' }}>
                    {isEditing ? (
                      <input
                        type="number" style={{ ...inputStyle, minWidth: '80px' }}
                        value={editForm.price}
                        onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                      />
                    ) : (
                      <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: isMobile ? '0.85rem' : '0.92rem' }}>
                        Rs. {product.price ? product.price.toLocaleString() : '0'}
                      </span>
                    )}
                  </td>

                  {/* Quantity */}
                  <td style={{ padding: p, whiteSpace: 'nowrap' }}>
                    {isEditing ? (
                      <input
                        type="number" style={{ ...inputStyle, minWidth: '70px' }}
                        value={editForm.quantity}
                        onChange={e => setEditForm(f => ({ ...f, quantity: e.target.value }))}
                      />
                    ) : (
                      <span style={{ fontWeight: '600', fontSize: isMobile ? '0.82rem' : '0.9rem' }}>
                        {product.quantity ?? 0} pcs
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td style={{ padding: p, whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: isMobile ? '0.78rem' : '0.85rem', fontWeight: '600', color: (isEditing ? Number(editForm.quantity) : product.quantity) > 0 ? 'var(--success)' : 'var(--danger)' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, background: (isEditing ? Number(editForm.quantity) : product.quantity) > 0 ? 'var(--success)' : 'var(--danger)' }} />
                      {(isEditing ? Number(editForm.quantity) : product.quantity) > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: p, textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdit(product)}
                            style={{ padding: isMobile ? '0.45rem 0.7rem' : '0.5rem 0.85rem', borderRadius: '9px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: '600' }}>
                            <Check size={14} /> Save
                          </button>
                          <button onClick={cancelEdit}
                            style={{ padding: isMobile ? '0.45rem' : '0.5rem', borderRadius: '9px', border: 'none', background: '#f3f3f3', color: '#666', cursor: 'pointer' }}>
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(product)}
                            style={{ padding: isMobile ? '0.45rem' : '0.55rem', borderRadius: '9px', border: 'none', color: '#555', background: '#f3f3f3', cursor: 'pointer' }}>
                            <Edit3 size={isMobile ? 15 : 17} />
                          </button>
                          <button onClick={() => setDeleteTarget(product.id)}
                            style={{ padding: isMobile ? '0.45rem' : '0.55rem', borderRadius: '9px', border: 'none', color: 'var(--danger)', background: '#fff0f0', cursor: 'pointer' }}>
                            <Trash2 size={isMobile ? 15 : 17} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '24px',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: '#fff5f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--danger)'
              }}>
                <AlertCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>Confirm Deletion</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
                Are you sure you want to remove this piece from your collection? This action cannot be undone.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="btn-secondary"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    background: 'var(--danger)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                    border: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--danger)'}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isCategoryModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '24px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Manage Categories</h3>
                <button onClick={() => setIsCategoryModalOpen(false)} style={{ color: '#999' }}><X size={24} /></button>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <form onSubmit={(e) => { e.preventDefault(); if (newCategoryName.trim()) { addCategory(newCategoryName.trim()); setNewCategoryName(''); } }} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    style={{ flex: 1, padding: '0.75rem 1.25rem', borderRadius: '10px', border: '1px solid #eee', outline: 'none' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '10px' }}>Add</button>
                </form>
                
                <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {categories.map(cat => (
                    <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                      <span style={{ fontWeight: '500' }}>{cat}</span>
                      <button onClick={() => deleteCategory(cat)} style={{ color: 'var(--danger)', padding: '0.5rem' }}><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {categories.length === 0 && <p style={{ textAlign: 'center', color: '#999', padding: '1rem' }}>No categories found.</p>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;
