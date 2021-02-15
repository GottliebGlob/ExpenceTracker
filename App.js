import React from 'react';

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

