import React, {createContext, useContext, useState, useEffect} from 'react'

import { toast } from 'react-hot-toast'


const Context = createContext()

export const StateContext = ({ children })=>{
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const onRemove = (product)=>{
        foundProduct = cartItems.find((item)=>item._id === product._id)
        const newCartItems = cartItems.filter((item)=> item._id !== product._id)

        setTotalPrice((state)=>state - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((state)=>state - foundProduct.quantity)
        setCartItems(newCartItems)

    }

    const toggleCartItemQuantity = (id, value) =>{
        foundProduct = cartItems.find((item)=>item._id === id)
        index = cartItems.findIndex((item)=>item._id === id)
        const newCartItems = cartItems.filter((item)=> item._id !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((state)=>state + foundProduct.price)
            setTotalQuantities((state)=>state + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice((state)=>state - foundProduct.price)
                setTotalQuantities((state)=>state - 1)
            }
        }else{

        }
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity)
        setTotalQuantities((state)=> state + quantity)

        if(checkProductInCart){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity : cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems) 
        }else{
            product.quantity = quantity
            
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)

    }

    const incQty = ()=>{
        setQty((state) => state + 1)
    }
    const decQty = ()=>{
        setQty((state) => {
            if(state - 1 < 1) return 1

            return state - 1}
        )
    }

    return (
      <Context.Provider
        value={{
          showCart,
          cartItems,
          totalPrice,
          totalQuantities,
          qty,
          incQty,
          decQty,
          onAdd,
          setShowCart,
          toggleCartItemQuantity,
          onRemove,
          setCartItems,
          setTotalPrice,
          setTotalQuantities,
        }}
      >
        {children}
      </Context.Provider>
    );

}


export const useStateContext = () => useContext(Context)