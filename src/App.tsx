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
  Group,
  Paper,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useStore } from "src/store"
import { useUserQuery } from "src/services/users.service"
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
} from "@tabler/icons-react"
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
  twitterProvider,
} from "src/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  User,
  AuthProvider,
} from "firebase/auth"
import React, { useState } from "react"
function App() {
  const { currentTheme, setTheme } = useStore()
  function handleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }
  const [user, setUser] = useState<User>()
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
      setUser(user)
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
      setUser(user)
      form.reset()
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message
        console.log(errorMessage)
      }
    }
  }

  async function userSignOut() {
    try {
      await signOut(auth)
      setUser(undefined)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = (values: any) => {
    const validated = form.validate()
    if (validated.hasErrors) return
    console.log(values)
  }

  const handleSocialSignin = async (provider: AuthProvider) => {
    try {
      const userRes = await signInWithPopup(auth, provider)
      const user = userRes.user
      setUser(user)
    } catch (err: any) {
      console.log(err)
    }
  }
  console.log(user)
  return (
    <IonPage>
      <IonHeader>My header!</IonHeader>
      <IonContent className="bg-black">
        <Stack spacing={20} bg={"dark"}>
          <Button onClick={handleTheme}>{currentTheme}</Button>
          <Divider my={20} />
          <Paper py={10}>
            <Title align="center">Firebase Auth</Title>
          </Paper>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack spacing={20} mx={30}>
              <Paper mt={20}>
                <Text size={"lg"} p={10}>
                  Email / Password Auth
                </Text>
              </Paper>

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
              <Stack align="center">
                {user?.displayName ? (
                  <Box className="mt-2">
                    <Text className="text-white text-center">
                      user: {user.displayName}
                    </Text>
                    <Button fullWidth mt={10} onClick={userSignOut}>
                      Sign Out
                    </Button>
                  </Box>
                ) : (
                  <Group spacing={10} align="center">
                    <Button onClick={login}>Login</Button>
                    <Button onClick={register}>Register</Button>
                  </Group>
                )}
              </Stack>
            </Stack>
          </form>
          <Flex
            direction="column"
            gap={20}
            mt={30}
            w="70%"
            mx={"auto"}
            align="center"
          >
            <Button
              onClick={() => handleSocialSignin(googleProvider)}
              fullWidth
              variant="outline"
              leftIcon={<IconBrandGoogle />}
            >
              SignIn With Google
            </Button>
            <Button
              onClick={() => handleSocialSignin(facebookProvider)}
              fullWidth
              variant="outline"
              leftIcon={<IconBrandFacebook />}
            >
              SignIn With Facebook
            </Button>
            <Button
              onClick={() => handleSocialSignin(twitterProvider)}
              fullWidth
              variant="outline"
              leftIcon={<IconBrandTwitter />}
            >
              SignIn With Twitter
            </Button>
            <Button
              onClick={() => handleSocialSignin(githubProvider)}
              fullWidth
              variant="outline"
              leftIcon={<IconBrandGithub />}
            >
              SignIn With GitHub
            </Button>
          </Flex>
          <Divider my={20} />
          {usersLoading ? (
            <Loader />
          ) : (
            <Paper my={10} mt={20}>
              <Title>User: {users?.length}</Title>
            </Paper>
          )}
        </Stack>
      </IonContent>
    </IonPage>
  )
}

export default App
