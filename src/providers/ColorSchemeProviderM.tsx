import { ColorSchemeProvider } from "@mantine/core"
import React from "react"
import { useStore } from "src/store"

const ColorSchemeProviderM: React.FC<ChildrenType> = ({ children }) => {
  const { toggleColorScheme } = useStore()
  return (
    <ColorSchemeProvider
      colorScheme={"dark"}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProvider>
  )
}

export default ColorSchemeProviderM
