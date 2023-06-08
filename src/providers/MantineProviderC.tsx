import React from "react"
import { MantineProvider } from "@mantine/core"

const MantineProviderC: React.FC<ChildrenType> = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      {children}
    </MantineProvider>
  )
}

export default MantineProviderC
