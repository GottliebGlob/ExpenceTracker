import React, {useState, useEffect, } from 'react'
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

import {heightPercentageToDP} from "../flex";
import checkIfFirstLaunch from '../components/firstLaunchHandler'
import {FirstLaunchModal} from "../modals/FirstLaunchModal";

export const MainScreen = ({route, navigation}) => {

    const { colors } = useTheme();
    const [isLoading, setIsLoading]= useState(true)
    const dispatch = useDispatch()

    //Data getters
    const allSpends = useSelector(state => state.main.main)
    const sortedAllSpends  = allSpends.sort((a,b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD'))
    const lastMonthSpends = sortedAllSpends.filter(e => moment(e.date).month() === moment().month())
    const maxNumber = Math.max(...allSpends.map(e => e.cost)).toString().length
    const montMaxNumber = Math.max(...lastMonthSpends.map(e => e.cost)).toString().length


    //Local state for firestore requests
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [aim, setAim] = useState(0)
    const user = firebase.auth().currentUser;
    const userId = user.uid


    useEffect(
        () => {
            if (route.params) {
                const { newAim, newValue } = route.params;
                if (newValue !== 0 && newAim !== 0) {
                    setValue(newValue)
                    setAim(newAim)
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
        const isFirstLaunch = await checkIfFirstLaunch();
        setIsFirst(isFirstLaunch)
    }

    const loadSpends = async () => {
        if(allSpends.length === 0) {
            await dispatch(fetchMain())
        }
    }

    //Fetching user data
    useEffect(() => {

        //Check for the first visit
        isItFirst()

        //Spends fetching
        loadSpends()

        //Preferences fetching
            firebase.firestore().collection('users').doc(userId).get().then((documentSnapshot) => {
               setIsLoading(false)
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data()
                    setName(data.name)
                    setValue(data.value)
                    setAim(data.aim)
                }
                else (alert('Произошла неизвестная ошибка! Попробуйте перезагрузить приложение'))
            });
        }, [user]);





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
            <FirstLaunchModal visible={isFirst} setVisible={setIsFirst} aim={aim}  data={sortedAllSpends}/>
    <Header navigation={navigation} name={name}/>
    <AimInfo navigation={navigation} aim={aim} userId={userId} value={value} lastMonthSpends={lastMonthSpends}/>
            <View style={{...styles.wrapper, backgroundColor: colors.background}}>
                <View style={{paddingHorizontal: '5%'}}>
                    <View style={styles.mainContent}>
                        <Text style={{...styles.text, fontSize: Dimensions.get('window').height > 650 ? heightPercentageToDP('3%') : heightPercentageToDP('2.7%'), color: colors.text}}> Потрачно зa</Text>
                       <TouchableOpacity style={{...styles.flatInfo,  borderBottomColor: colors.accent}} onPress={() => setFlatInfo(!flatInfo)}>
                           <Text style={{...styles.flatInfoText, fontSize: Dimensions.get('window').height > 650 ? heightPercentageToDP('3%') : heightPercentageToDP('2.7%'), color: colors.text}}>{` ${flatInfo ? 'месяц: ' : 'все время: ' }`}</Text>
                       </TouchableOpacity>
                        <Text style={{...styles.text, fontSize: Dimensions.get('window').height > 650 ? heightPercentageToDP('3%') : heightPercentageToDP('2.7%'), color: colors.confirm}}>
                            {((!flatInfo) ? sortedAllSpends : lastMonthSpends).map(e => Number(e.cost)).reduce((t, a) => t + a, 0)}
                            {value === 'RU' ? ' р. ' : ' грн. '}
                        </Text>
                    </View>
    <Text style={{...styles.text, color: colors.text, fontSize: Dimensions.get('window').height > 650  ? heightPercentageToDP('2.7%') : heightPercentageToDP('2.4%'),  paddingBottom: 10, paddingTop: 0}}>Траты:</Text>
            <AddButton show={showModalHandler}/>
                </View>
            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler}/>
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
            <View style={styles.statistics}>
                <StatisticButton userId={userId} navigation={navigation} data={sortedAllSpends} monthData={lastMonthSpends} value={value} aim={aim}/>
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        flex: .92
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
        width: '100%', position:'absolute', bottom: 0, flex: .1
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatInfo: {
        borderBottomWidth: 1,
        height: 45
    },
    flatInfoText: {
        paddingTop: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    }
})
