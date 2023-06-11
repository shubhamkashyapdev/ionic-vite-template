import { createStyles, SegmentedControl, rem } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },
  indicator: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },
  control: {
    border: "0 !important",
  },
  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}))

export default function TabControls() {
  const { classes } = useStyles()
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Home", "About", "Contact", "Services"]}
      classNames={classes}
      onChange={(item) => console.log(item)}
    />
  )
}
