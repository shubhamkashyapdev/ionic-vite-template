import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import Router from "src/components/router/Router"
import Header from "src/components/layout/Header"

const App = () => {
  return (
    <IonPage>
      <IonReactRouter>
        <Header />
        <Router />
      </IonReactRouter>
    </IonPage>
  )
}

export default App
