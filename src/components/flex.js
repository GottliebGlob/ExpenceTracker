import React from 'react';
import {PixelRatio} from "react-native";


const getRightScale = (a, b) => {
    const scale = (a / PixelRatio.get() + (PixelRatio.get() * b)) / 2

    return scale
}

export default getRightScale
