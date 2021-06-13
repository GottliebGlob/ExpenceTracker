import React, {useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    StatusBar,
    PixelRatio, TouchableOpacity, Dimensions
} from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import AddButton from "../components/AddButton";
import InputModal from "../modals/InputModal";
import moment from "moment";
import Item from "../components/Item";
import {useDispatch, useSelector} from "react-redux";
import {addOffline, fetchOffline, removeOffline} from "../store/actions/offlineAction";
import checkIfFirstLaunch from "../components/firstLaunchHandler";
import {FirstLaunchModal} from "../modals/FirstLaunchModal";
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import {MainContext} from "../components/mainContext";
import AimInfo from "../components/AimInfo";
import getRightScale, {getRightFontScale} from "../components/flex";
import {clearState} from "../store/actions/mainAction";
import {getRightTextValue} from "../components/getValue";
import {SpendsSwitch} from "../components/SpendsSwitch";


export const OfflineScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()


    const [isFirst, setIsFirst] = useState(false)
    const isItFirst = async () => {
        const isFirstLaunch = await checkIfFirstLaunch('offline');
        console.log(isFirstLaunch)
        setIsFirst(isFirstLaunch)
    }

    //Data getters
    const [value, setValue] = useState('')
    const [limit, setLimit] = useState(0)
    const [monthStartsFrom, setMonthStartsFrom] = useState(0)
    const [flatInfo, setFlatInfo] = useState(true)

    const isOver = () => {
        const bool = moment() <= moment().set('date', monthStartsFrom)
        return bool ? moment().set('date', monthStartsFrom).subtract(1, 'months') : moment().set('date', monthStartsFrom)
    }

    const spends = useSelector(state => state.main.main).sort((a,b) => moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD'))
    const lastMonthSpends = spends.filter(e => moment(e.date) >= isOver())


    const showModalHandler = () => {
        setModalVisible(true)
    }
    const hideModalHandler = () => {
        setModalVisible(false)
    }

    const loadSpends = async () => {
        dispatch(clearState())
        await dispatch(fetchOffline())
    }

    const loadUserPrefs = async () => {
        const val = await AsyncStorage.getItem('Value')
        if (val !== null) {
            setValue(val)
        }

        const lim = await AsyncStorage.getItem('Limit')
        if (lim !== null) {
            setLimit(lim)
        }

        const start = await AsyncStorage.getItem('MonthStartsFrom')
        if (start !== null) {
            setMonthStartsFrom(parseInt(start))
        }
    }



    useEffect(() => {
        isItFirst()
        loadSpends()
        loadUserPrefs()
    },[])


    const isOnline = useNetInfo().isConnected
    const [isConnectionChecked, setIsConnectionChecked] = useState(false)

    useEffect(() => {
        setIsConnectionChecked(true)
        if (isConnectionChecked) {
            if (isOnline) {
                navigation.navigate('Main')
            }
        }
    }, [isOnline])


    const mainStateHandler = (enteredText, enteredCost, cat) => {
        const NewItem = {
            value: enteredText, cost: enteredCost, cat: cat, date: moment().toISOString(), id: moment().toISOString(),
        }
        dispatch(addOffline(NewItem))
        setModalVisible(false)
    };

    const monthMaxNumber = Math.max(...lastMonthSpends.map(e => e.cost)).toString().length
    const maxNumber = Math.max(...spends.map(e => e.cost)).toString().length


    const removeHandler = (id) => {
        Alert.alert("Вы точно хотите удалить трату?", '', [
                {
                    text: "ОТМЕНИТЬ",
                    style: "cancel"
                },
                { text: "ПРИНЯТЬ", onPress: () => {dispatch(removeOffline(id))}
                }
            ],
            { cancelable: false });


    }

    let val = getRightTextValue(value)

    return (
        <MainContext.Provider
            value={{ aim: limit, data: spends, value: value, lastMonthSpends: lastMonthSpends }}
        >
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <FirstLaunchModal visible={isFirst} setVisible={setIsFirst} aim={0}  data={[]} text={"Внимание! Приложение переведено в offline режим, но вы все также можете добавлять траты, а также просматривать статистику."}/>
            <View style={styles.headerWrapper}>
                <View style={styles.goBackIcon}>
                    <Ionicons name='md-wifi' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.error}}/>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={{...styles.text, fontSize: 22 / PixelRatio.getFontScale(), color: colors.headertext}}>Spender (offline mode)</Text>
                </View>
            </View>
            {
                limit > 0 ?  <AimInfo navigation={navigation} handleLimit={() => {}} whereIsCalled='offline' /> : null
            }
            <View style={{...styles.wrapper, backgroundColor: colors.background}}>
                <SpendsSwitch allSpends={spends} lastMonthSpends={lastMonthSpends} flatInfo={flatInfo} setFlatInfo={setFlatInfo} value={val}/>
            <AddButton show={showModalHandler}/>

            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler} isConnected={false}/>
            </View>
            <FlatList

                keyExtractor={(item, index) => item.id}
                data={(!flatInfo) ? spends : lastMonthSpends}
                renderItem={itemData => (
                    <Item text={itemData.item.value}
                          cat={itemData.item.cat}
                          date={itemData.item.date}
                          cost={itemData.item.cost}
                          id={itemData.item.id}
                          value={value}
                          floatInfo={true}
                          maxNumber={maxNumber}
                          montMaxNumber={monthMaxNumber}
                          removeHandler={removeHandler}/>
                )}
            />
            <View style={{height: Dimensions.get('window').height * 0.07}}>

            </View>

            <View style={styles.statistics}>
                <View style={{...styles.button, height: getRightScale(80, 30)}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Statistics', {data: spends, monthData: lastMonthSpends, value: value, isFirstDay: monthStartsFrom ? monthStartsFrom : 1})} style={styles.container1}>
                        <Text style={{...styles.btnText, color: colors.headertext, fontSize: getRightFontScale(18)}}>СТАТИСТИКА</Text>
                        <Ionicons name='stats-chart' size={25 / PixelRatio.getFontScale()} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </MainContext.Provider>
    )
}


const styles = StyleSheet.create({

    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
    mainTextContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 15,
        paddingRight: '10%'
    },
    headerWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    goBackIcon: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingLeft: 10
    },
    wrapper: {
        alignItems: 'flex-start',

    },
    statistics: {
        width: '100%', position:'absolute', bottom: 0, flex: .1,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
    },
    btnText: {
        paddingVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    container1: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 0,
    },

})
