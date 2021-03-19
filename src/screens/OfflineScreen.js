import React, {useState, useEffect } from 'react'
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
import {Ionicons} from "@expo/vector-icons";
import {heightPercentageToDP} from "../flex";
import {useTheme} from "@react-navigation/native";
import AddButton from "../components/AddButton";
import InputModal from "../modals/InputModal";
import moment from "moment";
import Item from "../components/Item";
import {useDispatch, useSelector} from "react-redux";
import {addOffline, fetchOffline, removeOffline} from "../store/actions/offlineAction";
import AsyncStorage from '@react-native-community/async-storage';


export const OfflineScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()


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
      loadSpends()
    },[])



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
            <View style={styles.headerWrapper}>
                <View style={styles.goBackIcon}>
                    <Ionicons name='md-wifi' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.error}}/>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={{...styles.text, fontSize: Dimensions.get('window').height > 650 ? heightPercentageToDP('2.3%') : heightPercentageToDP('2%'), color: colors.headertext}}>Spender (offline mode)</Text>
                </View>
            </View>
            <View style={{...styles.wrapper, backgroundColor: colors.background}}>
            <Text style={{...styles.text, color: colors.text, fontSize: Dimensions.get('window').height > 650  ? heightPercentageToDP('2.7%') : heightPercentageToDP('2.4%'),  paddingBottom: 10, paddingTop: 0}}>Траты:</Text>
            <AddButton show={showModalHandler}/>

            <InputModal visible={modalVisible} onMainStateChange={mainStateHandler} onCancel={hideModalHandler}/>
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
                          maxNumber={0}
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
