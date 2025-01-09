import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from 'react';








export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect (() => {
    if (requestUserPermission()){
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Permission not granted", authStatus);
    }

    //Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log (
          "Notification caused app to open from quit state: ",
          remoteMessage.notification
        );
      }
    });

    //Assume a message-notification contains a "type" property inthe data payload of the screen to open
    
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    //Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handle in the background!:", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <View style = {StyleSheet.container}>
      <Text>FCM Tutorial</Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

