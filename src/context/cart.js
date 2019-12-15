// cart context
// products context
import React from 'react'

import localCart from '../utils/localCart'

export const CartContext = React.createContext();

//Provider, Consumer = useContext() --_ to use it we need export the product context

function getCartFromLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

export function CartProvider({ children }) {

    const [total, setTotal] = React.useState(0);
    const [cart, setCart] = React.useState(getCartFromLocalStorage());//localCart);
    const [cartItems, setCartItems] = React.useState(0);

    //remove item
    const removeItem = id => {
        setCart([...cart].filter(item => item.id !== id))
    };
    //increase amount
    const increaseAmount = id => {
        const newCart = [...cart].map(item => {
            return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
        });
        setCart(newCart);
    };
    //decrease amount
    const decreaseAmount = (id, amount) => {
        if (amount === 1) { removeItem(id); return; }
        else {
            const newCart = [...cart].map(item => {
                return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
            });
            setCart(newCart);
        }
    };
    //add to cart
    const addToCart = product => {

        const { id, title, price, image/*: { url }*/ } = product;

        //const item = cart.find(item => item.id === id);
        const item = [...cart].find(item => item.id === id);
        console.log(item)
        if (item) {
            increaseAmount(id); return;
        } else {
            const newItem = { id, title, price, image/*: url*/, amount: 1 };
            const newCart = [...cart, newItem];
            setCart(newCart);
        }
    };
    //cleart Cart
    const clearCart = () => { setCart([]) };


    React.useEffect(() => {
        //localstorage
        localStorage.setItem('cart', JSON.stringify(cart))
        //cart items
        //let newCartItems = cart.reduce((acc, current)=>{
        let newCartItems = cart.reduce((total, cartItem) => {
            return total += cartItem.amount;
        }, 0);

        setCartItems(newCartItems);

        //cart total
        let newTotal = cart.reduce((total, cartItem) => {
            return total += (cartItem.amount * cartItem.price);
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
