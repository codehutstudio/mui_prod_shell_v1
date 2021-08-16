import firebase from 'firebase'
import {
    useCollectionData,
    useDocumentData
} from 'react-firebase-hooks'

export const useDocRef = name => {
    const docRef = firebase.firestore().doc(name)
    const [value, loading, error] = useDocumentData(docRef)
    return [docRef, value, loading, error]
}