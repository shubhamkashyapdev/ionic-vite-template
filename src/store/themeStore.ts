import { StateCreator } from "zustand"

export const createThemeStore: StateCreator<
  CombineStore,
  [],
  [],
  ThemeStore
> = (set) => ({
  currentTheme: "dark",
  setTheme: (theme) => set({ currentTheme: theme }),
})
