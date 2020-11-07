export const LOGIN = 'LOGIN'

export function login(userToken) {
    return {
        type: LOGIN,
        userToken: userToken,
    }
}