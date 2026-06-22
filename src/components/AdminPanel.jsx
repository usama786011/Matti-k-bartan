import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Upload, Save, Image as ImageIcon, Trash2, Camera } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = ({ isModalOpen, setIsModalOpen, editingProduct, onLogout }) => {
  const { addProduct, updateProduct, categories } = useProducts();
  const { showNotification } = useNotification();
  const fileInputRef = useRef(null);

  const initialFormState = {
    name: '',
    price: '',
    quantity: '',
    category: 'Vases',
    description: '',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData(initialFormState);
    }
  }, [editingProduct, isModalOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
      showNotification(`${formData.name} updated successfully!`, 'success');
    } else {
      addProduct(formData);
      showNotification(`${formData.name} added to collection!`, 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)'
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-morphism"
            style={{
              width: '95%',
              maxWidth: '850px',
              padding: '0',
              position: 'relative',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.1fr 1.4fr',
              background: 'white',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              borderRadius: '24px'
            }}
          >
            {/* Left Side: Image Preview & Upload */}
            <div style={{
              background: '#f8f9fa',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: '1px solid #eee'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ddd',
                position: 'relative'
              }}>
                {formData.image ? (
                  <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: '#999' }}>
                    <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Image Preview</p>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current.click()}
                  type="button"
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    color: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Camera size={20} />
                </button>
              </div>

              <div style={{ width: '100%' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#666' }}>Upload from Device</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  type="button"
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    marginBottom: '1rem'
                  }}
                >
                  <Upload size={16} /> Choose Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
                  <span style={{ background: '#f8f9fa', padding: '0 0.5rem', color: '#999', fontSize: '0.8rem', position: 'relative', zIndex: 1 }}>OR</span>
                  <hr style={{ position: 'absolute', top: '50%', left: 0, right: 0, border: 'none', height: '1px', background: '#ddd' }} />
                </div>

                <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#666' }}>Image URL</p>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Right Side: Form Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              position: 'relative'
            }}>
              <div style={{
                padding: '2.5rem',
                overflowY: 'auto',
                flex: 1,
                paddingBottom: '6rem' // Space for fixed button
              }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    color: '#999',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <X size={24} />
                </button>

                <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)' }}>
                  {editingProduct ? 'Update Collection' : 'New Collection Entry'}
                </h3>

                <form id="admin-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Riwaaywat Pots"
                      style={{
                        padding: '0.9rem',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                        background: '#f9f9f9',
                        outline: 'none',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>Price (Rs.)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        style={{
                          padding: '0.9rem',
                          borderRadius: '12px',
                          border: '1px solid #eee',
                          background: '#f9f9f9',
                          outline: 'none',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>Stock Quantity</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        style={{
                          padding: '0.9rem',
                          borderRadius: '12px',
                          border: '1px solid #eee',
                          background: '#f9f9f9',
                          outline: 'none',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        padding: '0.9rem',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                        background: '#f9f9f9',
                        outline: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      {categories && categories.length > 0 ? categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      )) : (
                        <option value="Uncategorized">Uncategorized</option>
                      )}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>Product Description</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the soul of this piece..."
                      style={{
                        padding: '0.9rem',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                        background: '#f9f9f9',
                        outline: 'none',
                        fontSize: '1rem',
                        resize: 'none',
                        lineHeight: '1.6'
                      }}
                    ></textarea>
                  </div>
                </form>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem 2.5rem',
                background: 'white',
                borderTop: '1px solid #eee',
                zIndex: 20
              }}>
                <button
                  type="submit"
                  form="admin-form"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1.1rem',
                    borderRadius: '16px',
                    fontSize: '1rem'
                  }}
                >
                  <Save size={18} /> {editingProduct ? 'Update Art Piece' : 'Add to Collection'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
