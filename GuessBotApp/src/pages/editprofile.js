import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from "react-native-firebase";

export default class EditProfile extends React.Component {
  state = {
    oldusername: this.props.navigation.getParam("username", null),
    username: this.props.navigation.getParam("username", null),
    email: this.props.navigation.getParam("email", null),
    errorMessage: null
  };

  updateProfile = () => {
    const { oldusername, username, email } = this.state;
    if (username.length < 4) {
      this.setState({ errorMessage: "Username must be at least 4 characters" });
    } else {
      firebase
        .firestore()
        .collection("users")
        .where("email", "==", email) //match entry with old username
        .get()
        .then(querySnapshot => {
          //Update username entry in database
          querySnapshot.forEach(function(doc) {
            firebase
              .firestore()
              .collection("users")
              .doc(doc.id)
              .update({ username: username });
          });

          this.setState({
            oldusername: username
          });
        })
        .catch(function(error) {
          console.log("Error" + error);
          this.setState({ errorMessage: error.message });
        });
    }
  };

  render() {
    const { email, username, oldusername } = this.state;

    return (
      <View style={styles.container}>
        <Text>Edit Profile</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Button title="Save" onPress={this.updateProfile} />
        <Button
          title="Back"
          onPress={() =>
            this.props.navigation.navigate("Main", {
              username: oldusername,
              email: email
            })
          }
        />
      </View>
    );
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
