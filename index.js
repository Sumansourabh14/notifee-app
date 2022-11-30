import { registerRootComponent } from 'expo';

import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native';

// For foreground state
messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    console.log(remoteMessage.notification.title, remoteMessage.notification.body, remoteMessage.notification.android.imageUrl);

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        style: { type: AndroidStyle.BIGPICTURE, picture: remoteMessage.notification.android.imageUrl },
        // style: { type: AndroidStyle.BIGTEXT, text: remoteMessage.data.body },
      },
    });
});

// For background/killed state
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message received in the background!', remoteMessage);
// });

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message received in the background!', remoteMessage.notification.android);
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
