import { firebase } from '../../firebase/config'
import {DEL} from "./mainAction";
import {Alert} from "react-native";

const errorHandler = (error) => {
console.log('err' + error)
    switch (error.toString()) {

        case 'Error: The password is invalid or the user does not have a password.': {
            Alert.alert("Ошибка!", 'Неправильный пароль.', [
                {text: 'Принять', style: 'cancel'}
            ]);
            break
        }
        case 'Error: There is no user record corresponding to this identifier. The user may have been deleted.': {
                Alert.alert("Ошибка!", 'Такого пользователя нет.', [
                    {text: 'Принять', style: 'cancel'}
                ]);
            break
            }
        case 'Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': {
                Alert.alert("Ошибка!", 'Слишком много попыток входа. Попробуйте через несколько секунд.', [
                    {text: 'Принять', style: 'cancel'}
                ]);
            break
            }
        case 'Error: The email address is already in use by another account.': {
                Alert.alert("Ошибка!", 'Указанная почта уже используется другим аккаунтом.', [
                    {text: 'Принять', style: 'cancel'}
                ]);
            break
            }

        default: {
            Alert.alert("Ошибка!", 'Упс! Произошла неизвестная ошибка!', [
                {text: 'Принять', style: 'cancel'}
            ]);
            break
        }
    }





}

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
                    .catch(error => {
                        errorHandler(error)
                    });
            })
            .catch(error => {
                errorHandler(error)
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
                        errorHandler(error)
                    });
            })
            .catch(error => {
                errorHandler(error)
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
