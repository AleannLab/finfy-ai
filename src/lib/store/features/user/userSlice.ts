import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/client";
import { axiosInternal, axiosExternal } from "@/utils/axios";
import { getErrorMessage } from "@/utils/helpers";
import { User } from "@/types";

type Status = "idle" | "loading" | "succeeded" | "failed";
interface UsersState {
  user: User | null;
  status: Status;
  statusUpdate: Status;
  error: string | null;
}

type InsertDataUser = {
  message: string;
};

const initialState: UsersState = {
  user: null,
  status: "idle",
  statusUpdate: "idle",
  error: null,
};

export const setDataUser = createAsyncThunk<InsertDataUser, string>(
  "insert_data/setDataUser",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axiosExternal.post("/insert_data", {
        user_id: user_id || "",
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error || "Something went wrong");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchUserByEmailOrPhone = createAsyncThunk<
  User | null,
  void
>("users/fetchUserByEmailOrPhone", async () => {
  try {
    const response = await axiosInternal.get("/api/get-user");
    const email = response?.data?.email;

    if (!email) {
      throw new Error("Email is required");
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data ?? null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
});


export const fetchUserById = createAsyncThunk<User, number>(
  "users/fetchUser",
  async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();
    if (error) throw error;
    return data!;
  }
);

export const createUser = createAsyncThunk<User, any>(
  "users/createUser",
  async (newUser) => {
    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .single();
    if (error) throw error;
    return data!;
  }
);

export const updateUser = createAsyncThunk<User, Partial<User>>(
  "users/updateUser",
  async (updatedUser, { getState }) => {
    const data = getState() as any;
    const { ...dataUser } = updatedUser;
    const { error } = await supabase
      .from("users")
      .update(dataUser)
      .eq("id", data.user.user.id)
      .single();
    if (error) throw error;
    return dataUser as User;
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  "users/deleteUser",
  async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
    if (error) throw error;
    return userId;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmailOrPhone.pending, (state) => { })
      .addCase(fetchUserByEmailOrPhone.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        } else {
          state.user = null;
        }
      })
      .addCase(fetchUserByEmailOrPhone.rejected, (state, action) => {
        state.error = getErrorMessage(action.error) || null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = getErrorMessage(action.error) || null;
      })
      .addCase(updateUser.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.statusUpdate = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = getErrorMessage(action.error) || null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = getErrorMessage(action.error) || null;
      });
  },
});

export default userSlice.reducer;
