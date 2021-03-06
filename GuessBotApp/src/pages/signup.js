import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from "react-native-firebase";

export default class SignUp extends React.Component {
  state = { email: "", password: "", username: "", errorMessage: null };

  handleSignUp = () => {
    const { email, password, username } = this.state;
    if (email == "" || password == "" || username == "") {
      this.setState({ errorMessage: "All fields must be entered" });
    }
    else if (username.length < 4){
      this.setState({ errorMessage: "Username must be at least 4 characters" });
    }
    else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userdata =>
          firebase
            .firestore()
            .collection("users")
            .add({ username: username, id: userdata.user.uid, email: email })
        ) //adds a username to firestore db
        .then(user => this.props.navigation.navigate("Main"))
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
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
