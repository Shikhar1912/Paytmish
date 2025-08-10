import { create } from "zustand";

export const useStore = create((set) => ({
  username: "",
  firstName: "",
  lastName: "",
  balance: 0,
  userId: "",
  setUserId: (value) => set(() => ({ userId: value })),
  setUsername: (value) => set(() => ({ username: value })),
  setFirstName: (value) => set(() => ({ firstName: value })),
  setLastName: (value) => set(() => ({ lastName: value })),
  setBalance: (value) => set(() => ({ balance: value })),
}));
