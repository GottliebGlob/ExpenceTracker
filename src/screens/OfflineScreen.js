import React, {useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    StatusBar,
     PixelRatio
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
    const spends = useSelector(state => state.main.main)


    const showModalHandler = () => {
        setModalVisible(true)
    }
    const hideModalHandler = () => {
        setModalVisible(false)
    }

    const loadSpends = async () => {
        await dispatch(fetchOffline())
    }



    useEffect(() => {
        isItFirst()
      loadSpends()
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


    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <FirstLaunchModal visible={isFirst} setVisible={setIsFirst} aim={0}  data={[]} text={"Внимание! Приложение переведено в offline режим, но вы все также можете добавлять траты. После подключения к интерену перезагрузите приложение."}/>
            <View style={styles.headerWrapper}>
                <View style={styles.goBackIcon}>
                    <Ionicons name='md-wifi' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.error}}/>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={{...styles.text, fontSize: 22 / PixelRatio.getFontScale(), color: colors.headertext}}>Spender (offline mode)</Text>
                </View>
            </View>
            <View style={{...styles.wrapper, backgroundColor: colors.background}}>
            <Text style={{...styles.text, color: colors.text, fontSize: 20 / PixelRatio.getFontScale(),  paddingBottom: 10, paddingTop: 0}}>Траты:</Text>
            <AddButton show={showModalHandler}/>

            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler} isConnected={false}/>
            </View>
            <FlatList

                keyExtractor={(item, index) => item.id}
                data={spends}
                renderItem={itemData => (
                    <Item text={itemData.item.value}
                          cat={itemData.item.cat}
                          date={itemData.item.date}
                          cost={itemData.item.cost}
                          id={itemData.item.id}
                          value={''}
                          floatInfo={true}
                          maxNumber={maxNumber}
                          montMaxNumber={maxNumber}
                          removeHandler={removeHandler}/>
                )}
            />

        </View>

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
        padding: '5%'
    },
})
