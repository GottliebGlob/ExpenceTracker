import React, {useMemo} from 'react'
import {View, Text, StyleSheet, ScrollView, PixelRatio} from 'react-native'
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {Ionicons} from "@expo/vector-icons";
import 'moment/locale/ru'
import {useTheme} from "@react-navigation/native";
import AsideHeader from "../components/AsideHeader";
import BottomBanner from "../components/BottomBanner";
import getRightScale, {getRightFontScale} from "../components/flex";
import pieChartState from "../components/pieChart";
import {lineChartState, lineChartLabels} from "../components/lineChart";
import {getRightSignValue} from "../components/getValue";
import {useNetInfo} from "@react-native-community/netinfo";
import i18n from "../locales";


export const Statistics = ({route, navigation}) => {

    const { colors } = useTheme();

    const { data, monthData, value, isFirstDay } = route.params;


    //Line chart stuff


    const linePrices = useMemo(() => lineChartState(data, isFirstDay), [data, isFirstDay])
    const lineLabels = useMemo(() =>  lineChartLabels(data, isFirstDay), [data, linePrices])


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

    //Pie chart stuff
    const monthlySpends = useMemo(() => pieChartState(monthData, colors), monthData)
    const allTimeSpends = useMemo(() => pieChartState(data, colors), monthData)

    if(data.length === 0) {
        return (
            <View style={styles.main}>
                   <AsideHeader navigation={navigation} placeholder={i18n.t("statistics.header")}/>
                <View style={styles.screen}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10, color: colors.text}}/>
                <Text style={{...styles.h1text, color: colors.text, textAlign: 'center'}}>
                    {i18n.t("statistics.noSpends")}
                </Text>
                    <View style={{height: '5%'}}>
                    </View>
                <Text style={{...styles.h2text,  color: colors.text, textAlign: 'center'}}>
                    {i18n.t("statistics.tryToAdd")}
                </Text>

                </View>
            </View>
        )
    }


    return(
        <View style={styles.main}>
            <AsideHeader navigation={navigation} placeholder={i18n.t("statistics.header")}/>
            <ScrollView style={{ paddingHorizontal: '2.5%'}}>
            <View style={{marginTop: 20, marginBottom: 10, alignItems: 'center', paddingBottom: 10, marginRight: '5%'}}>
                <Text style={{...styles.headersText, color: colors.text, fontSize: getRightFontScale(17)}}>
                    {i18n.t("statistics.line")}
                </Text>
            </View>
            <LineChart
                fromZero={true}
                data={dataLine}
                width={Dimensions.get('window').width - Dimensions.get('window').width * 0.1}
                height={getRightScale(300, 100)}
                chartConfig={chartConfig}
                yAxisSuffix={getRightSignValue(value)}
                yLabelsOffset={3}

            />

            <View style={{marginTop: 15, alignItems: 'center', marginRight: '5%'}}>
                <Text style={{...styles.headersText, color: colors.text, fontSize: getRightFontScale(17)}}>
                    {i18n.t("statistics.firstPie")}
                </Text>
            </View>
            { !monthlySpends.length > 0 ?
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginRight: '5%'}}>
                    <Ionicons name='md-alert' size={30} style={{marginRight: 0, paddingVertical: 10, color: colors.text}}/>
                    <Text style={{...styles.headersText, color: colors.text, textAlign: 'center'}}>
                        {i18n.t("statistics.lastMonth")}
                    </Text>
                    <View style={{height: '5%'}}>
                    </View>
                </View>
                :
                <View style={{width: Dimensions.get('window').width, }}>
                <PieChart
                data={monthlySpends}
                width={Dimensions.get('window').width}
                height={getRightScale(300, 100)}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                absolute
                paddingLeft={'-5'}

            />
                </View>
            }

                <View style={{marginTop: 15, alignItems: 'center', marginRight: '5%'}}>
                    <Text style={{...styles.headersText, color: colors.text, fontSize: getRightFontScale(17)}}>
                        {i18n.t("statistics.secPie")}
                    </Text>
                </View>
                { !allTimeSpends.length > 0 ? null
                    :
                    <View style={{width: Dimensions.get('window').width, marginBottom: 100}}>
                        <PieChart
                            data={allTimeSpends}
                            width={Dimensions.get('window').width }
                            height={getRightScale(300, 100)}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            absolute
                            paddingLeft={'-5'}
                        />
                    </View>

                }

            </ScrollView>
            {
                useNetInfo().isConnected ? <BottomBanner /> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
        flexWrap: 'nowrap'

    },
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '60%'
    },
    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
    headersText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },

    h1text: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
    },
    h2text: {
        fontSize: 14,
        fontFamily: 'open-sans',
    }
})










