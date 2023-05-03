import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlices";

export const store = configureStore({
    reducer:cartReducer
})