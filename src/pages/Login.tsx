/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FirebaseAuthentication,
  SignInResult,
} from "@capacitor-firebase/authentication"
import {
  Button,
  Stack,
  Text,
  Flex,
  Divider,
  Title,
  TextInput,
  Paper,
  Box,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { auth } from "src/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth"
import Wrapper from "src/components/layout/Wrapper"
import SocialAuthButtons from "src/components/common/SocialAuthButtons"
import { useIonRouter } from "@ionic/react"
import { useStore } from "src/store"

function Login() {
  const navigation = useIonRouter()
  const { setUser } = useStore()

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (value.length === 0 ? "Please enter your email" : null),
      password: (value) =>
        value.length === 0
          ? "Please enter your password"
          : value.length > 30
          ? "Password length should be less than 30 characters"
          : null,
    },
  })

  async function goToHome() {
    navigation.push("/app/home", "root", "replace")
  }

  async function login() {
    const validated = form.validate()
    if (validated.hasErrors) return
    const { email, password } = form.values
    if (!email || !password) return
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      form.reset()
      setUser(result.user)
      goToHome()
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
      const result = await createUserWithEmailAndPassword(auth, email, password)
      form.reset()
      setUser(result.user)
      goToHome()
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message
        console.log(errorMessage)
      }
    }
  }

  const handleSubmit = (values: any) => {
    const validated = form.validate()
    if (validated.hasErrors) return
    console.log(values)
  }

  const signInWithSocial = async (value: SocialAuthPlatform) => {
    let result: SignInResult
    try {
      switch (value) {
        case "Google": {
          result = await FirebaseAuthentication.signInWithGoogle()
          break
        }
        case "Github": {
          result = await FirebaseAuthentication.signInWithGithub()
          break
        }
        case "Twitter": {
          result = await FirebaseAuthentication.signInWithTwitter()
          break
        }
        case "Facebook": {
          result = await FirebaseAuthentication.signInWithFacebook()
          break
        }
      }
      setUser(result?.user || undefined)
      goToHome()
    } catch (err) {
      console.log(err)
    }
  }

  const handleSocialSignin = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      goToHome()
    } catch (err: any) {
      console.log(err)
    }
  }
  return (
    <Wrapper>
      <Flex h="100%" justify="center" align="center">
        <Box w="100%" maw={600}>
          <Paper p={20}>
            <Stack spacing={20}>
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
                    <Flex w="100%" mt={10} gap={10}>
                      <Button type="submit" fullWidth onClick={login}>
                        Login
                      </Button>
                      <Button type="submit" fullWidth onClick={register}>
                        Register
                      </Button>
                    </Flex>
                  </Stack>
                </Stack>
              </form>
            </Stack>
            <Divider mt={30} />
            <SocialAuthButtons
              handleSocialSignin={handleSocialSignin}
              signInWithSocial={signInWithSocial}
            />
          </Paper>
        </Box>
      </Flex>
    </Wrapper>
  )
}

export default Login
