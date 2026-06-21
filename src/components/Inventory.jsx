import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Package, Search, Edit3, Trash2, Plus, ExternalLink, ShieldCheck, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Inventory = ({ onEdit, onAdd, onDelete, onViewChange }) => {
  const { products, categories, addCategory, deleteCategory } = useProducts();
  const [deleteTarget, setDeleteTarget] = useState(null); // Stores the product ID to be deleted
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

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

      <div className="glass-morphism" style={{ background: 'white', padding: '1rem', overflowX: 'auto', borderRadius: '24px' }}>
        <table className="inventory-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f8f9fa' }}>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Product</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Quantity</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--secondary)' }}>{product.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #{product.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    background: '#f8f9fa', 
                    color: 'var(--text-muted)',
                    fontWeight: '500'
                  }}>
                    {product.category}
                  </span>
                </td>
                <td style={{ padding: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  Rs. {product.price ? product.price.toLocaleString() : '0'}
                </td>
                <td style={{ padding: '1.5rem', fontWeight: '600' }}>
                  {product.quantity ?? 0} Pieces
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: product.quantity > 0 ? 'var(--success)' : 'var(--danger)', fontSize: '0.9rem', fontWeight: '600' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.quantity > 0 ? 'var(--success)' : 'var(--danger)' }}></div>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => onEdit(product)}
                      style={{ padding: '0.6rem', borderRadius: '10px', color: '#666', background: '#f8f9fa', cursor: 'pointer' }}
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteTarget(product.id)}
                      style={{ padding: '0.6rem', borderRadius: '10px', color: 'var(--danger)', background: '#fff5f5', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
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
