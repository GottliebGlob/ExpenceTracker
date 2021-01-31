import React, { useState} from 'react';

import {
    View,
    Button,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Text,
    StatusBar,
    FlatList, ActivityIndicator, TouchableOpacity
} from 'react-native';

import {colors} from "../colors";
import CatItem from "../components/CatItem";

const CatModal = props => {
    const cats = colors.cats

    const transformedCats = []

    for (let key in cats) {
        transformedCats.push({cat: key, name: cats[key].name, color: cats[key].color, })
    }


    return (
        <Modal visible={props.catModalVisible} animationType="slide">
<View style={styles.main}>
    <StatusBar barStyle="dark-content" backgroundColor='#fff' />
    <Text style={styles.text}>
        Выберите категорию
    </Text>
    <FlatList
        keyExtractor={(item, index) => "" + index}
        data={transformedCats}
        numColumns={3}
        renderItem={itemData => (
            <CatItem icon={itemData.item.icon} cat={itemData.item.cat} color={itemData.item.color} name={itemData.item.name} catHandler={props.catHandler} />
        )}
    />

</View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20
    },

})

export default CatModal
