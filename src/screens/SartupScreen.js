import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,

} from 'react-native';
import {useTheme} from "@react-navigation/native";


export const StartupScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={colors.dark} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

