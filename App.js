import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import {AppNavigation} from "./src/navigation/AppNavigation";
import mainReducer from "./src/store/reducers/main";
import authReducer from "./src/store/reducers/auth"

const rootReducer = combineReducers({
    main: mainReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
    return (
        <Provider store={store} >
        <NavigationContainer>
           <AppNavigation />
        </NavigationContainer>
            </Provider>
    );
}


