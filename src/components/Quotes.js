import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from "../flex";

const Quote = (theme) => {
    const [selectedQuote, setSelectedQuote] = useState({name: "name", quote: 'quote'})

    const mainArray = [
        {name: 'Томас Джефферсон', quote: 'Никогда не тратьте еще не заработанные деньги'},
        {name: 'Марлен Дитрих', quote: 'Существует огромная разница между тем, кто заработал много денег и тем, кто богат'},
        {name: 'Джим Рон', quote: 'Нельзя гоняться за деньгами — нужно идти им на встречу'},
        {name: 'Джо Мур', quote: 'Сложно выучить простой факт: откладывать деньги следует тогда, когда они есть'},
        {name: 'Джеймс Фрик', quote: 'Не говорите мне, каковы ваши жизненные приоритеты. Покажите, на что вы тратите деньги, и я сам расскажу вам о них'},
        {name: 'Бенджамин Франклин', quote: 'Если хотите стать богатым, думайте о сбережениях как о заработке'},
        {name: 'Фрэнк Кларк', quote: 'Многие люди думают, что не умеют зарабатывать, хотя на самом деле они не умеют тратить'},
        {name: 'Айн Рэнд', quote: 'Деньги — лишь средство. Они приведут вас, куда захотите, но направление пути вы должны выбирать сами'},
        {name: 'Финеас Тейлор Барнум', quote: 'Деньги — хороший слуга, но плохой господин'},
        {name: 'Дейв Рэмси', quote: 'Контролируйте свои финансы, или их нехватка будет контролировать вас'},
        {name: 'Джонатан Свифт', quote: 'У мудрого человека деньги должны быть в голове, а не в сердце'},
        {name: 'Уилл Роджерс', quote: 'Самый быстрый способ удвоить деньги — сложить их пополам и убрать в карман'},
        {name: 'Эпиктет', quote: 'Богатство приносит не большое состояние, а скромные потребности'},
        {name: 'Бенджамин Франклин', quote: 'Самые лучшие инвестиции — в знания'},
        ]

    const getRandomQuote = () => {
        return Math.floor(Math.random() * (15 - 1) - 1)
    }

    useEffect(() => {
        let number = getRandomQuote()
       setSelectedQuote(mainArray[number])
    }, [])




    const textColor = theme.theme === 'dark' ? '#dadada' : '#000'
    const nameColor = theme.theme === 'dark' ? '#1b1b1b' : '#616161'

    return (
        <View>
<Text style={{...styles.text, color: textColor, fontSize: widthPercentageToDP('5%')}}>
    {selectedQuote ? selectedQuote.quote : 'Самые лучшие инвестиции — в знания'}
</Text>
            <Text style={{...styles.text, textAlign: 'right', paddingVertical: 20, fontStyle: 'italic', color: nameColor, fontSize: widthPercentageToDP('4%')}}>
                {selectedQuote ? selectedQuote.name : 'Бенджамин Франклин'}
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
