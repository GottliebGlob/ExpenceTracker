import React, {useEffect} from 'react';


import 'react-native-gesture-handler';

import { createStore, combineReducers, applyMiddleware,} from "redux";
import { Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import mainReducer from "./src/store/reducers/main";
import themeReducer from "./src/store/reducers/theme";
import loadReducer from "./src/store/reducers/load";
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import Navigation from './Navigation'
import {loadLocale} from "./src/locales";


const rootReducer = combineReducers({
    main: mainReducer,
    theme: themeReducer,
    load: loadReducer
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

    const initLocales = async () => {
        await loadLocale()
    }

    useEffect(() => {
        initLocales()
    }, [])

    return (
        <Provider store={store} >
            <>
                <Navigation/>
            </>
            </Provider>
    );
}

