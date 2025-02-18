import { redirect } from "react-router";

export function getAuthToken(){
    const token = localStorage.getItem('token')
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0 ){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();
    if (!token){
        return redirect('/auth');
    }
    return null;
}
export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration')
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getDate();
    return duration;

}