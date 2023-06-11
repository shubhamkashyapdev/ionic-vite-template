import { useIonRouter } from "@ionic/react"
import { Menu } from "@mantine/core"
import {
  IconLogin,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react"
import { signOut } from "firebase/auth"
import { auth } from "src/firebase"
import { useStore } from "src/store"

function ProfileMenu({ children }: ChildrenType) {
  const navigation = useIonRouter()
  const { user, setUser } = useStore()

  async function userSignOut() {
    try {
      await signOut(auth)
      setUser(undefined)
      goToLogin()
    } catch (err) {
      console.log(err)
    }
  }
  function goToLogin() {
    console.log("go to login")
    navigation.push("/", "root", "replace")
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Account</Menu.Item>
        {user ? (
          <Menu.Item onClick={userSignOut} icon={<IconLogout size={14} />}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item onClick={goToLogin} icon={<IconLogin size={14} />}>
            Login
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu
