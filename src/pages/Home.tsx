import { Flex, Paper, Text } from "@mantine/core"
import Wrapper from "src/components/layout/Wrapper"
import { useStore } from "src/store"

function Home() {
  const { colorScheme } = useStore()
  return (
    <Wrapper>
      <Flex justify="center" align="center">
        <Paper bg={colorScheme === "dark" ? "white" : "dark"} p="sm">
          <Text color={colorScheme === "dark" ? "dark" : "white"}>Home</Text>
        </Paper>
      </Flex>
    </Wrapper>
  )
}

export default Home
