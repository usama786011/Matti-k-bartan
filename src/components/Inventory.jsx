import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Package, Search, Edit3, Trash2, Plus, ExternalLink, ShieldCheck, AlertCircle, X, Settings, Check } from 'lucide-react';
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

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, category: product.category, price: product.price, quantity: product.quantity ?? 0, image: product.image });
  };

  const saveEdit = (product) => {
    updateProduct({ ...product, name: editForm.name, category: editForm.category, price: Number(editForm.price), quantity: Number(editForm.quantity), image: editForm.image });
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

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)' }}>Live Inventory</h2>
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)', 
              color: 'var(--success)', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '10px', 
              fontSize: '0.75rem', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <ShieldCheck size={14} /> Secured
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Detailed view of your current collection and stock status.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onViewChange('settings')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.1rem', borderRadius: '12px',
              border: '1.5px solid rgba(194,65,12,0.2)',
              background: 'white', color: 'var(--primary)',
              fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; }}
          >
            <Settings size={16} /> Store Settings
          </button>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem 1.25rem 0.75rem 2.6rem',
                borderRadius: '12px',
                border: '1px solid #eee',
                outline: 'none',
                background: '#f9f9f9',
                width: '230px',
                fontSize: '0.9rem'
              }}
            />
          </div>
          <button 
            onClick={() => onViewChange('orders')}
            className="btn-secondary"
            style={{ 
              padding: '0.75rem 1.25rem', 
              borderRadius: '12px', 
              fontSize: '0.88rem'
            }}
          >
            Order History
          </button>
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="btn-secondary"
            style={{ 
              padding: '0.75rem 1.25rem', 
              borderRadius: '12px', 
              fontSize: '0.88rem'
            }}
          >
            Manage Categories
          </button>
          <button 
            onClick={onAdd}
            className="btn-primary"
            style={{ 
              padding: '0.75rem 1.25rem', 
              borderRadius: '12px', 
              fontSize: '0.88rem'
            }}
          >
            <Plus size={18} /> Add New Art
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f3f3' }}>
              {['Product', 'Category', 'Price', 'Quantity', 'Status', 'Actions'].map((col, i) => (
                <th key={col} style={{
                  padding: isMobile ? '0.9rem 0.75rem' : '1.25rem 1.5rem',
                  color: 'var(--text-muted)', fontWeight: '700',
                  fontSize: isMobile ? '0.75rem' : '0.85rem',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  textAlign: i === 5 ? 'right' : 'left',
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
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
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
