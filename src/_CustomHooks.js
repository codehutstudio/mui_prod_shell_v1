import {useDocument} from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { createDocRef } from './_DbDataFunctions'

export const useDocRef = name => {
    const ref = createDocRef(name)
    const [snapShot, loading, error] = useDocument(ref)
    return [ref, 
        snapShot,  
        loading, 
        error]
}