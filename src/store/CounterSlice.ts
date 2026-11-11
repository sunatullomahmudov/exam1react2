
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ReduxUser = {
  id: number;
  name: string;
  job: string;
};

const initialState: ReduxUser[] = [
  { id: 1, name: "Ali", job: "Frontend" },
  { id: 2, name: "Umar", job: "Backend" },
  { id: 3, name: "Karim", job: "Designer" },
  { id: 4, name: "Said", job: "Developer" },
  { id: 5, name: "Muhammad", job: "Manager" },
  { id: 6, name: "Ahmad", job: "Tester" },
];

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    addRedux: (state, action: PayloadAction<ReduxUser>) => {
      state.push(action.payload);
    },

    editRedux: (state, action: PayloadAction<ReduxUser>) => {
      const user = state.find(
        (item) => item.id === action.payload.id
      );

      if (user) {
        user.name = action.payload.name;
        user.job = action.payload.job;
      }
    },

    deleteRedux: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addRedux,
  editRedux,
  deleteRedux,
} = userSlice.actions;

export default userSlice.reducer;
