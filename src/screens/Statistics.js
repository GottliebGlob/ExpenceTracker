import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {Ionicons} from "@expo/vector-icons";
import 'moment/locale/ru'
import moment from 'moment';
import {useTheme} from "@react-navigation/native";
import {defaultColors} from "../colors";


export const Statistics = ({route, navigation}) => {

    const { colors } = useTheme();

    const screenWidth = Dimensions.get("window").width;
    const { data, monthData } = route.params;


    const [dataPieState, setDataPieState] = useState({
        general: 0,
        house: 0,
        transport: 0,
        food: 0,
        people: 0,
        entertainment: 0,
        education: 0,
        health: 0,
        appearance: 0,
        hobby: 0,
        payments: 0,
        gifts: 0
    })

    useEffect(() => {
       dataPieStateHandler()
    }, [])

    const lineLabels = data.slice(-6).map(e => moment(e.date).month()).filter((v, i, a) => a.indexOf(v) === i ).map(e => moment().month(e).format('MMMM'))
    const linePrices = [];

    const summedUpDates = [];

    const isDateSummedUp = (date) => {
        return summedUpDates.indexOf(date.substring(0, 7)) !== -1;
    }

    const sumUpDate = (date) => {
        let sum = 0;
        data.slice(-6).forEach(t => {
            if(t.date.substring(0, 7) === date.substring(0, 7)) {
                sum += parseInt(t.cost);
            }
        });
        summedUpDates.push(date.substring(0, 7));
        linePrices.push(sum);
    }

    data.slice(-6).forEach(t => {
        if(!isDateSummedUp(t.date)) {
            sumUpDate(t.date);
        }
    });


    const dataLine = {
        labels: lineLabels,
        datasets: [
            {
                data: linePrices,
                strokeWidth: 2,
            }
        ], // optional
    };


    const  chartConfig= {
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: () => colors.text,
    }

    const dataPieStateHandler = () => {
        monthData.map(e => {
            switch (e.cat) {
                    case "general": {
                        let general = dataPieState.general += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            general: general
                        }))
                        break;}
                    case "house":{
                         let house = dataPieState.house += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            house: house
                        }))
                        break;}
                    case "transport": { let transport = dataPieState.transport += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            transport: transport
                        }))
                        break;}
                    case "food": {
                        let food = dataPieState.food += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            food: food
                        }))
                        break;}
                    case "people": {  let people = dataPieState.people += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            people: people
                        }))
                        break;}
                    case "entertainment": {  let entertainment = dataPieState.entertainment += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            entertainment: entertainment
                        }))
                        break;}
                    case "education": {  let education = dataPieState.education += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            education: education
                        }))
                        break;}
                    case "health": {  let health = dataPieState.health += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            health: health
                        }))
                        break;}
                    case "appearance": {  let appearance = dataPieState.appearance += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            appearance: appearance
                        }))
                        break;}
                    case "hobby": {  let hobby = dataPieState.hobby += e.cost
                        setDataPieState(prev => ({
                            ...prev,
                            hobby: hobby
                        }))
                        break;}
                case "payments": {  let payments = dataPieState.payments += e.cost
                    setDataPieState(prev => ({
                        ...prev,
                        payments: payments
                    }))
                    break;}
                case "gifts": {  let gifts = dataPieState.gifts += e.cost
                    setDataPieState(prev => ({
                        ...prev,
                        gifts: gifts
                    }))
                    break;}
                    default: return undefined;
            }
        })
    }


    const dataPie = [
        {
            name: defaultColors.cats.general.name,
            population: dataPieState.general,
            color: defaultColors.cats.general.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.house.name,
            population: dataPieState.house,
            color: defaultColors.cats.house.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.transport.name,
            population: dataPieState.transport,
            color: defaultColors.cats.transport.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },

        {
            name: defaultColors.cats.food.name,
            population: dataPieState.food,
            color: defaultColors.cats.food.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.people.name,
            population: dataPieState.people,
            color: defaultColors.cats.people.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.entertainment.name,
            population: dataPieState.entertainment,
            color: defaultColors.cats.entertainment.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.education.name,
            population: dataPieState.education,
            color: defaultColors.cats.education.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.health.name,
            population: dataPieState.health,
            color: defaultColors.cats.health.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.appearance.name,
            population: dataPieState.appearance,
            color: defaultColors.cats.appearance.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.hobby.name,
            population: dataPieState.hobby,
            color: defaultColors.cats.hobby.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.payments.name,
            population: dataPieState.payments,
            color: defaultColors.cats.payments.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
        {
            name: defaultColors.cats.gifts.name,
            population: dataPieState.gifts,
            color: defaultColors.cats.gifts.color,
            legendFontColor: colors.text,
            legendFontSize: 14
        },
    ];


    if(data.length === 0) {
        return (
            <View style={styles.main}>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.navigate('Main')}>
                            <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.headertext}}/>
                        </TouchableOpacity>
                        <View style={styles.mainTextContainer}>
                            <Text style={{...styles.text, fontSize: 16, color: colors.headertext}}>СТАТИСТИКА</Text>
                        </View>
                    </View>
                <View style={styles.screen}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10, color: colors.text}}/>
                <Text style={{...styles.h1text, color: colors.text}}>
                    Увы, пока нечего вам показать!
                </Text>
                    <View style={{height: '5%'}}>
                    </View>
                <Text style={{...styles.h2text,  color: colors.text}}>
                    попробуйте добавить хотя бы одну трату
                </Text>

                </View>
            </View>
        )
    }

    return(
        <View style={styles.main}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.navigate('Main')}>
            <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.headertext}}/>
                </TouchableOpacity>
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: 16, color: colors.headertext}}>СТАТИСТИКА</Text>
            </View>
            </View>
            <View style={{marginTop: 20}}>
                <Text style={{...styles.headersText, color: colors.text}}>
                    ТРАТЫ ЗА ПОСЛЕДНИЕ МЕСЯЦЫ
                </Text>
            </View>
            <LineChart
                fromZero={true}
                data={dataLine}
                width={screenWidth - screenWidth * 0.05}
                height={220}
                chartConfig={chartConfig}
                yAxisSuffix={' р.'}
                style={{
                    marginVertical: 25,

                }}

            />
            <View style={{marginTop: 20}}>
                <Text style={{...styles.headersText, color: colors.text}}>
                    ТРАТЫ ЗА ПОСЛЕДНИЙ МЕСЯЦ
                </Text>
            </View>
            { !Object.values(dataPieState).find(e => e > 0) ?
                <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1, marginTop: '10%'}}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10, color: colors.text}}/>
                    <Text style={{...styles.headersText, color: colors.text}}>
                        Увы, в этом месяце пока не было трат!
                    </Text>
                    <View style={{height: '5%'}}>
                    </View>
                </View>
                :
                <PieChart
                data={dataPie}
                width={screenWidth - screenWidth * 0.05}
                height={250}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                center={[10, 10]}
                absolute
            />}

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '60%'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    },
    headersText: {
        fontWeight: 'bold',
        fontSize: 15
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
    h1text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2text: {
        fontSize: 14,

    }
})










