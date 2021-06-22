import React from 'react'
import {defaultColors} from "../colors";
import {getRightFontScale} from "./flex";


const pieChartState = (data, colors) => {

    const monthlySpends = []

    const monthTemp = data.map(e => ({population: e.cost, cat: e.cat})).reduce((object, item) => {
        let cat = item.cat;
        let population = item.population;
        if (!object.hasOwnProperty(cat)) {
            object[cat] = 0;
        }
        object[cat] += population;
        return object;
    }, {});

    for (let [key, value] of Object.entries(monthTemp)) {
        let name = `cats.${key}.name`.split('.').reduce((p,c)=>p&&p[c]||null, defaultColors)
        let color = `cats.${key}.color`.split('.').reduce((p,c)=>p&&p[c]||null, defaultColors)

        let newArrayItem = {name: name, population: value, color: color,legendFontColor: colors.text, legendFontSize: getRightFontScale(14)}
        monthlySpends.push(newArrayItem)
    }

    return monthlySpends
}

export default pieChartState
