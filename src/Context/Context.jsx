import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const Context = createContext(null)

const ContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev => ({ ...prev, [itemId]: prev[itemId] + 1 })))
        }

    }
    const removeFromCart = (itemId) => {
        setCartItems((prev => ({ ...prev, [itemId]: prev[itemId] - 1 })))
    }
    const getTotalcartAmount = () => {
        const total = Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find((product) => product._id === itemId);
            return total + (item ? item.price * cartItems[itemId] : 0);
        }, 0);
        console.log('Total Amount:', total); // Debugging
        return total;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalcartAmount
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}
export default ContextProvider;