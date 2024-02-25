import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { UserType } from "../../types/user.type";
import { Navigate } from "react-router-dom";

export const fetchUserProfile = createAsyncThunk<
  UserType,
  void,
  { rejectValue: string }
>("auth/fetchUserProfile", async () => {
  try {
    const response = await axiosInstance.get("/user/api/v1/profile");
    return response.data.data;
  } catch (error) {
    if ((error as any)?.response?.status === 401) {
      <Navigate to="/login" />;
    }
  }
});

type AuthState = {
  isLoggedIn: boolean;
  userInfo: UserType | any;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload === undefined ? false : true;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
