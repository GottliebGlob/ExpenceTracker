import React, {useState, useEffect} from 'react'
import {PixelRatio, StyleSheet, Text, View} from 'react-native';


const Quote = (theme) => {
    const [selectedQuote, setSelectedQuote] = useState({name: "name"})

    const mainArray = [
        {name: "Считам ваши деньги..."},
        {name: 'Рисуем статистику...'},
        {name: 'Загружаем траты...'},
        {name: 'Получаем данные...'},
        {name: 'Вычисляем значения...'},
        {name: 'Что-то там делаем...'},
        {name: 'Загружаем настройки...'},
        {name: 'Красим фон...'},
        {name: 'Проверяем данные...'},
        {name: 'Расшифровываем данные...'},
        {name: 'Соединяемся с сервером...'},
        {name: 'Синхронизируемся...'},
        {name: 'Готовимся к вашему прибытию...'},
        {name: "Настраивам все необходимое..."},
        ]

    const getRandomQuote = () => {
        return Math.floor(Math.random() * (15 - 1) - 1)
    }

    useEffect(() => {
        let number = getRandomQuote()
       setSelectedQuote(mainArray[number])
    }, [])




    const textColor = theme.theme === 'dark' ? '#dadada' : '#000'


    return (
        <View style={{paddingVertical: 50}}>
<Text style={{...styles.text, color: textColor, fontSize: 20 / PixelRatio.getFontScale()}}>
    {selectedQuote ? selectedQuote.name : 'Загружаемся...'}
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
