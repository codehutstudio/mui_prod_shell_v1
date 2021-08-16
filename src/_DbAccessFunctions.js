import firebase from "firebase";
import { isEmpty, isFunction } from "./libs/dataVal";
import { deleteLocalProfile } from "./Providers/_LocalStorage";
import { PROFILE_MODEL } from "./_Customize";
import fbApp from "./_Db";

export const DbLogout = () => {
    fbApp.auth().signOut();
    deleteLocalProfile()
}
/** Sign Up Functions  */
export const SignInEamilErrorCodes = {
    'auth/wrong-password': 'Password invalid'
}
const genType = (type, defaultValue) => {
    if (type === 'string') return ''
    if (type === 'number') return 0
}
const extraxtProviderProfileProps = ({user, credential = {} }) => {
    if (!isEmpty(credential)) {
        const {accessToken, idToken, providerId, signInMethod} = credential
        const {uid: id, refreshToken, providerData} = user
        return {accessToken, idToken, providerId, signInMethod,id, refreshToken, ...providerData[0] }
    } else {
        const {uid: id, refreshToken, providerData} = user
        return {id, refreshToken, ...providerData[0] }
    }
}
const genProfile = (type, {credential, user}) => {
   
   if(type === 'social') {
        const profileData = extraxtProviderProfileProps({user, credential})
        return Object.entries(PROFILE_MODEL)
        .reduce((map, [propName, {defaultValue}]) => {
             map[propName] = profileData[propName] || (isFunction(defaultValue) ? defaultValue() : defaultValue)

            return map
        }, {})
    }
    if(type === 'email') {
        const profileData = extraxtProviderProfileProps({user})
        return Object.entries(PROFILE_MODEL)
        .reduce((map, [propName, {defaultValue}]) => {
            console.log('df', propName, isFunction(defaultValue))
             map[propName] = profileData[propName] || (isFunction(defaultValue) ? defaultValue() : defaultValue)

            return map
        }, {})
    }
}
export const LoginEmail = async ({ email, password }) => {
    try {
        await fbApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        const result = await fbApp.auth().signInWithEmailAndPassword(email, password)
        return { success: true, result }
    } catch (error) {
        return { success: false, error: SignInEamilErrorCodes[error.code] }
    }

}
export const SignUpEmail = async ({ email, password }) => {
    try {
        const result = await fbApp.auth()
            .createUserWithEmailAndPassword(email, password)
        const profile = genProfile('email', result)
        console.log('p', profile)
        const user = await fbApp.firestore().collection('users')
            .doc(profile.id)
            .set(profile)
        return user === undefined ? { success: true, user } : { success: false, error: user }
        
    } catch (error) {
        return {success: false, error}
    }
}

const FacebookProvider = new firebase.auth.FacebookAuthProvider();
FacebookProvider.addScope('email')
FacebookProvider.addScope('public_profile')
FacebookProvider.setCustomParameters({ 'display': 'popup' })
export const SignUpFacebook = async () => {
    try {
        const result = await fbApp.auth().signInWithPopup(FacebookProvider)
        const profile = genProfile('social', result)
        await fbApp.firestore().collection('users')
            .doc(profile.id)
            .set(profile)
        return { success: true, profile }
    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        return { sucess: false, error: { errorCode, errorMessage, email, credential } }
    }
}
export const getFacebookDataFromProfile = user => Object.entries(user.providerData[0])
    .reduce((map, [name, value]) => {
        map[name] = value ? value : false;
        return map
    }, {})

const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
GoogleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')
export const SignUpGoogle = async () => {
    try {
        const result = await fbApp.auth().signInWithPopup(GoogleProvider)
        const profile = genProfile('social', result)
        await fbApp.firestore().collection('users')
            .doc(profile.id)
            .set(profile)
        return { success: true, profile }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email
        const credential = error.credential

        return { success: false, error: { errorCode, errorMessage, email, credential } }
    }
}
const getGoogleDataFromProfile = user => Object.entries(user.providerData[0])
    .reduce((map, [name, value]) => {
        map[name] = value ? value : false;
        return map
    }, {})

const TwitterProvider = new firebase.auth.TwitterAuthProvider()
export const SignUpTwitter = async () => {
    try {
        const result = await fbApp.auth().signInWithPopup(TwitterProvider)
        const profile = genProfile('social', result)
        await fbApp.firestore().collection('users')
            .doc(profile.id)
            .set(profile)
        return { success: true, profile }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email
        const credential = error.credential

        return { success: false, error: { errorCode, errorMessage, email, credential } }
    }
}
const getTwitterDataFromProfile = user => Object.entries(user.providerData[0])
    .reduce((map, [name, value]) => {
        map[name] = value ? value : false;
        return map
    }, {})