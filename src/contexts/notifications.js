import PushNotification, {Importance} from "react-native-push-notification";

PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: "notify-irrigation-channel",
      channelName: "My channel"
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

  export const LocalNotification = (plantacao, time, key) => {
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 3 * 1000),
      id: key,
      channelId: 'notify-irrigation-channel',
      title: 'Notificação de Irrigação',
      message: 'Está na hora de irrigar sua plantação de '+plantacao,
      repeatType: 'time',
      repeatTime: 86400000
      
    });
  }