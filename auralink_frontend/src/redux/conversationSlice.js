
// src/redux/conversationSlice.js
import { api } from '@/config/apis/axios';
import { CHAT_URLS } from '@/config/apis/urls';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    console.log('lllllllllllllllllllllllllll')
    try {
      const response = await api.get(CHAT_URLS.conversations);
      return response.data.results || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch conversations');
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversations',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    activeConversationId: null,
  },
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },
    addConversation: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateConversation: (state, action) => {
      const index = state.list.findIndex(conv => conv.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setActiveConversation, addConversation, updateConversation } = conversationSlice.actions;
export default conversationSlice.reducer;

