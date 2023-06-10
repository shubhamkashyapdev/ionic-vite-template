import { StateCreator } from "zustand"

export const createThemeStore: StateCreator<
  CombineStore,
  [],
  [],
  ThemeStore
> = (set, get) => ({
  colorScheme: "dark",
  toggleColorScheme: () =>
    set({ colorScheme: get().colorScheme === "dark" ? "light" : "dark" }),
})
