import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Alert, StatusBar, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from "react-redux";

import Header from "../components/Header";
import AccountInfo from "../components/AccountInfo";
import AddButton from "../components/AddButton";
import StatisticButton from "../components/StatisticButton";
import Item from "../components/Item";
import InputModal from "../modals/InputModal"

import {colors} from "../colors";

import moment from 'moment';
import {addMain, removeMain, fetchMain} from "../store/actions/mainAction";


export const MainScreen = ({navigation}) => {
    const [isLoading, setIsLoading]= useState(false)
    const dispatch = useDispatch()
    const allSpends = useSelector(state => state.main.main)

    useEffect(() => {
       const loadSpends = async () => {
           setIsLoading(true)
           await dispatch(fetchMain())
           setIsLoading(false)
       }
       loadSpends()
    }, [])

    const [modalVisible, setModalVisible] = useState(false)



    const mainStateHandler = (enteredText, enteredCost, cat) => {
        const NewItem = {
             value: enteredText, cost: enteredCost, cat: cat, date: moment(),
        }
        dispatch(addMain(NewItem))
        setModalVisible(false)
    };

    const removeHandler = (id) => {
        Alert.alert("Вы точно хотите удалить трату?", '', [
                {
                    text: "ОТМЕНИТЬ",
                    style: "cancel"
                },
                { text: "ПРИНЯТЬ", onPress: () => {dispatch(removeMain(id))}
                     }
        ],
            { cancelable: false });


    }

    const showModalHandler = () => {
        setModalVisible(true)
    }

    const hideModalHandler = () => {
        setModalVisible(false)
    }

    if (isLoading) {
        return <View style={styles.load}>
            <View>
            <ActivityIndicator size='large' color={colors.dark}/>
        </View>
        </View>
    }

    return(
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor='black' />
    <Header firstText="НАЛИЧНЫЕ" secondText="КАРТЫ" active='cash' nav={navigation.navigate}/>
    <AccountInfo navigation={navigation}/>
            <View style={styles.wrapper}>
                <View style={{paddingHorizontal: '10%'}}>
                    <View style={styles.mainContent}>
                        <Text style={{...styles.text, fontSize: 22}}> Потрачно за месяц: </Text>
                        <Text style={{...styles.text, fontSize: 22, color: colors.confirm}}>{allSpends.map(e => Number(e.cost)).reduce((t, a) => t + a, 0)} р.</Text>
                    </View>
    <Text style={styles.text}>Траты:</Text>
            <AddButton show={showModalHandler}/>
                </View>
            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler}/>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={allSpends}
                    renderItem={itemData => (
                      <Item text={itemData.item.value} cat={itemData.item.cat} date={itemData.item.date} cost={itemData.item.cost} id={itemData.item.id} removeHandler={removeHandler}/>
                    )}
                />

    </View>
            <View style={styles.statistics}>
                <StatisticButton navigation={navigation}/>
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        flex: .9
    },
    text: {
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 10,
    },
    statistics: {
        width: '100%', position:'absolute', bottom: 0, flex: .1
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
