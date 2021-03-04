import { firebase } from '../../firebase/config'
import {DEL} from "./mainAction";



export const signup = (email, password, name) => {
    return async () => {
        await  firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    name,
                    value: 'RU',
                    aim: 0
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }
};

export const signOut = () => {
    return async () => {
        firebase.auth().signOut().catch((error) => {
            alert(error)
        });
    }
}

export const login = (email, password) => {

    return async () => {
        await
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    })
    }

};

export const google = () => {
    console.log('hello')
    return async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase
            .auth()
            .signInWithRedirect(provider)
            .then((result) => {
                const user = result.user
                console.log(user)
            })
            .catch(error => {
                alert(error)
            })
    }

};
