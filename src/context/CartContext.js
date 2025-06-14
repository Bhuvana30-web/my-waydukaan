import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) {
      console.error('No product provided to addToCart');
      return;
    }

    setCartItems(prevItems => {
      // Create a unique identifier using id, name, and category
      const productId = product.id || product._id;
      const productName = product.name || product.title;
      const productCategory = product.category || 'uncategorized';
      
      // Check if the item already exists in the cart using all three identifiers
      const existingItemIndex = prevItems.findIndex(item => 
        (item.id === productId || item._id === productId) && 
        item.name === productName &&
        item.category === productCategory
      );

      if (existingItemIndex > -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        
        // Check if we have enough stock
        if (existingItem.stock && existingItem.quantity >= existingItem.stock) {
          console.log(`Stock limit reached for ${existingItem.name}`);
          return prevItems; // Don't update if we've reached stock limit
        }

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };
        console.log('Updated existing item:', updatedItems[existingItemIndex]);
        return updatedItems;
      } else {
        // If item doesn't exist, add it as a new item
        const newItem = {
          id: productId,
          _id: productId,
          name: productName,
          description: product.description || '',
          price: product.price || product.discountedPrice,
          originalPrice: product.originalPrice || product.price,
          image: product.image || product.imageUrl,
          imageUrl: product.image || product.imageUrl,
          quantity: 1,
          stock: product.stock || 10,
          category: productCategory,
          discount: product.discount || '',
          tag: product.tag || ''
        };
        console.log('Adding new item to cart:', newItem);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId && item._id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId || item._id === productId) {
          // Check stock limit
          if (item.stock && newQuantity > item.stock) {
            return item; // Don't update if exceeding stock
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || item.discountedPrice;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemCount = (productId) => {
    const item = cartItems.find(item => item.id === productId || item._id === productId);
    return item ? item.quantity : 0;
  };

  // Debug function to log cart state
  const logCartState = () => {
    console.log('Current Cart State:', cartItems);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      getItemCount,
      logCartState
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 