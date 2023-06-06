import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { Button, Loader, Stack, Box, Text } from "@mantine/core"
import { useStore } from "./store"
import { useUserQuery } from "./services/users.service"

function App() {
  const { currentTheme, setTheme } = useStore()
  function handleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }
  const { data: users, isLoading: usersLoading } = useUserQuery()
  return (
    <IonPage>
      <IonHeader>My header!</IonHeader>
      <IonContent>
        <Button onClick={handleTheme}>{currentTheme}</Button>
        {usersLoading ? (
          <Loader />
        ) : (
          <Stack spacing={20}>
            {users?.map((user: User) => (
              <Box>
                <Text>{user.name}</Text>
              </Box>
            ))}
          </Stack>
        )}
      </IonContent>
    </IonPage>
  )
}

export default App
