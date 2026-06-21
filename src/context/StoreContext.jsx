import React, { createContext, useContext, useState } from 'react';

const defaultSettings = {
  name: 'Riwaayat Pots',
  address: 'Multan Road, Lahore, Pakistan',
  email: 'support@mattiart.pk',
  phone: '+92 42 1234 5678',
  whatsapp: '+92 42 1234 5678',
  timing: 'Mon – Sat: 9am – 7pm',
  tagline: 'Preserving the ancient craft of clay pottery while bringing modern design to your everyday lifestyle.',
};

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('rp_store_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const updateSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem('rp_store_settings', JSON.stringify(merged));
  };

  return (
    <StoreContext.Provider value={{ settings, updateSettings }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
