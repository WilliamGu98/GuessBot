import React from "react";
import { StyleSheet, Platform, Image, Text, View, Button } from "react-native";
import firebase from "react-native-firebase";

export default class Main extends React.Component {
  state = { currentEmail: null, username: null };
  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(querySnapshot => {
        const matches = [];

        querySnapshot.forEach(function(doc) {
          matches.push(doc.data().username);
        });

        this.setState({
          currentEmail: email,
          username: matches[0]
        });
      })
      .catch(function(error) {
        console.log("ERRRRROR:" + error);
      });
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate("Login"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { currentEmail, username } = this.state;
    if (currentEmail === null) { //Don't render until everything is loaded
      return null;
    } else {
      return (
        <View style={styles.container}>
          <Text>Hi {currentEmail}!</Text>
          <Text>Your username is {username}</Text>
          <Button
            title="Find match"
            onPress={() => this.props.navigation.navigate("LookingForMatch")}
          />
          <Button title="Logout" onPress={this.handleLogout} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
