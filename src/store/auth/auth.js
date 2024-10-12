import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLoggedIn: false,
        role:'user',
        user: null,
        avatar: null,
    },
    reducers:{
        login(state,action){
            state.isLoggedIn=true;
            state.user = action.payload;
        },
        logout(state){
            state.isLoggedIn=false;
            state.user = null;
        },
        changeRole(state,action){
            state.role=action.payload;
        },
        updateAvatar(state, action) {
            state.avatar = action.payload;
          },
        
    }
})


export const authActions=authSlice.actions
export default authSlice.reducer