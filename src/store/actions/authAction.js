import { firebase } from '../../firebase/config'
import {Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "../../locales"

const errorHandler = (error) => {
console.log('err' + error)
    switch (error.toString()) {

        case 'Error: The password is invalid or the user does not have a password.': {
            Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.invalidPass"), [
                {text: i18n.t("authActions.confirm"), style: 'cancel'}
            ]);
            break
        }
        case 'Error: There is no user record corresponding to this identifier. The user may have been deleted.': {
                Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.noUser"), [
                    {text: i18n.t("authActions.confirm"), style: 'cancel'}
                ]);
            break
            }
        case 'Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': {
                Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.tryAgain"), [
                    {text: i18n.t("authActions.confirm"), style: 'cancel'}
                ]);
            break
            }
        case 'Error: The email address is already in use by another account.': {
                Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.mailIsUsed"), [
                    {text: i18n.t("authActions.confirm"), style: 'cancel'}
                ]);
            break
            }
        case 'Error: A network error (such as timeout, interrupted connection or unreachable host) has occurred.': {
            Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.connectionFail"), [
                {text: i18n.t("authActions.confirm"), style: 'cancel'}
            ]);
            break
        }
        case 'Error: The email address is badly formatted.': {
            Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.usedEmail"), [
                {text: i18n.t("authActions.confirm"), style: 'cancel'}
            ]);
            break
        }

        default: {
            Alert.alert(i18n.t("authActions.error"), i18n.t("authActions.unknown"), [
                {text: i18n.t("authActions.confirm"), style: 'cancel'}
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
                    aim: 0,
                    monthStartsFrom: 0
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
        firebase.auth().signOut().then(
            AsyncStorage.setItem('offlineData', '')
        ).then(
            AsyncStorage.setItem('localData', '')
        ).then(
            AsyncStorage.setItem('Value', JSON.stringify(0))
            ).then(
            AsyncStorage.setItem('Limit', JSON.stringify(null))
        ).then(
            AsyncStorage.setItem('MonthStartsFrom', JSON.stringify(0))
        ).catch((error) => {
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


export const forgotPassword = (email) => {
    return async () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                alert(i18n.t("authActions.forgot"))
            }).catch(function (error) {
            errorHandler(error)
        })
    }
}


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
