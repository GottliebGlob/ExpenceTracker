import React from 'react';
import {PixelRatio, Dimensions} from "react-native";


const getRightScale = (a, b) => {
    return (a / PixelRatio.get() + (PixelRatio.get() * b)) / 2
}



export const getRightFontScale = (a) => {
    const width = Dimensions.get("window").width;

    return (a * width * (1.8 - 0.002 * width) / 400) / PixelRatio.getFontScale()
}

export default getRightScale
