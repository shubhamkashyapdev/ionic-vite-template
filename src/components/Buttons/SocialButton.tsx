/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonProps } from "@mantine/core"
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
} from "@tabler/icons-react"

export function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      leftIcon={<IconBrandGoogle />}
      variant="default"
      color="gray"
      {...props}
    />
  )
}

export function FacebookButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      leftIcon={<IconBrandFacebook />}
      sx={(theme) => ({
        backgroundColor: "#4267B2",
        color: "#fff",
        "&:not([data-disabled]):hover": {
          backgroundColor: theme.fn.darken("#4267B2", 0.1),
        },
      })}
      {...props}
    />
  )
}

export function TwitterButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      leftIcon={<IconBrandTwitter size="1rem" color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      leftIcon={<IconBrandGithub size="1rem" />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        },
        borderWidth: 1,
        borderColor: theme.colors.gray[9],
      })}
    />
  )
}
