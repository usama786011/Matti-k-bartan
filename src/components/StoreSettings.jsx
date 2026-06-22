import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, MapPin, Mail, Phone, Clock, MessageCircle, Store, Save, CheckCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Field = ({ label, icon: Icon, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label style={{
      fontSize: '0.8rem', fontWeight: '700', color: 'var(--secondary)',
      display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem',
    }}>
      <Icon size={14} color="var(--primary)" /> {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '0.85rem 1.1rem',
        borderRadius: '12px', border: '1.5px solid #e5e7eb',
        fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
        background: 'white', color: 'var(--secondary)',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
      onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
    />
  </div>
);

const StoreSettings = ({ onBack }) => {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem',
          marginBottom: '1.75rem', padding: '0.5rem 0',
        }}
      >
        <ArrowLeft size={18} /> Back to Inventory
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.4rem' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '13px',
            background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Settings size={22} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', margin: 0 }}>
              Store Settings
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
              Update Your Store Information
            </p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Store Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            style={{
              background: 'white', borderRadius: '20px',
              padding: '1.75rem 2rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid rgba(194,65,12,0.07)',
            }}
          >
            <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>
              Store Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Field
                label="Store Name"
                icon={Store}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Riwaayat Pots"
              />
              <div>
                <label style={{
                  fontSize: '0.8rem', fontWeight: '700', color: 'var(--secondary)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem',
                }}>
                  <Store size={14} color="var(--primary)" /> Store Description (In Footer)
                </label>
                <textarea
                  name="tagline"
                  value={form.tagline}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: '100%', padding: '0.85rem 1.1rem',
                    borderRadius: '12px', border: '1.5px solid #e5e7eb',
                    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                    background: 'white', color: 'var(--secondary)',
                    resize: 'vertical', transition: 'border-color 0.2s', lineHeight: '1.6',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            style={{
              background: 'white', borderRadius: '20px',
              padding: '1.75rem 2rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid rgba(194,65,12,0.07)',
            }}
          >
            <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>
              Contact Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field
                label="Phone Number"
                icon={Phone}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 42 1234 5678"
              />
              <Field
                label="WhatsApp Number"
                icon={MessageCircle}
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+92 300 1234567"
              />
              <div style={{ gridColumn: '1 / -1' }}>
                <Field
                  label="Email Address"
                  icon={Mail}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="support@mattiart.pk"
                />
              </div>
            </div>
          </motion.div>

          {/* Location & Timing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'white', borderRadius: '20px',
              padding: '1.75rem 2rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid rgba(194,65,12,0.07)',
            }}
          >
            <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>
              Location and Timing Update
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Field
                label="Address"
                icon={MapPin}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Multan Road, Lahore, Pakistan"
              />
              <Field
                label="Store Timing"
                icon={Clock}
                name="timing"
                value={form.timing}
                onChange={handleChange}
                placeholder="Mon – Sat: 9am – 7pm"
              />
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', padding: '1rem',
              background: saved
                ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                : 'linear-gradient(135deg, var(--primary), #f59e0b)',
              color: 'white', border: 'none', borderRadius: '14px',
              fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
              boxShadow: saved
                ? '0 4px 20px rgba(22,163,74,0.35)'
                : '0 4px 20px rgba(194,65,12,0.35)',
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved....!' : 'Update Changes'}
          </motion.button>

        </div>
      </form>
    </div>
  );
};

export default StoreSettings;
