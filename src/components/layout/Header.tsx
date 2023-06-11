import { IonHeader } from "@ionic/react"
import { Avatar, Container, Flex, Grid } from "@mantine/core"
import ColorSchemeToggle from "../common/ColorSchemeToggle"
import ProfileMenu from "./ProfileMenu"

function Header() {
  return (
    <IonHeader>
      <Container className="p-2">
        <Grid justify="space-between" align="center">
          <Grid.Col span={2}>
            <ProfileMenu>
              <Avatar component="button" src={"./assets/react.svg"} />
            </ProfileMenu>
          </Grid.Col>
          <Grid.Col span={10}>
            <Flex justify="end">
              <ColorSchemeToggle />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </IonHeader>
  )
}

export default Header
