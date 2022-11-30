import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import notifee, { AndroidStyle, TimestampTrigger, TriggerType, IntervalTrigger, TimeUnit, AndroidImportance, AndroidColor } from '@notifee/react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  async function onDisplayRemoteNotification() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);
        });
    } 
    else {
      console.log('Authorization status:', authStatus);
    }
  }

  // Local notification - on a button click
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'The main body content of the notification',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        largeIcon: require("./assets/icon.png"),
        style: { type: AndroidStyle.BIGPICTURE, picture: require('./assets/learning.jpg') },
      },
    });
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Send Notification through Notifee</Text>
      <Button 
        title="Display Local Notification" 
        onPress={() => onDisplayNotification()} 
      />
      <Button 
        title="Generate Token" 
        onPress={() => onDisplayRemoteNotification()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});