import firebase from "firebase";

const handleSuccess = data => ({success: true, result: data})
const handlError = error => ({success: false, error})
export const createDbRef = ({col, doc}) => {
    if(doc) return firebase.firestore().collection(col)
    if(col) return firebase.firestore().doc(doc)
}
export const createDocRef = name => firebase.firestore().doc(name)
export const createCollectionRef = name => firebase.firestore().collection(name)
export const createStorageRef = name => firebase.storage().ref().child(name)
export const uploadFile = async (name, file, returnUrl = true) => {
    try {
        const ref = createStorageRef(name)
        if (returnUrl) {
            const snapShot = await ref.put(file)
             const url = await snapShot.ref.getDownloadURL()
            return handleSuccess(url)
        } 
        await ref.put(file)
        return {success: true}
    } catch (error) {
        return handlError(error)
    }
}
export const updateDoc = async ({name, data}) => {
    try {
        const docRef = createDocRef(name)
        const result = await docRef.update(data)
        return handleSuccess(result)
    } catch (error) {
        return handlError(error)
    }
}