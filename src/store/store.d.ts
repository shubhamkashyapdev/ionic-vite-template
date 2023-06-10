type Theme = "dark" | "light"
type ThemeStore = {
  colorScheme: Theme
  toggleColorScheme: () => void
}

type CombineStore = ThemeStore
