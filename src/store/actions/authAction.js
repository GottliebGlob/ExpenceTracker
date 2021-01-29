import { firebase } from '../../firebase/config'



export const signup = (email, password) => {
    return async () => {
        await  firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
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


export const login = (email, password) => {
    return async () => {
        await firebase
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
                            return;
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

};

export const google = () => {
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
