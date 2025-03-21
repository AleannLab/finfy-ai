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
  streamMessage: string;
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
  streamMessage: "",
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
    created_at?: string;
  }) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([dataMessage])
      .select();
    if (error) {
      Sentry.captureException(error);
      throw error;
    }

    if (dataMessage?.message_type === "bot") {
      return null;
    }
    return data[0];
  }
);
export const createMessageInDB = async (dataMessage: {
    chat_id: string;
    user_id: number;
    content: string;
    message_type: "user" | "bot";
    is_processed?: boolean;
    response_time?: string | null;
    created_at?: string;
    files: any[]
  }) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([dataMessage])
      .select();
    if (error) {
      Sentry.captureException(error);
      throw error;
    }

    if (dataMessage?.message_type === "bot") {
      return null;
    }
  }

  const emojiMapping: any = {
    "asst_XizmVhjCdwImRlerh0Z5bh9e": "🔢", // Career Coach Assistant
    "asst_lgVcOWp45uuUf2BtodHO7gKS": "🔢", // Mathematics Tutor
    "asst_GqA9eIAqD6X4OEYfZRyNx6y0": "🌱", // Physical Sciences Tutor
    "asst_vaBKqqnSfyus1suFdb8BGqvK": "📖", // English Tutor
    "asst_yKj9zsjFZtcm4yZFhNzfztn": "🧭", // Career Coach
    "asst_e9SCWWWVAqsFGhIFB0f8RstS": "🎓", // BursaryFinder
    "asst_p5JE3MZY94FUgL9Ow5CAJqbc": "🏫", // CampusNavigator
    "asst_c6ZOXBtcSSw7Jy3F7zkzeryA": "🔍", // CareerExplorer
    "asst_YaKOJNycgzRZ62P271Od6hCP": "📚", // PersonalityQuiz
    "asst_QwfjmzMvjalp9v5x6y1SAd68": "📈", // Economics Tutor
    "asst_nxJVZh17j23ovTc4923NOdc4": "📚", // LessonCraft
    "asst_Vj1B8r7Coh1M2waAnahdbv27": "🧩", // AssessGenie
    "asst_h9xwAFmreZXrWVbjIDujBTrE": "🌐", // ClarityBot
    "asst_BvSZyrPkHJUu27VBJgixMgK": "📈", // InsightMax
    "asst_UEl50keGMUzrmR1R2Hdjlyfx": "💡", // EngageAI
    "asst_RDT2IiplUg4wCmvJL3Sedes8": "💙"  // WellnessWatch
  };
  
  const getEmojis = (assistantId: string) => {
    return emojiMapping[assistantId] || "🌤️"; // Return a default emoji if no match is found
  };

export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ userId, title, chatId, type, assistantId }: { userId: string; title: string, chatId: any, type: string, assistantId: string }, { dispatch }) => {
    const index = randomNumber(1, emojis.length);
    const currentData = new Date().toISOString();
    const emoji = getEmojis(assistantId)


    const { data, error } = await supabase
      .from("chats")
      .insert([{ title: `${title}`, id: userId, chatId, type, assistantId, created_at: currentData }])
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
      .eq("id", userId)
    if (error) {
      Sentry.captureException(error);
      throw error;
    }
    dispatch(setChats(data));
    return data;
  }
);

export const fetchChatByTread = async (chatId: string) => {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("chatId", chatId)
    if (error) {
      Sentry.captureException(error);
      throw error;
    }
    return data;
  }

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
  async (chatId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const data: any = getState();
      const { error } = await supabase.from("chats").delete().eq("chatId", chatId);
      if (error) {
        Sentry.captureException(error);
        throw error;
      }
      dispatch(fetchChatsByUserId(data.user.user.id))
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
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

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
    setStreamMessage(state, action: PayloadAction<string>) {
      state.streamMessage = action.payload;
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
  setStreamMessage
} = chatSlice.actions;
export default chatSlice.reducer;
