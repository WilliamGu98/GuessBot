import React from "react";
import { StyleSheet, Platform, Image, Text, View, Button } from "react-native";
import firebase from "react-native-firebase";

export default class Main extends React.Component {
  state = {
    email: this.props.navigation.getParam("email", null),
    username: this.props.navigation.getParam("username", null)
  };

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
          email: email,
          username: matches[0]
        });
      })
      .catch(function(error) {
        console.log("Error:" + error);
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
    const { email, username } = this.state;
    if (email === null) {
      //Don't render until everything is loaded
      return null;
    } else {
      return (
        <View style={styles.container}>
          <Text>Hi {email}!</Text>
          <Text>Your username is {username}</Text>
          <Button
            title="Find match"
            onPress={() =>
              this.props.navigation.navigate("LookingForMatch", {
                username: username,
                email: email
              })
            }
          />
          <Button
            title="Edit Profile"
            onPress={() =>
              this.props.navigation.navigate("EditProfile", {
                username: username,
                email: email
              })
            }
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
  }
});
