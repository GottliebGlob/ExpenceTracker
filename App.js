import React from 'react';

import 'expo-firestore-offline-persistence'
import {firebase} from "./src/firebase/config";

firebase.firestore().enablePersistence().catch(function(err) {
    if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
    }
});

import 'react-native-gesture-handler';

import { createStore, combineReducers, applyMiddleware,} from "redux";
import { Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import mainReducer from "./src/store/reducers/main";
import themeReducer from "./src/store/reducers/theme";

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import Navigation from './Navigation'


const rootReducer = combineReducers({
    main: mainReducer,
    theme: themeReducer
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

    return (
        <Provider store={store} >
            <>
                <Navigation/>
            </>
            </Provider>
    );
}

