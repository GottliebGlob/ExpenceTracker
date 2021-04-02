import React from 'react';
import {PixelRatio} from "react-native";


const getRightScale = (a, b) => {
    return (a / PixelRatio.get() + (PixelRatio.get() * b)) / 2
}

export const getRightFontScale = (a) => {

    let deviceScale = PixelRatio.getFontScale()
    let scale = 0

    if (deviceScale < 1.1) {
        scale = a / deviceScale
    }
    else {

        scale = (a / 1.3)
    }

    return scale
}

export default getRightScale
