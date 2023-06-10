import { SegmentedControl, Group, Center, Box } from "@mantine/core"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { useStore } from "src/store"

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useStore()

  return (
    <Group>
      <SegmentedControl
        value={colorScheme}
        onChange={toggleColorScheme}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size="1rem" stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size="1rem" stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  )
}
