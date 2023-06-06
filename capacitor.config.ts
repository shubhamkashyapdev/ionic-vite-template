import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.employee.management.app",
  appName: "vite-and-capacitor",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
}

export default config
