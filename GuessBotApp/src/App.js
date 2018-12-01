import React from "react";
import { Platform, StyleSheet, Image, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import the different screens
import Loading from "./pages/loading";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Main from "./pages/main";
import LookingForMatch from "./pages/lookingForMatch";

// create our app's navigation stack
export default createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      SignUp,
      Login,
      Main,
      LookingForMatch
    },
    {
      initialRouteName: "Loading"
    }
  )
);
/*
var admin = require('firebase-admin');
var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://guessbot-3fbe1.firebaseio.com'
});
*/
