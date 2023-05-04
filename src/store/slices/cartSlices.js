import { createSlice } from "@reduxjs/toolkit";


//Handles a reducer and its action

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        cartItems: [],
        wishlistItems:[],
        fetchProducts:[],
        userdetails:[],
    },
    reducers: {
        addItem: (state, action) => {
            state.cartItems = action.payload;
        },
        addWishlistItem: (state, action) => {
            state.wishlistItems = action.payload;
        },
        addFetchProducts:(state, action)=>{
            state.fetchProducts = action.payload
        },
        addUser:(state,action)=>{
            state.userdetails = action.payload
        },
        increaseQty: (state, action) => {
            // const index = state.cartItems.indexOf(action.payload)
            // console.log(index)
            // console.log(state.cartItems)
            // state.cartItems[index].quantity++
        }
    }
});

export default counterSlice.reducer;
export const { addItem, addWishlistItem, addFetchProducts, addUser} = counterSlice.actions;
export const cartQuantity = (state) => (state.cartItems.length)
export const getWishlist = (state) => (state.wishlistItems.length)
export const getfetch = (state) => (state.fetchProducts)
export const getUser = (state) => (state.userdetails)
export const getTotal = (state) =>(state.cartItems.reduce((n,m)=> n+m.product.price, 0))