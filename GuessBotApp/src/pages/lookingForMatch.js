import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";
import firebase from "react-native-firebase";

export default class Loading extends React.Component {
  state = {
    email: this.props.navigation.getParam("email", null),
    username: this.props.navigation.getParam("username", null),
    numMatches: 1,
    matchID: null
  };

  componentDidMount() {
    const { email, password } = this.state;
    firebase
      .firestore()
      .collection("matchmaking")
      .limit(1)
      .get()
      .then(querySnapshot => {
        var matchFound = false;

        querySnapshot.forEach(doc => {
          matchID = doc.id;
          //Add user to found match
          matchFound = true;
          var users = doc.data().users;
          var numMatches = users.push(email); //should only push unique
          firebase
            .firestore()
            .collection("matchmaking")
            .doc(doc.id)
            .update({ users: users })
            .then(match =>
              this.setState({
                numMatches: numMatches,
                matchID: doc.id
              })
            );
        });

        //Create a new match
        if (!matchFound) {
          var users = [email];
          firebase
            .firestore()
            .collection("matchmaking")
            .add({ users: users })
            .then(match =>
              this.setState({
                numMatches: 1,
                matchID: match.id
              })
            );
        }

        //Issue with this
        /*
        dbMatch.onSnapshot(function(entry) {
          console.log("Current data: " + entry.data());
        });
        */
        //console.log("matchID: " + matchID);
      })
      .catch(function(error) {
        console.log("Error:" + error);
      });
  }

  //Cancel matchmaking logic
  leaveMatch = () => {
    const { email, username, matchID } = this.state;

    //Update matchID entry to remove this email, if empty delete the entry
    firebase
      .firestore()
      .collection("matchmaking")
      .doc(matchID)
      .get()
      .then(querySnapshot => {
        var users = querySnapshot.data().users;
        console.log("BEFORE: " + users);

        users = users.filter(user => {
          return user != email;
        });

        console.log ("AFTER: " + users);
        //querySnapshot.update({ users: users });

      });

    /*
    this.props.navigation.navigate("Main", {
      username: username,
      email: email
    });*/
  };

  render() {
    const { numMatches, matchID } = this.state;
    return (
      <View style={styles.container}>
        <Text>Looking for match...</Text>
        <Text>{numMatches}/3 players found</Text>
        <Text>Match ID: {matchID}</Text>
        <ActivityIndicator size="large" />
        <Button title="Cancel" onPress={this.leaveMatch} />
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
