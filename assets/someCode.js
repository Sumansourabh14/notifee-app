import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import notifee, { AndroidStyle, TimestampTrigger, TriggerType, IntervalTrigger, TimeUnit, AndroidImportance, AndroidColor } from '@notifee/react-native';
import React from 'react';
import { Button } from 'react-native';

export default function App() {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'This is the body of the notification',
      android: {
        channelId,
        style: { type: AndroidStyle.BIGPICTURE, picture: 'https://images.unsplash.com/photo-1666904428342-6975acc1735d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80.jpg' },
        // style: { type: AndroidStyle.BIGTEXT, text: 'Large volume of text shown in the expanded state. Large volume of text shown in the expanded state. Large volume of text shown in the expanded state. Large volume of text shown in the expanded state. Large volume of text shown in the expanded state' },
        // style: {
        //   type: AndroidStyle.INBOX,
        //   lines: ['First Message', 'Second Message', 'Third Message', 'Forth Message', 'Fifth Message', 'Sixth Message'],
        // },
        // style: {
        //   type: AndroidStyle.MESSAGING,
        //   person: {
        //     name: 'John Doe',
        //     icon: 'https://my-cdn.com/avatars/123.png',
        //   },
        //   messages: [
        //     {
        //       text: 'Hey, how are you?',
        //       timestamp: Date.now() - 600000, // 10 minutes ago
        //     },
        //     {
        //       text: 'Great thanks, food later?',
        //       timestamp: Date.now(), // Now
        //       person: {
        //         name: 'Sarah Lane',
        //         icon: 'https://my-cdn.com/avatars/567.png',
        //       },
        //     },
        //   ],
        // },
      },
    });

    // const channelId = await notifee.createChannel({
    //   id: 'important',
    //   name: 'Important Notifications',
    //   importance: AndroidImportance.HIGH,
    // });
    
    // await notifee.displayNotification({
    //   title: 'Your account requires attention',
    //   body: 'You are overdue payment on one or more of your accounts!',
    //   android: {
    //     color: AndroidColor.BLUE,
    //     channelId,
    //     importance: AndroidImportance.HIGH,
    //   },
    // });
  }

  // Triggers - Timely notifications
  async function onCreateTriggerNotification() {
    const hours = 12;
    const minutes = 53;

    const date = new Date(Date.now());
    date.setHours(hours);
    date.setMinutes(minutes);

    // Create a time-based trigger
    // const trigger: TimestampTrigger = {
    //   type: TriggerType.TIMESTAMP,
    //   timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    // };

    // Create an interval-based trigger
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 15,
      timeUnit: TimeUnit.MINUTES
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: `Today at ${hours}:${minutes}am`,
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Send Notification through Notifee</Text>
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      <Text>Timely Notifications</Text>
      <Button title="Create Trigger Notification" onPress={() => onCreateTriggerNotification()} />
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
