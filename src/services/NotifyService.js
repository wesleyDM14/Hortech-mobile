import PushNotification, {Importance} from "react-native-push-notification";
import NotificationHandler  from './NoticationHandler';

export default class NotifyService {
    constructor () {
        this.createDefaultChannel();
        PushNotification.getApplicationIconBadgeNumber(function (number){
            if (number > 0) {
                PushNotification.setApplicationIconBadgeNumber(0);
            }
        });
        PushNotification.getChannels(function (channels) {
            console.log(channels);
        });
    }

    createDefaultChannel(){
        PushNotification.createChannel({
            channelId: 'default-channel-id',
            channelName: 'Default channel',
            channelDescription: 'A default channel',
            soundName: 'default',
            importance: Importance.HIGH,
            vibrate: true,
        },
            (created)=>console.log(`createChannel 'default-channel-id' returned '${created}'`)
        );
    }

    popInitialNotification(){
        PushNotification.popInitialNotification((notification) => console.log('InitialNotification:', notification));
    }

    scheduleNotify(key, plantacao, time){
        PushNotification.localNotificationSchedule({
            date: time,
            id: key,
            channelId: 'notify-irrigation-channel',
            title: 'Notificação de Irrigação',
            message: 'Está na hora de irrigar sua plantação de '+plantacao,
            repeatType: 'day'
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }
    
    requestPermissions() {
        return PushNotification.requestPermissions();
    }
    
    cancelNotify(key) {
        PushNotification.cancelLocalNotification(key);
    }
    
    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }
    
    abandonPermissions() {
        PushNotification.abandonPermissions();
    }
    
    getScheduledLocalNotifications(callback) {
        PushNotification.getScheduledLocalNotifications(callback);
    }
    
    getDeliveredNotifications(callback) {
        PushNotification.getDeliveredNotifications(callback);
    }
}