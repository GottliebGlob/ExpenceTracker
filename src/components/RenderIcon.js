import React from 'react'
import {colors} from "../colors";
import {Ionicons} from '@expo/vector-icons'

const RenderIcon = (category) => {

    switch(category.category) {
        case 'general': return (
              <Ionicons name='ios-cart' size={28} color={colors.cats.general.color} />
        )

        case 'house': return (
              <Ionicons name='ios-home' size={28} color={colors.cats.house.color} />
        )

        case 'transport': return (
              <Ionicons name='ios-car' size={28} color={colors.cats.transport.color} />
        )

        case 'food': return (
              <Ionicons name='ios-cafe' size={28} color={colors.cats.food.color} />
        )

        case 'people': return (
              <Ionicons name='ios-people' size={28} color={colors.cats.people.color} />
        )

        case 'entertainment': return (
              <Ionicons name='ios-bowtie' size={28} color={colors.cats.entertainment.color} />
        )

        case 'education': return (
              <Ionicons name='ios-school' size={28} color={colors.cats.education.color} />
        )

        case 'health': return (
              <Ionicons name='ios-pulse' size={28} color={colors.cats.health.color} />
        )

        case 'appearance': return (
              <Ionicons name='ios-shirt' size={28} color={colors.cats.appearance.color} />
        )

        case 'hobby': return (
              <Ionicons name='ios-color-palette' size={28} color={colors.cats.hobby.color} />
        )
        default: break;
    }
}

export default RenderIcon
