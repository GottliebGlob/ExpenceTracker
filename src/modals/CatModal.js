import React from 'react';

import {
    View,
    StyleSheet,
    Modal,
    Text,
    StatusBar,
    FlatList,
} from 'react-native';


import CatItem from "../components/CatItem";
import {defaultColors} from "../colors";
import {useTheme} from "@react-navigation/native";

const CatModal = props => {
    const { colors } = useTheme();

    const cats = defaultColors.cats

    const transformedCats = []

    for (let key in cats) {
        transformedCats.push({cat: key, name: cats[key].name, color: cats[key].color, })
    }


    return (
        <Modal visible={props.catModalVisible} animationType="slide">
<View style={{...styles.main, backgroundColor: colors.background}}>
    <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
    <Text style={{...styles.text, color: colors.text}}>
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
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        paddingBottom: 20
    },

})

export default CatModal
