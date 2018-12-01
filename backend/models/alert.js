const Expo = require('expo-server-sdk').Expo;

const TERMINATED = 0;
const REACHED_DESTINATION = 1;
const MOVING_AWAY = 2;
const ALARM_TRIGGERED = 3;
const STAGNANT = 4;
const CONNECTION_LOST = 5;
const ALERT_NEARBY_USERS = 6;
const INVITED_TO_SESSION = 7;
const JOINED_SESSION = 8;
const NEAR_DESTINATION = 9;
const ALERT_RANGE = 5; //km

async function sendNotifications(tokens, msg)
{
    let notifications = createNotifications(tokens, msg.body, msg.data);
    return new Promise((resolve, reject) => {
        if(notifications.length == 0)
        {
            throw new Error("Invalid device token.");
        }
        let expo = new Expo();
        let chunks = expo.chunkPushNotifications(notifications);
        let tickets = [];
        let numSent = 0;
        for(let chunk of chunks)
        {
            expo.sendPushNotificationsAsync(chunk).then(ticketChunk => {
                    tickets.push(ticketChunk);
                    numSent++;
                    if(numSent == notifications.length)
                    {
                        resolve(tickets);
                    }
            });
        }
    });
}

function createMessage(name, alertCode, additionalData)
{
    switch(alertCode)
    {
        case TERMINATED:
            return {
                "body": name + " has terminated the Virtual Companion Session.",
                "data": {"alertCode": alertCode}
            }
        case REACHED_DESTINATION:
            return {
                "body": name + " has reached their destination!",
                "data": {"alertCode": alertCode}
            }
        case MOVING_AWAY:
            return {
                "body": name + " is moving away from their location!",
                "data": {"alertCode": alertCode}
            }
        case ALARM_TRIGGERED:
            return {
                "body": name + " has triggered an emergency alarm!",
                "data": {"alertCode": alertCode}
            }
        case STAGNANT:
            return {
                "body": name + " has not moved in 5 minutes!",
                "data": {"alertCode": alertCode}
            }
        case CONNECTION_LOST:
            return {
                "body": "Lost connection with " + name + "!",
                "data": {"alertCode": alertCode}
            }
        case ALERT_NEARBY_USERS:
            return {
                "body": name + " is nearby and might be in trouble!",
                "data": {
                    "alertCode": alertCode,
                    "userLoc": additionalData.userLoc,
                    "userName": additionalData.userName
                }
            }
        case INVITED_TO_SESSION:
            return {
                "body":  name + " has invited you to their Virtual Companion Session!",
                "data": {
                    "alertCode": alertCode,
                    "id": additionalData.id,
                    "data": additionalData.data
                }
            }
        case JOINED_SESSION:
            return {
                "body":  name + " has joined your Companion Session!",
                "data": {
                    "alertCode": alertCode,
                }
            }
        case NEAR_DESTINATION:
            return {
                "body":  name + " is near their destination!",
                "data": {
                    "alertCode": alertCode,
                }
            }
        default: throw new Error("Invalid alert code!");
    }
}

function Notification(deviceToken, body, data)
{
    this.to = deviceToken;
    this.sound = 'default';
    this.body = (body)? body : "";
    this.data = (data)? data : {};
}

function createNotifications(tokens, body, data)
{
    let messages = [];
    for(let token of tokens)
    {
        if(!Expo.isExpoPushToken(token))
        {
            continue;
        }
        messages.push(new Notification(token, body, data));
    }
    return messages;
};

module.exports = {

    //alert codes
    "TERMINATED": TERMINATED,
    "REACHED_DESTINATION": REACHED_DESTINATION,
    "MOVING_AWAY": MOVING_AWAY,
    "ALARM_TRIGGERED": ALARM_TRIGGERED,
    "STAGNANT": STAGNANT,
    "CONNECTION_LOST": CONNECTION_LOST,
    "ALERT_NEARBY_USERS": ALERT_NEARBY_USERS,
    "INVITED_TO_SESSION": INVITED_TO_SESSION,
    "JOINED_SESSION": JOINED_SESSION,
    "NEAR_DESTINATION": NEAR_DESTINATION,
    "ALERT_RANGE": ALERT_RANGE,

    "sendNotifications": sendNotifications,
    "createMessage": createMessage,
    "Notification": Notification

}
