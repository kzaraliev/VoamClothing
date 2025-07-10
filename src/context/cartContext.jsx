import React, { createContext, useContext, useEffect } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import * as productService from '../services/productService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Use usePersistedState to manage cart data (storing productId, size, and quantity)
    const [cart, setCart] = usePersistedState('cart', []);

    // Clean up invalid products from cart on app start
    useEffect(() => {
        const cleanInvalidProducts = async () => {
            if (cart.length === 0) return;

            const validItems = [];
            
            for (const item of cart) {
                try {
                    const product = await productService.getOne(item.productId);
                    if (product && product.availability !== "Out of Stock") {
                        validItems.push(item);
                    }
                } catch (error) {
                    // Skip invalid products
                    console.log(`Removing invalid product ${item.productId} from cart`);
                }
            }

            // Update cart only if there are invalid items
            if (validItems.length !== cart.length) {
                setCart(validItems);
            }
        };

        cleanInvalidProducts();
    }, []); // Run only on mount

    const addToCart = (productId, size, quantity) => {
        setCart((prevCart) => {
            
            quantity = Number(quantity);

            const existingItem = prevCart.find(item => item.productId === productId && item.size === size);

            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { productId, size, quantity }];
            }
        });
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId || item.size !== size));
    };

    const changeQuantity = (productId, size, quantity) => {
        setCart((prevCart) => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.productId !== productId || item.size !== size);
            }
            return prevCart.map(item =>
                item.productId === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            );
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
