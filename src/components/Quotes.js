import React, {useState, useEffect} from 'react'
import * as Localization from 'expo-localization'
import {PixelRatio, StyleSheet, Text, View} from 'react-native';



const Quote = (theme) => {
    const [selectedQuote, setSelectedQuote] = useState({name: "name"})

    let mainArray

    if (Localization.locale === ('ru-RU' || 'uk' || 'be')) {
             mainArray = [
            {name: "Считаем ваши деньги..."},
            {name: "Рисуем статистику..."},
            {name: "Загружаем траты..."},
            {name: "Получаем данные..."},
            {name: "Вычисляем значения..."},
            {name: "Что-то там делаем..."},
            {name: "Загружаем настройки..."},
            {name: "Красим фон..."},
            {name: "Расшифровываем данные..."},
            {name: "Соединяемся с сервером..."},
            {name: "Готовимся к вашему прибытию..."},
            {name: "Настраивам все необходимое..."},
            {name: "Проверяем данные..."},
            {name: "Синхронизируемся..."},
        ]
    }
    else {
         mainArray = [
            {name: "Counting your money..."},
            {name: "Drawing statistics..."},
            {name: "Loading spendings..."},
            {name: "Getting data..."},
            {name: "Calculating the values..."},
            {name: "Loading the settings..."},
            {name: "Doing something..."},
            {name: "Painting the background..."},
            {name: "Decrypting the data..."},
            {name: "Connecting to the server..."},
            {name: "Preparing for your arrival..."},
            {name: "Configuring everything you need..."},
            {name: "Checking the data..."},
            {name: "Synchronizing..."},
        ]
    }


    const getRandomQuote = () => {
        return Math.floor(Math.random() * (15 - 1) - 1)
    }

    useEffect(() => {
        let number = getRandomQuote()
       setSelectedQuote(mainArray[number])
    }, [])




    const textColor = theme.theme === 'dark' ? '#dadada' : '#000'


    return (
        <View style={{paddingVertical: 20}}>
<Text style={{...styles.text, color: textColor, fontSize: 20 / PixelRatio.getFontScale()}}>
    {selectedQuote ? selectedQuote.name : "Loading..."}
</Text>
        </View>
    )
}

const styles = StyleSheet.create({

   text: {
        fontSize: 20,
      fontWeight: 'bold',
       textAlign: 'center'
    }
})


export default Quote
