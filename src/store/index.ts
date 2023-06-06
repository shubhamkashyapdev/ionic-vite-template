import { createThemeStore } from "src/store/themeStore"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
export const useStore = create<CombineStore>()(
  devtools(
    (...a) => ({
      ...createThemeStore(...a),
    }),
    { enabled: true }
  )
)
