import React, {useState, useEffect, useMemo} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions
} from 'react-native'
//Redux
import {useDispatch, useSelector} from "react-redux";
import {addMain, removeMain, fetchMain} from "../store/actions/mainAction";
import { firebase } from '../firebase/config'
//Components
import Header from "../components/Header";
import AimInfo from "../components/AimInfo";
import AddButton from "../components/AddButton";
import StatisticButton from "../components/StatisticButton";
import Item from "../components/Item";
import InputModal from "../modals/InputModal"

import { useTheme} from '@react-navigation/native';
import moment from 'moment';

import {getRightFontScale} from "../components/flex";
import checkIfFirstLaunch from '../components/firstLaunchHandler'
import {FirstLaunchModal} from "../modals/FirstLaunchModal";
import {asyncStoreCheck} from "../asyncStoreCheck";
import {useNetInfo} from "@react-native-community/netinfo";
import {isLimitDisplayed, setIsLimitDisplayed} from "../components/isLimitDisplayed";

import {MainContext} from "../components/mainContext";
import {Ionicons} from "@expo/vector-icons";


export const MainScreen = ({route, navigation}) => {

    const { colors } = useTheme();
    const [isLoading, setIsLoading]= useState(true)
    const dispatch = useDispatch()




    //Local state for firestore requests
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [aim, setAim] = useState(0)
    const [isFirstDay, setIsFirstDay] = useState(0)
    const user = firebase.auth().currentUser;
    const userId = user.uid

    const isOver = () => {
        const bool = moment() < moment().set('date', isFirstDay)
        return bool ? moment().set('date', isFirstDay).subtract(1, 'months') : moment().set('date', isFirstDay)
    }

    //Data getters
    const allSpends = useSelector(state => state.main.main)
    const sortedAllSpends  = useMemo(() => allSpends.sort((a,b) => moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD')), [allSpends])
    const lastMonthSpends = useMemo(() => sortedAllSpends.filter(e => moment(e.date) >= isOver()), [allSpends, isFirstDay])
    const maxNumber = useMemo(() => Math.max(...allSpends.map(e => e.cost)).toString().length, [allSpends])
    const montMaxNumber = useMemo(() => Math.max(...lastMonthSpends.map(e => e.cost)).toString().length, [allSpends, isFirstDay])




    //Navigation params from Settings
    useEffect(
        () => {
            if (route.params) {
                const { newAim, newValue, newMonthDay } = route.params;
                if (newValue === "RU" || newValue === 'UA') {
                    setValue(newValue)
                }
                if (newAim !== 0) {
                    setAim(newAim)
                }
                if (newAim !== 0 && newAim !== aim) {
                    setShouldDisplayAim(true)
                }
                if (newMonthDay > 0) {
                    setIsFirstDay(newMonthDay)
                }
            }
        },
        [route.params],
    );


    //Modals state
    const [isFirst, setIsFirst] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [flatInfo, setFlatInfo] = useState(true)

    const isItFirst = async () => {
        const isFirstLaunch = await checkIfFirstLaunch('main');
        setIsFirst(isFirstLaunch)
    }

    const loadSpends = async () => {
        await asyncStoreCheck(dispatch)
        if(allSpends.length === 0) {
            await dispatch(fetchMain())
        }
    }

    //Limit displaying
    const [shouldDisplayAim, setShouldDisplayAim] = useState(false)
    const [isLimitsLoaded, setIsLimitsLoaded] = useState(false)

    const limitCheck = (isDisplayed) => {
        if (isDisplayed === null || isDisplayed === 'true') {
            setShouldDisplayAim(true)
        }
        setIsLimitsLoaded(true)
    }

    const handleLimit = () => {
        setIsLimitDisplayed(false)
        setShouldDisplayAim(false)
        firebase.firestore().collection('users').doc(userId).update({aim: 0})
        setAim(0)
    }


    //Fetching user data
    useEffect(() => {

        //Check for the first visit
        isItFirst()

        //Spends fetching
        loadSpends()

        //Limits displaying check
        isLimitDisplayed(limitCheck)

        //Preferences fetching
            firebase.firestore().collection('users').doc(userId).get().then((documentSnapshot) => {
               setIsLoading(false)
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data()
                    setName(data.name)
                    setValue(data.value)
                    setAim(data.aim)
                    setIsFirstDay(data.monthStartsFrom)
                }
            });
        }, [user]);




        //Connection check
    const isOnline = useNetInfo().isConnected
    const [isConnectionChecked, setIsConnectionChecked] = useState(false)

    useEffect(() => {
        setIsConnectionChecked(true)
        if (isConnectionChecked) {
            if (!isOnline) {
                navigation.navigate('Offline')
            }
        }
    }, [isOnline])





    //Spends handlers
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

    //Modal handlers
    const showModalHandler = () => {
        setModalVisible(true)
    }
    const hideModalHandler = () => {
        setModalVisible(false)
    }






    if (isLoading && !isLimitsLoaded) {

        return <View style={styles.load}>
            <View>
            <ActivityIndicator size='large' color={colors.dark}/>
        </View>
        </View>
    }

    return(
        <MainContext.Provider
            value={{ aim: aim, data: sortedAllSpends, userId: userId, value: value, lastMonthSpends: lastMonthSpends }}
        >
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <FirstLaunchModal visible={isFirst} setVisible={setIsFirst} aim={aim}  data={sortedAllSpends} text={"Спасибо, что решили принять участие в тестировании! Чтобы добавить трату нажмите на кнопку \"Добавить\", чтобы удалить- нажмите на трату и удерживайте."}/>
    <Header navigation={navigation} name={name}/>
            {
                shouldDisplayAim ?  <AimInfo navigation={navigation} handleLimit={handleLimit}/> : null
            }
            <View style={{...styles.wrapper, backgroundColor: colors.background}}>
                <View style={{paddingHorizontal: '5%'}}>
                        {
                            allSpends.length > 0 ? (
                                    <View style={styles.mainContent}>
                                    <Text style={{...styles.text, fontSize: getRightFontScale(22), color: colors.text}}> Потрачено зa</Text>
                                <TouchableOpacity style={{...styles.flatInfo,  borderBottomColor: colors.confirm}} onPress={() => setFlatInfo(!flatInfo)}>
                                    <Text style={{...styles.flatInfoText, fontSize: getRightFontScale(22), color: colors.text}}>{` ${flatInfo ? 'месяц: ' : 'все время: ' }`}</Text>
                                </TouchableOpacity>
                            <Text style={{...styles.text, fontSize: getRightFontScale(22), color: '#02a602'}}>
                        {((!flatInfo) ? sortedAllSpends : lastMonthSpends).map(e => Number(e.cost)).reduce((t, a) => t + a, 0)}
                        {value === 'RU' ? ' р. ' : ' грн. '}
                            </Text>
                                    </View>
                            ) :
                            (
                                <View style={styles.mainContent}>
                            <Text style={{...styles.text, fontSize: getRightFontScale(22), color: colors.text}}> У вас пока нет трат</Text>
                                </View>
                            )
                        }
            <AddButton show={showModalHandler}/>
                </View>
            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler} isConnected={true}/>
                <FlatList

                    keyExtractor={(item, index) => item.id}
                    data={(!flatInfo) ? sortedAllSpends : lastMonthSpends}
                    renderItem={itemData => (
                      <Item text={itemData.item.value}
                            cat={itemData.item.cat}
                            date={itemData.item.date}
                            cost={itemData.item.cost}
                            id={itemData.item.id}
                            value={value}
                            floatInfo={flatInfo}
                            maxNumber={maxNumber}
                            montMaxNumber={montMaxNumber}
                            removeHandler={removeHandler}/>
                    )}
                />

    </View>
            <View style={{height: Dimensions.get('window').height * 0.07}}>

            </View>
            <View style={styles.statistics}>
                <StatisticButton navigation={navigation} isFirstDay={isFirstDay}/>
            </View>
    </View>
        </MainContext.Provider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        flex: 1
    },
    text: {
        paddingTop: 10,
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 0,
    },
    statistics: {
        width: '100%', position:'absolute', bottom: 0, flex: .1,
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatInfo: {
        borderBottomWidth: 2,
        height: 45,
        flexDirection: 'row'
    },
    flatInfoText: {
        paddingTop: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    }
})
