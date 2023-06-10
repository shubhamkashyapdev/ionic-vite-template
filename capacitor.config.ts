/// <reference types="@capacitor-firebase/authentication" />
import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.employee.management.app",
  appName: "vite-and-capacitor",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com", "github.com", "twitter.com", "facebook.com"],
    },
  },
}

export default config
