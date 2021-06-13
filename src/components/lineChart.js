import React from 'react'
import moment from 'moment';


export const lineChartState = (data, isFirstDay) => {
    const newPrices = []

    const newSum = () => {

        let local  = 0;
        let dayX = moment(data[data.length-1].date).set('date', isFirstDay).set('hour', 0)


        for (let i = data.length-1; i>=0 ; i--) {
              let t = data[i]

                if (moment(t.date) <= dayX) {

                    local += parseInt(t.cost);

                    if (data.indexOf(t) === 0) {

                        newPrices.push(local)
                        local = 0
                        dayX = moment(data[0].date).set('date', isFirstDay)
                    }
                } else {
                    if (local > 0) {
                        newPrices.push(local)
                    }
                    if (data.indexOf(t) === 0) {
                        newPrices.push(t.cost)
                    }


                    local = parseInt(t.cost)
                    dayX.add(1, 'month')
                }

        }
    }

    newSum()

    return newPrices.slice(-6)
}


export const lineChartLabels = (data, isFirstDay) => {
    const whatMonthIs = []

    const newLabels = () => {
        let dayX = moment(data[data.length-1].date).set('date', isFirstDay).subtract(1, 'month').set('hour', 0)

        for (let i = data.length-1; i>=0 ; i--) {
            let t = data[i]

            if (moment(t.date) >= dayX)  {
                    if (moment(t.date).date() < dayX.date()) {
                        whatMonthIs.push(moment(t.date).subtract(1, "month").format('MMMM'))
                    }
                    else {
                        whatMonthIs.push(moment(t.date).format('MMMM'))
                    }

                dayX.add(1, 'month')
            }
        }
    }
    newLabels()


    return Array.from(new Set(whatMonthIs)).slice(-6)
}

