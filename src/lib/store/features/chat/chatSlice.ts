import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosExternal } from "@/utils/axios";
import { getErrorMessage, randomNumber } from "@/utils/helpers";
import { supabase } from "@/lib/supabase/client";
import * as Sentry from "@sentry/nextjs";
import { emojis } from "@/utils/variables";

interface ChatState {
  user_id: string;
  chat_id: string;
  history: string[];
  user_query: string;
  loading: boolean;
  loadingSendMessage: boolean;
  error: string | null;
  output: string | null;
  calculations: any | null;
  chats: any[];
  messages: any[];
  suggests: any;
}

interface ChatResponse {
  data: any;
  error?: string;
}

const initialState: ChatState = {
  user_id: "",
  chat_id: "",
  history: [],
  user_query: "",
  loading: true,
  loadingSendMessage: false,
  error: null,
  output: null,
  calculations: null,
  chats: [],
  messages: [],
  suggests: null,
};

export const sendChatQuery = createAsyncThunk<
  ChatResponse | any,
  Partial<ChatState>
>(
  "chat/sendChatQuery",
  async ({ user_id, chat_id, history, user_query }, { rejectWithValue }) => {
    try {
      const response = await axiosExternal.post(`/chat` as string, {
        user_id: user_id || "",
        chat_id: chat_id || "",
        history: history || [],
        user_query: user_query || "",
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error || "Something went wrong");
      }
      return response.data;
    } catch (error: any) {
      Sentry.captureException(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (dataMessage: {
    chat_id: string;
    user_id: number;
    content: string;
    message_type: "user" | "bot";
    is_processed?: boolean;
    response_time?: string | null;
  }) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([dataMessage])
      .select();
    if (error) {
      Sentry.captureException(error);
      throw error;
    }
    return data[0];
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ userId, title, chatId }: { userId: string; title: string, chatId: any }, { dispatch }) => {
    const index = randomNumber(1, emojis.length);

    const { data, error } = await supabase
      .from("chats")
      .insert([{ title: `${title}`, id: userId, chatId }])
      .select();

    if (error) {
      Sentry.captureException(error);
      console.error("Error creating chat:", error);
      throw new Error("Failed to create chat.");
    }

    if (!data || data.length === 0) {
      throw new Error("No chat data returned from Supabase.");
    }

    dispatch(fetchChatsByUserId(userId))

    return data[0];
  }
);



export const fetchChatsByUserId = createAsyncThunk(
  "chat/fetchChatsByUserId",
  async (userId: string, { dispatch, getState }) => {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("id", userId);
    if (error) {
      Sentry.captureException(error);
      throw error;
    }
    dispatch(setChats(data));
    return data;
  }
);

export const updateChat = createAsyncThunk(
  "chat/updateChat",
  async (
    { id, updateData }: { id: string; updateData: any },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from("chats")
        .update(updateData)
        .eq("chatId", id)
        .select();
      if (error) {
        Sentry.captureException(error);
        throw error;
      }
      return data[0];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("chats").delete().eq("chatId", chatId);
      if (error) {
        Sentry.captureException(error);
        throw error;
      }
      return chatId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMessagesForChat = createAsyncThunk(
  "chat/fetchMessagesForChat",
  async (chatId: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId);
      if (error) {
        Sentry.captureException(error);
        throw error;
      }
      dispatch(setMessages(data));
      dispatch(setIsLoading(false));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserQuery(state, action: PayloadAction<string>) {
      state.user_query = action.payload;
    },
    addToHistory(state, action: PayloadAction<string>) {
      state.history.push(action.payload);
    },
    resetChat(state) {
      state.history = [];
      state.chat_id = "";
      state.output = null;
      state.calculations = null;
      state.messages = [];
    },
    setChatId(state, action: PayloadAction<string>) {
      state.chat_id = action.payload;
    },
    setIsLoadingSendMessage(state, action: PayloadAction<boolean>) {
      state.loadingSendMessage = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSuggestQuestions(state, action: PayloadAction<any>) {
      state.suggests = action.payload;
    },
    setMessages(state, action: PayloadAction<any[]>) {
      state.messages = action.payload;
    },
    setChats(state, action: PayloadAction<any[]>) {
      state.chats = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.history.push(action.payload.content);
        state.messages.push(action.payload);
      });
  },
});

export const {
  setUserQuery,
  addToHistory,
  resetChat,
  setChats,
  setIsLoadingSendMessage,
  setIsLoading,
  setChatId,
  setSuggestQuestions,
  setMessages,
  addMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
