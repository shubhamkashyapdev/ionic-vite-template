import { Paper, Text, Stack } from "@mantine/core"
import { Capacitor } from "@capacitor/core"
import React from "react"
import {
  FacebookButton,
  GithubButton,
  GoogleButton,
  TwitterButton,
} from "src/components/Buttons/SocialButton"
import { AuthProvider } from "firebase/auth"
import {
  facebookProvider,
  githubProvider,
  googleProvider,
  twitterProvider,
} from "src/firebase"

type SocialAuthButtonsType = {
  signInWithSocial: (platform: SocialAuthPlatform) => void
  handleSocialSignin: (provider: AuthProvider) => void
}

const SocialAuthButtons: React.FC<SocialAuthButtonsType> = ({
  handleSocialSignin,
  signInWithSocial,
}) => {
  return (
    <>
      <Paper p="sm">
        <Text size={"lg"}>Social Auth</Text>
      </Paper>
      <Stack spacing={20} mt={10} w="100%" mx={"auto"} align="center">
        <GoogleButton
          onClick={() =>
            Capacitor.isNativePlatform()
              ? signInWithSocial("Google")
              : handleSocialSignin(googleProvider)
          }
          fullWidth
        >
          SignIn With Google
        </GoogleButton>
        <FacebookButton
          onClick={() =>
            Capacitor.isNativePlatform()
              ? signInWithSocial("Facebook")
              : handleSocialSignin(facebookProvider)
          }
          fullWidth
        >
          SignIn With Facebook
        </FacebookButton>
        <TwitterButton
          onClick={() =>
            Capacitor.isNativePlatform()
              ? signInWithSocial("Twitter")
              : handleSocialSignin(twitterProvider)
          }
          fullWidth
        >
          SignIn With Twitter
        </TwitterButton>
        <GithubButton
          onClick={() =>
            Capacitor.isNativePlatform()
              ? signInWithSocial("Github")
              : handleSocialSignin(githubProvider)
          }
          fullWidth
        >
          SignIn With GitHub
        </GithubButton>
      </Stack>
    </>
  )
}

export default SocialAuthButtons
