import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Alert, StatusBar, ActivityIndicator, TouchableOpacity} from 'react-native'
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
import { firebase } from '../firebase/config'



export const MainScreen = ({navigation}) => {
    const [isLoading, setIsLoading]= useState(false)
    const dispatch = useDispatch()
    const allSpends = useSelector(state => state.main.main)
    const sortedAllSpends  = allSpends.sort((a,b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD'))
    const lastMonthSpends = sortedAllSpends.filter(e => moment(e.date).month() === moment().month())


    const user = firebase.auth().currentUser;
    let email;

    if (user != null) {
        email = user.email;
    }


    useEffect(() => {
        const loadSpends = async () => {
            if(allSpends.length === 0) {
                setIsLoading(true)
                await dispatch(fetchMain()).then(setIsLoading(false))
            }
        }
        loadSpends()
    }, [])


    const [modalVisible, setModalVisible] = useState(false)
    const [flatInfo, setFlatInfo] = useState(true)


    const mainStateHandler = (enteredText, enteredCost, cat) => {
        const NewItem = {
             value: enteredText, cost: enteredCost, cat: cat, date: moment().toISOString(),
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
    <AccountInfo navigation={navigation} email={email} />
            <View style={styles.wrapper}>
                <View style={{paddingHorizontal: '10%'}}>
                    <View style={styles.mainContent}>
                        <Text style={{...styles.text, fontSize: 22}}> Потрачно зa</Text>
                       <TouchableOpacity style={styles.flatInfo} onPress={() => setFlatInfo(!flatInfo)}>
                           <Text style={styles.flatInfoText}>{` ${flatInfo ? 'месяц: ' : 'все время: ' }`}</Text>
                       </TouchableOpacity>
                        <Text style={{...styles.text, fontSize: 22, color: colors.confirm}}>{((!flatInfo) ? sortedAllSpends : lastMonthSpends).map(e => Number(e.cost)).reduce((t, a) => t + a, 0)} р.</Text>
                    </View>
    <Text style={styles.text}>Траты:</Text>
            <AddButton show={showModalHandler}/>
                </View>
            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler}/>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={(!flatInfo) ? sortedAllSpends : lastMonthSpends}
                    renderItem={itemData => (
                      <Item text={itemData.item.value} cat={itemData.item.cat} date={itemData.item.date} cost={itemData.item.cost} id={itemData.item.id} removeHandler={removeHandler}/>
                    )}
                />

    </View>
            <View style={styles.statistics}>
                <StatisticButton navigation={navigation} data={sortedAllSpends} monthData={lastMonthSpends}/>
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
    },
    flatInfo: {
        borderBottomColor: colors.dark,
        borderBottomWidth: 1,
        height: 45
    },
    flatInfoText: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 22
    }
})
