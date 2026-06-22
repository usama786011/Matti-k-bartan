import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

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

  useEffect(() => {
    localStorage.setItem('rp_store_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(doc(db, "settings", "store"), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...defaultSettings, ...docSnap.data() }));
      } else {
        setDoc(doc(db, "settings", "store"), settings).catch(e => console.error(e));
      }
    });
    return () => unsubscribe();
  }, []);

  const updateSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    if (db) {
      setDoc(doc(db, "settings", "store"), merged).catch(e => console.error(e));
    }
  };

  return (
    <StoreContext.Provider value={{ settings, updateSettings }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
