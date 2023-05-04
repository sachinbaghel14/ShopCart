import { createSlice } from "@reduxjs/toolkit";


//Handles a reducer and its action

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        cartItems: [],
        wishlistItems:[],
        fetchProducts:[],
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
        increaseQty: (state, action) => {
            // const index = state.cartItems.indexOf(action.payload)
            // console.log(index)
            // console.log(state.cartItems)
            // state.cartItems[index].quantity++
        }
    }
});

export default counterSlice.reducer;
export const { addItem, addWishlistItem, addFetchProducts } = counterSlice.actions;
export const cartQuantity = (state) => (state.cartItems.length)
export const getWishlist = (state) => (state.wishlistItems)
export const getfetch = (state) => (state.fetchProducts)