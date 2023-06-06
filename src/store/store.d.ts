type Theme = "dark" | "light"
type ThemeStore = {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
}

type CombineStore = ThemeStore
