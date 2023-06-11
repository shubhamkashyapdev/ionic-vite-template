import { User as FireUser } from "firebase/auth"
import { User as NativeFireUser } from "@capacitor-firebase/authentication"

type Theme = "dark" | "light"
type User = FireUser | NativeFireUser | undefined

type ThemeStore = {
  colorScheme: Theme
  toggleColorScheme: () => void
}

type AuthStore = {
  user: User
  setUser: (user: User) => void
}

type CombineStore = ThemeStore & AuthStore
