import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";

export default class Loading extends React.Component {
  componentDidMount() {
    //TODO: logic for finding match
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Looking for match</Text>
        <ActivityIndicator size="large" />
        <Button
          title="Cancel"
          onPress={() => this.props.navigation.navigate("Main")}
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
