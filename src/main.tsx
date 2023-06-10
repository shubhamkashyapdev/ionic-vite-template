import React from "react"
import ReactDOM from "react-dom/client"
import App from "src/App"
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"
import "src/index.css"

/* Core Ionic framework styles */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"
import ReactQueryProvider from "src/providers/ReactQueryProviderC"
import MantineProviderC from "src/providers/MantineProviderC"
import { ColorSchemeProvider } from "@mantine/core"
import ColorSchemeProviderM from "./providers/ColorSchemeProviderM"

setupIonicReact()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ColorSchemeProviderM>
        <MantineProviderC>
          <IonApp>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/home" component={App} />
                <Redirect exact from="/" to="/home" />
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </MantineProviderC>
      </ColorSchemeProviderM>
    </ReactQueryProvider>
  </React.StrictMode>
)
