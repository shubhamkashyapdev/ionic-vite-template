import { StateCreator } from "zustand"
import { AuthStore, CombineStore, User } from "./store"

export const createAuthStore: StateCreator<CombineStore, [], [], AuthStore> = (
  set
) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
})
