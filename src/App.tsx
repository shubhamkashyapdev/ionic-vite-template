import { IonContent, IonHeader, IonPage } from "@ionic/react"
import {
  Button,
  Loader,
  Stack,
  Box,
  Text,
  Flex,
  Divider,
  Title,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useStore } from "src/store"
import { useUserQuery } from "src/services/users.service"
import { auth } from "src/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import React from "react"

function App() {
  const { currentTheme, setTheme } = useStore()
  function handleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }
  const { data: users, isLoading: usersLoading } = useUserQuery()
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  })

  async function login() {
    const validated = form.validate()
    if (validated.hasErrors) return
    const { email, password } = form.values
    if (!email || !password) return
    try {
      const signinRes = await signInWithEmailAndPassword(auth, email, password)
      const user = signinRes.user
      console.log({ signinUser: user })
      form.reset()
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message
        console.log(errorMessage)
      }
    }
  }
  async function register() {
    const validated = form.validate()
    if (validated.hasErrors) return
    const { email, password } = form.values
    try {
      const singupRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = singupRes.user
      console.log({ singupUser: user })
      form.reset()
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message
        console.log(errorMessage)
      }
    }
  }

  async function userSignOut() {
    signOut(auth)
  }
  const handleSubmit = (values: any) => {
    const validated = form.validate()
    if (validated.hasErrors) return
    console.log(values)
  }
  return (
    <IonPage>
      <IonHeader>My header!</IonHeader>
      <IonContent>
        <Button onClick={handleTheme}>{currentTheme}</Button>
        <Divider my={20} />
        <Title>Firebase Auth</Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack spacing={20} mx={30}>
            <Text mt={20} size={"lg"}>
              Email / Password Auth
            </Text>
            <Box maw={400}>
              <TextInput
                label="Your Email"
                placeholder="Enter your email address"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Password"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
              />
            </Box>
            {auth?.currentUser ? (
              <Box className="mt-2">
                <Text className="text-white text-center">
                  user: {auth.currentUser?.email}
                </Text>
                <Button onClick={userSignOut}>Sign Out</Button>
              </Box>
            ) : (
              <Box className="flex-row justify-center gap-4">
                <Button onClick={login}>Login</Button>
                <Button onClick={register}>Register</Button>
              </Box>
            )}
          </Stack>
        </form>
        <Divider my={20} />
        {usersLoading ? (
          <Loader />
        ) : (
          <Flex gap={20}>
            {users?.map((user: User) => (
              <Box key={user.id}>
                <Text>{user.name}</Text>
              </Box>
            ))}
          </Flex>
        )}
      </IonContent>
    </IonPage>
  )
}

export default App
