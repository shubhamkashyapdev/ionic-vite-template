import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router-dom"

import Login from "src/pages/Login"
import Tabs from "../layout/Tabs"
const Router = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/" component={Login} />
      <Route path="/app" component={Tabs} />
    </IonRouterOutlet>
  )
}

export default Router
