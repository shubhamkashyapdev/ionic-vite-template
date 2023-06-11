import { createThemeStore } from "src/store/themeStore"
import { createAuthStore } from "src/store/authStore"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { CombineStore } from "./store"

export const useStore = create<CombineStore>()(
  devtools(
    (...a) => ({
      ...createThemeStore(...a),
      ...createAuthStore(...a),
    }),
    { enabled: true }
  )
)
