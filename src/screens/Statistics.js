import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {colors} from "../colors";
import {Ionicons} from "@expo/vector-icons";
import 'moment/locale/ru'
import moment from 'moment';


export const Statistics = ({route, navigation}) => {
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
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(60, 60, 60, ${opacity})`,
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
                        console.log('food here')
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
            name: colors.cats.general.name,
            population: dataPieState.general,
            color: colors.cats.general.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.house.name,
            population: dataPieState.house,
            color: colors.cats.house.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.transport.name,
            population: dataPieState.transport,
            color: colors.cats.transport.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },

        {
            name: colors.cats.food.name,
            population: dataPieState.food,
            color: colors.cats.food.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.people.name,
            population: dataPieState.people,
            color: colors.cats.people.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.entertainment.name,
            population: dataPieState.entertainment,
            color: colors.cats.entertainment.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.education.name,
            population: dataPieState.education,
            color: colors.cats.education.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.health.name,
            population: dataPieState.health,
            color: colors.cats.health.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.appearance.name,
            population: dataPieState.appearance,
            color: colors.cats.appearance.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.hobby.name,
            population: dataPieState.hobby,
            color: colors.cats.hobby.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.payments.name,
            population: dataPieState.payments,
            color: colors.cats.payments.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: colors.cats.gifts.name,
            population: dataPieState.gifts,
            color: colors.cats.gifts.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
    ];


    if(data.length === 0) {
        return (
            <View style={styles.main}>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.navigate('Main')}>
                            <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: '#fff'}}/>
                        </TouchableOpacity>
                        <View style={styles.mainTextContainer}>
                            <Text style={{...styles.text, fontSize: 16}}>СТАТИСТИКА</Text>
                        </View>
                    </View>
                <View style={styles.screen}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10}}/>
                <Text style={styles.h1text}>
                    Увы, пока нечего вам показать!
                </Text>
                    <View style={{height: '5%'}}>
                    </View>
                <Text style={styles.h2text}>
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
            <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: '#fff'}}/>
                </TouchableOpacity>
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: 16}}>СТАТИСТИКА</Text>
            </View>
            </View>
            <View style={{marginTop: 20}}>
                <Text style={styles.headersText}>
                    ТРАТЫ ЗА ПОСЛЕДНИЕ МЕСЯЦЫ
                </Text>
            </View>
            <LineChart
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
                <Text style={styles.headersText}>
                    ТРАТЫ ЗА ПОСЛЕДНИЙ МЕСЯЦ
                </Text>
            </View>
            { !Object.values(dataPieState).find(e => e > 0) ?
                <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1, marginTop: '10%'}}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10, color: colors.dark}}/>
                    <Text style={{...styles.headersText, color: colors.dark}}>
                        Увы, в этом месяце пока не было трат!
                    </Text>
                    <View style={{height: '5%'}}>
                    </View>
                </View>
                :
                <PieChart
                data={dataPie}
                width={screenWidth - screenWidth * 0.05}
                height={220}
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
        color: colors.dark
    }
})










