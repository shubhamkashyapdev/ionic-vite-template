import { IonContent } from "@ionic/react"
import { Box } from "@mantine/core"
import React from "react"
import { useStore } from "src/store"

const Wrapper: React.FC<ChildrenType> = ({ children }) => {
  const { colorScheme } = useStore()
  return (
    <IonContent>
      <Box p="md" component="main" h="100%" pt={75} bg={colorScheme}>
        {children}
      </Box>
    </IonContent>
  )
}

export default Wrapper
