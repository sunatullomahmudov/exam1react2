
import { create } from "zustand";

type ZustandUser = {
  id: number;
  age: number;
  status: boolean;
};

type UserStore = {
  users: ZustandUser[];
  addUser: (user: ZustandUser) => void;
  editUser: (user: ZustandUser) => void;
  deleteUser: (id: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [
    { id: 1, age: 20, status: true },
    { id: 2, age: 22, status: false },
    { id: 3, age: 19, status: true },
    { id: 4, age: 24, status: true },
    { id: 5, age: 21, status: false },
    { id: 6, age: 23, status: true },
  ],

  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },

  editUser: (updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
}));
