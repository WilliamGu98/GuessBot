import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";

export default class Loading extends React.Component {
  state = {
    email: this.props.navigation.getParam("email", null),
    username: this.props.navigation.getParam("username", null),
    numMatches: 1
  };

  componentDidMount() {
    //TODO: logic for finding match
    
  }

  render() {
    const { email, username, numMatches } = this.state;

    return (
      <View style={styles.container}>
        <Text>Looking for match...</Text>
        <Text>{numMatches}/4 players found</Text>
        <ActivityIndicator size="large" />
        <Button
          title="Cancel"
          onPress={() =>
            this.props.navigation.navigate("Main", {
              username: username,
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
  }
});
