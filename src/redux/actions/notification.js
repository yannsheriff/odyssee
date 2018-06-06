export const PLAY_NOTIFICATION = 'PLAY_NOTIFICATION'

export function printNotification(title, subtitle, subtitle2, animPath) {
    return {
        type: PLAY_NOTIFICATION,
        payload: {
            title: title,
            subtitle: subtitle, 
            subtitle2: subtitle2, 
            animPath: animPath
        }
    }
}