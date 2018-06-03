export const PLAY_NOTIFICATION = 'PLAY_NOTIFICATION'

export function printNotification(title, subtitle, animPath) {
    return {
        type: PLAY_NOTIFICATION,
        payload: {
            title: title,
            subtitle: subtitle, 
            animPath: animPath
        }
    }
}