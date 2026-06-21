import React, { createContext, useState, useContext, useEffect } from 'react';
import { useProducts } from './ProductContext';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { adjustStock, tryDeductStock } = useProducts();
  const { showNotification } = useNotification();

  // Attempt to restore stock if the user closes the tab without ordering
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (cartItems.length > 0) {
        cartItems.forEach(item => {
          adjustStock(item.id, item.quantity);
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cartItems, adjustStock]);

  const addToCart = (product) => {
    const wasDeducted = tryDeductStock(product.id);
    
    if (wasDeducted) {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
      showNotification(`${product.name} added to your bag!`, 'success');
    } else {
      showNotification("This item is currently out of stock!", 'error');
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        adjustStock(id, item.quantity);
        showNotification(`${item.name} removed from bag.`, 'info');
        return prevItems.filter(i => i.id !== id);
      }
      return prevItems;
    });
  };

  const decrementQuantity = (id) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        // Return 1 to stock
        adjustStock(id, 1);
        if (item.quantity > 1) {
          return prevItems.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
        }
        return prevItems.filter(i => i.id !== id);
      }
      return prevItems;
    });
  };

  const clearCart = (isCheckout = false) => {
    if (!isCheckout) {
      // Return all items to stock only if it's not a successful checkout
      cartItems.forEach(item => {
        adjustStock(item.id, item.quantity);
      });
    }
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementQuantity, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
