import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { collection, onSnapshot, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('wayio_categories');
    return saved ? JSON.parse(saved) : ['Vases', 'Dining', 'Traditional', 'Garden', 'Lifestyle'];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('wayio_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
    {
      id: 1,
      name: 'Rustic Terracotta Vase',
      price: 4500,
      quantity: 12,
      category: 'Vases',
      description: 'Hand-thrown terracotta vase with a natural matte finish, perfect for dried flowers.',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'
    },
    {
      id: 2,
      name: 'Hand-Painted Clay Bowl',
      price: 3200,
      quantity: 8,
      category: 'Dining',
      description: 'Traditional patterns hand-painted on a durable glazed clay bowl.',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80'
    },
    {
      id: 3,
      name: 'Artisan Coffee Mug',
      price: 1800,
      quantity: 25,
      category: 'Dining',
      description: 'Ergonomic clay mug with a beautiful speckled glaze for your morning coffee.',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06ac992a?w=800&q=80'
    },
    {
      id: 4,
      name: 'Ancient Style Water Pot',
      price: 7500,
      quantity: 5,
      category: 'Traditional',
      description: 'Keep your water cool naturally with this traditional porous clay pitcher.',
      image: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80'
    },
    {
      id: 5,
      name: 'Miniature Succulent Pot',
      price: 1200,
      quantity: 30,
      category: 'Garden',
      description: 'Tiny hand-molded pots perfect for small indoor succulents.',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80'
    },
    {
      id: 6,
      name: 'Earthen Serving Platter',
      price: 5500,
      quantity: 10,
      category: 'Dining',
      description: 'Large oval platter with a rustic edge, ideal for family gatherings.',
      image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=800&q=80'
    },
    {
      id: 7,
      name: 'Hand-Carved Clay Lamp',
      price: 8900,
      quantity: 7,
      category: 'Lifestyle',
      description: 'Intricate patterns hand-carved into clay, creating beautiful shadow patterns when lit.',
      image: 'https://images.unsplash.com/photo-1574914629385-a047a2825801?w=800&q=80'
    },
    {
      id: 8,
      name: 'Traditional Lassi Glass',
      price: 950,
      quantity: 40,
      category: 'Dining',
      description: 'Classic clay glass for a traditional refreshing experience. Keeps drinks cool.',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80'
    },
    {
      id: 9,
      name: 'Garden Clay Chimenea',
      price: 18500,
      quantity: 3,
      category: 'Garden',
      description: 'Stunning outdoor clay fireplace, perfect for cozy evening gatherings.',
      image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2bc8d6?w=800&q=80'
    },
    {
      id: 10,
      name: 'Glazed Ceramic Teapot',
      price: 4200,
      quantity: 12,
      category: 'Dining',
      description: 'Artisanal teapot with a deep blue glaze, combining tradition with modern aesthetics.',
      image: 'https://images.unsplash.com/photo-1576020482031-f281da96429d?w=800&q=80'
    }
  ]});

  useEffect(() => {
    localStorage.setItem('wayio_products', JSON.stringify(products));
  }, [products]);

  // Always keep a synchronous ref to the latest products for tryDeductStock
  const productsRef = useRef(products);
  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wayio_categories', JSON.stringify(categories));
  }, [categories]);

  // Sync with Firebase in real-time
  useEffect(() => {
    if (!db) return;

    // Sync products — use smart merge so local quantity deductions
    // are not immediately overwritten by a stale Firestore echo.
    const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const fbProducts = [];
      snapshot.forEach(doc => fbProducts.push({ id: doc.id, ...doc.data() }));

      setProducts(prevProducts => {
        // If we have no local state yet, just use Firebase data
        if (prevProducts.length === 0) return fbProducts;

        // Merge: for each FB product, prefer the lower quantity so that
        // a local deduction that hasn't round-tripped yet is kept.
        return fbProducts.map(fbP => {
          const local = prevProducts.find(p => p.id === fbP.id);
          if (!local) return fbP;
          // Take whichever quantity is lower (local deduction wins until
          // Firestore echoes the real write-back)
          return { ...fbP, quantity: Math.min(fbP.quantity, local.quantity) };
        });
      });
    });

    // Sync categories
    const unsubscribeCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      if (!snapshot.empty) {
        const fbCats = [];
        snapshot.forEach(doc => fbCats.push(doc.data().name));
        setCategories(fbCats);
      } else {
        // If empty, set defaults to Firebase
        ['Vases', 'Dining', 'Traditional', 'Garden', 'Lifestyle'].forEach(cat => {
          setDoc(doc(collection(db, "categories"), cat), { name: cat }).catch(e => console.error(e));
        });
      }
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
    if (db) setDoc(doc(db, "products", newProduct.id), newProduct).catch(e => console.error(e));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    if (db) {
      const { id, ...data } = updatedProduct;
      updateDoc(doc(db, "products", id.toString()), data).catch(e => console.error(e));
    }
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (db) deleteDoc(doc(db, "products", id.toString())).catch(e => console.error(e));
  };

  // adjustStock only updates LOCAL state (used for cart add/remove).
  // Firebase is updated only when the order is confirmed — see commitStockToFirebase.
  const adjustStock = (id, amount) => {
    setProducts(prevProducts => prevProducts.map(p =>
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + amount) } : p
    ));
  };

  // Called by Cart after a successful order submission to persist
  // the final quantities to Firestore for ALL ordered items at once.
  const commitStockToFirebase = (orderedItems) => {
    if (!db) return;
    orderedItems.forEach(item => {
      const current = productsRef.current.find(p => p.id === item.id);
      if (current) {
        updateDoc(doc(db, 'products', item.id.toString()), { quantity: current.quantity })
          .catch(e => console.error('Stock commit error:', e));
      }
    });
  };

  // Atomic check and deduct for better reliability
  const tryDeductStock = (id) => {
    // Read directly from the current products array (already in closure scope via ref)
    const currentProducts = productsRef.current;
    const product = currentProducts.find(p => p.id === id);

    if (!product || product.quantity <= 0) {
      return false;
    }

    const newQuantity = product.quantity - 1;

    setProducts(prevProducts =>
      prevProducts.map(p => p.id === id ? { ...p, quantity: newQuantity } : p)
    );
    // No Firebase write here — committed only when order is placed
    return true;
  };

  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories(prev => [...prev, categoryName]);
      if (db) {
        setDoc(doc(collection(db, "categories"), categoryName), { name: categoryName }).catch(e => console.error(e));
      }
    }
  };

  const deleteCategory = (categoryName) => {
    setCategories(prev => prev.filter(c => c !== categoryName));
    if (db) {
      deleteDoc(doc(db, "categories", categoryName)).catch(e => console.error(e));
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, adjustStock, tryDeductStock, commitStockToFirebase, categories, addCategory, deleteCategory }}>
      {children}
    </ProductContext.Provider>
  );
};
