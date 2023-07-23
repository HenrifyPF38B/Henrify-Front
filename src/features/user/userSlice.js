import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";


const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};



export const verifyUser = createAsyncThunk("verify-User", async(thunkAPI)=>{
  try{
    return await userService.verifiyUser();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});



export const userSlice = createSlice({

  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
            .addCase(verifyUser.pending, (state, action)=>{
              state.isLoading = true;
              
            })
            .addCase(verifyUser.fulfilled, (state, action)=>{
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.message = "User verified";
              state.user = "User data";
            })
            .addCase(verifyUser.rejected, (state, action)=>{
              state.isError = true;
              state.isLoading = false;
              state.isSuccess = false;
              state.message = "User not verified";
              state.user = [];
            })

            
  }
})