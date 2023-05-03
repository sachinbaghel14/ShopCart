import { createSlice } from "@reduxjs/toolkit";


//Handles a reducer and its action

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        cartItems: []
    },
    reducers: {
        addItem: (state, action) => {
            state.cartItems = action.payload;
        },
        removeItem: (state, action) => {

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
export const { addItem, removeItem, increaseQty } = counterSlice.actions;
export const cartQuantity = (state) => (state.cartItems.length)