export const LOGIN = 'LOGIN'
export const OPEN_EVENT = 'OPEN_EVENT'

export function login(userToken) {
    return {
        type: LOGIN,
        userToken: userToken,
    }
}


export function openEvent(eventId) {
    return {
        type: OPEN_EVENT,
        eventId: eventId
    }
}