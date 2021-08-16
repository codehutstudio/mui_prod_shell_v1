import React, { useEffect, useState, useContext } from 'react';


import { PROFILE_TABLE_NAME } from '../_Customize';
import fbApp from '../_Db';
import { saveProfileLocal } from './_LocalStorage';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fbApp.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{currentUser}}
            displayName="Auth Provider Context"
        >
            {children}
        </AuthContext.Provider>
    )
}

export const ProfileContext = React.createContext()
export const useProfile = () => useContext(ProfileContext)
export const ProfileProvider = ({children,}) => {
    const [profile, setProfile] = useState(null)
    const [profileRef, setProfileRef] = useState(null)

    useEffect(() => {
        fbApp.auth().onAuthStateChanged(async (user) => {
            if(user) {
                const profileDoc = await fbApp.firestore().doc(`${PROFILE_TABLE_NAME}/${user.uid}`).get()
                setProfile({id: profileDoc.id, ...profileDoc.data()})
                setProfileRef(profileDoc.ref)
            }
        })
    }, [])
    useEffect(() => {
        if(profile)  {
            saveProfileLocal(profile)
        }
    }, [profile])

    useEffect(() => {
        if (profileRef) {
            profileRef.onSnapshot(doc => {
                setProfile({id: doc.id, ...doc.data()})
            })
        }
        return () => {}
    }, [profileRef])
    return (
        <ProfileContext.Provider value={{...profile}} displayName="Profile Context">
            {children}
        </ProfileContext.Provider>
    )
}