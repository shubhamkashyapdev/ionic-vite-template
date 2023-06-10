import React from "react"
import { MantineProvider } from "@mantine/core"
import { useStore } from "src/store"

const MantineProviderC: React.FC<ChildrenType> = ({ children }) => {
  const { colorScheme } = useStore()
  return (
    <MantineProvider
      theme={{
        colorScheme: colorScheme,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  )
}

export default MantineProviderC
