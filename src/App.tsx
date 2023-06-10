/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { Capacitor } from "@capacitor/core"
import {
  FirebaseAuthentication,
  User as FUser,
} from "@capacitor-firebase/authentication"
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
  Paper,
  Container,
  Avatar,
  Grid,
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
  User,
  AuthProvider,
} from "firebase/auth"
import { useState } from "react"
import ColorSchemeToggle from "src/components/common/ColorSchemeToggle"
function App() {
  const { colorScheme } = useStore()
  const [user, setUser] = useState<User | FUser>()
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

  const signInWithSocial = async (
    value: "Github" | "Google" | "Twitter" | "Facebook"
  ) => {
    console.log({ value })
    try {
      let user
      switch (value) {
        case "Google": {
          const result = await FirebaseAuthentication.signInWithGoogle()
          user = result.user || undefined
          break
        }
        case "Github": {
          const result = await FirebaseAuthentication.signInWithGithub()
          user = result.user || undefined
          break
        }
        case "Twitter": {
          const result = await FirebaseAuthentication.signInWithTwitter()
          user = result.user || undefined
          break
        }
        case "Facebook": {
          const result = await FirebaseAuthentication.signInWithFacebook()
          user = result.user || undefined
          break
        }
      }
      setUser(user)
    } catch (err) {
      console.log(err)
    }
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
      <IonHeader>
        <Container className="p-2">
          <Grid justify="space-between" align="center">
            <Grid.Col span={2}>
              <Avatar src={"./assets/react.svg"} />
            </Grid.Col>
            <Grid.Col span={10}>
              <Flex justify="end">
                <ColorSchemeToggle />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </IonHeader>
      <IonContent>
        <Container bg={colorScheme} py="md">
          <Stack spacing={20}>
            <Paper p={20}>
              <Title>Firebase Auth</Title>

              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack spacing={10}>
                  <Text size={"lg"} mt={"lg"}>
                    Email / Password Auth
                  </Text>

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
                    {user ? (
                      <Box className="mt-2">
                        <Text className="text-white text-center">
                          user: {user?.displayName ?? user?.email}
                        </Text>
                        <Button fullWidth mt={10} onClick={userSignOut}>
                          Sign Out
                        </Button>
                      </Box>
                    ) : (
                      <Flex w="100%" mt={10} gap={10}>
                        <Button fullWidth onClick={login}>
                          Login
                        </Button>
                        <Button fullWidth onClick={register}>
                          Register
                        </Button>
                      </Flex>
                    )}
                  </Stack>
                </Stack>
              </form>
            </Paper>
            <Divider />
            <Flex
              direction="column"
              gap={20}
              mt={20}
              w="70%"
              mx={"auto"}
              align="center"
            >
              <Button
                onClick={() =>
                  Capacitor.isNativePlatform()
                    ? signInWithSocial("Google")
                    : handleSocialSignin(googleProvider)
                }
                fullWidth
                variant="outline"
                leftIcon={<IconBrandGoogle />}
              >
                SignIn With Google
              </Button>
              <Button
                onClick={() =>
                  Capacitor.isNativePlatform()
                    ? signInWithSocial("Facebook")
                    : handleSocialSignin(facebookProvider)
                }
                fullWidth
                variant="outline"
                leftIcon={<IconBrandFacebook />}
              >
                SignIn With Facebook
              </Button>
              <Button
                onClick={() =>
                  Capacitor.isNativePlatform()
                    ? signInWithSocial("Twitter")
                    : handleSocialSignin(twitterProvider)
                }
                fullWidth
                variant="outline"
                leftIcon={<IconBrandTwitter />}
              >
                SignIn With Twitter
              </Button>
              <Button
                onClick={() =>
                  Capacitor.isNativePlatform()
                    ? signInWithSocial("Github")
                    : handleSocialSignin(githubProvider)
                }
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
        </Container>
      </IonContent>
    </IonPage>
  )
}

export default App
