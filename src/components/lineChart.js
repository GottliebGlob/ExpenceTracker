import React from 'react'
import moment from "moment";

const lineChartState = (data) => {

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

    return linePrices.reverse().slice(-6)
}

export default lineChartState
