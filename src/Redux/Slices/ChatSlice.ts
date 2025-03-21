import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  selectedFriend: {
    _id: string | null;
    name: string | null;
  };
}

const initialState: ChatState = {
  selectedFriend: {
    _id: null,
    name: null,
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedFriend: (state, action: PayloadAction<{ _id: string; name: string }>) => {
      console.log('ac', action.payload)
      state.selectedFriend = action.payload; // Update selected friend
    },
  },
});

export const { setSelectedFriend } = chatSlice.actions;
export default chatSlice.reducer;
