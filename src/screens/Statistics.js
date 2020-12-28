import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {colors} from "../colors";
import {Ionicons} from "@expo/vector-icons";
import 'moment/locale/ru'
import moment from 'moment';


export const Statistics = ({route, navigation}) => {
    const screenWidth = Dimensions.get("window").width;
    const { data } = route.params;


    const lineLabels = data.map(e => moment(e.date).month()).filter((v, i, a) => a.indexOf(v) === i ).map(e => moment().month(e).format('MMMM'))
    const linePrices = [];

    const summedUpDates = [];

    const isDateSummedUp = (date) => {
        return summedUpDates.indexOf(date.substring(0, 7)) !== -1;
    }

    const sumUpDate = (date) => {
        let sum = 0;
        data.forEach(t => {
            if(t.date.substring(0, 7) === date.substring(0, 7)) {
                sum += parseInt(t.cost);
            }
        });
        summedUpDates.push(date.substring(0, 7));
        linePrices.push(sum);
    }

    data.forEach(t => {
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

    const dataPie = [
        {
            name: "Общие",
            population: 1045,
            color: colors.cats.general.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Дом",
            population: 870,
            color: colors.cats.house.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Транстпорт",
            population: 560,
            color: colors.cats.transport.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Еда",
            population: 2100,
            color: colors.cats.food.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Люди",
            population: 870,
            color: colors.cats.people.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Развлечения",
            population: 1200,
            color: colors.cats.entertainment.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Образоввание",
            population: 1356,
            color: colors.cats.education.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Здоровье",
            population: 0,
            color: colors.cats.health.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Внешний вид",
            population: 460,
            color: colors.cats.appearance.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
        {
            name: "Хобби",
            population: 230,
            color: colors.cats.hobby.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 14
        },
    ];




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
            <PieChart
                data={dataPie}
                width={screenWidth - screenWidth * 0.05}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                center={[10, 10]}
                absolute
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
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

})










