/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { Paper, Text } from "@mantine/core"
import React, { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import About from "src/pages/About"
import Contact from "src/pages/Contact"
import Home from "src/pages/Home"
import Services from "src/pages/Services"
import { useStore } from "src/store"

function Tabs() {
  const [active, setActive] = useState<string>("Home")
  const { colorScheme } = useStore()

  const tabBarStyle = {
    "--ion-background-color": colorScheme === "dark" ? "black" : "white",
    "--ion-color-primary": colorScheme === "dark" ? "white" : "black",
    "--ion-color-primary-contrast": colorScheme === "dark" ? "black" : "white",
  } as React.CSSProperties
  return (
    <IonTabs
      // @ts-ignore
      style={tabBarStyle}
      onIonTabsDidChange={(tab) => setActive(tab.detail.tab)}
    >
      <IonRouterOutlet>
        <Route exact path="/app/home" component={Home} />
        <Route exact path="/app/about" component={About} />
        <Route exact path="/app/contact" component={Contact} />
        <Route exact path="/app/services" component={Services} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Home" href="/app/home">
          <Paper
            bg={active === "Home" ? "dark" : "transparent"}
            p="sm"
            radius="xl"
          >
            <Text
              color={
                colorScheme === "light" && active === "Home"
                  ? "white"
                  : colorScheme === "dark"
                  ? "light"
                  : "dark"
              }
            >
              Home
            </Text>
          </Paper>
        </IonTabButton>
        <IonTabButton tab="About" href="/app/about">
          <Paper
            bg={active === "About" ? "dark" : "transparent"}
            p="sm"
            radius="xl"
          >
            <Text
              color={
                colorScheme === "light" && active === "About"
                  ? "white"
                  : colorScheme === "dark"
                  ? "light"
                  : "dark"
              }
            >
              About
            </Text>
          </Paper>
        </IonTabButton>
        <IonTabButton tab="Contact" href="/app/contact">
          <Paper
            bg={active === "Contact" ? "dark" : "transparent"}
            p="sm"
            radius="xl"
          >
            <Text
              color={
                colorScheme === "light" && active === "Contact"
                  ? "white"
                  : colorScheme === "dark"
                  ? "light"
                  : "dark"
              }
            >
              Contact
            </Text>
          </Paper>
        </IonTabButton>
        <IonTabButton tab="Services" href="/app/services">
          <Paper
            bg={active === "Services" ? "dark" : "transparent"}
            p="sm"
            radius="xl"
          >
            <Text
              color={
                colorScheme === "light" && active === "Services"
                  ? "white"
                  : colorScheme === "dark"
                  ? "light"
                  : "dark"
              }
            >
              Services
            </Text>
          </Paper>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
