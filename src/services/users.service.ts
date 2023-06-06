import { useQuery } from "@tanstack/react-query"
import { http } from "./axios"
import { routes } from "./routes"

const fetchUsers = async () => {
  const users = await http.get<User[]>(routes.Users.Get)
  return users.data
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}
