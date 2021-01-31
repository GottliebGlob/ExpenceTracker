import React from 'react'
import {colors} from "../colors";
import {Ionicons} from '@expo/vector-icons'

const RenderIcon = props => {

    switch(props.category) {
        case 'general': return (
              <Ionicons name='ios-cart' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.general.color} />
        )

        case 'house': return (
              <Ionicons name='ios-home' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.house.color} />
        )

        case 'transport': return (
              <Ionicons name='ios-car' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.transport.color} />
        )

        case 'food': return (
              <Ionicons name='ios-cafe' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.food.color} />
        )

        case 'people': return (
              <Ionicons name='ios-people' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.people.color} />
        )

        case 'entertainment': return (
              <Ionicons name='ios-bowtie' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.entertainment.color} />
        )

        case 'education': return (
              <Ionicons name='ios-school' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.education.color} />
        )

        case 'health': return (
              <Ionicons name='ios-pulse' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.health.color} />
        )

        case 'appearance': return (
              <Ionicons name='ios-shirt' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.appearance.color} />
        )

        case 'hobby': return (
              <Ionicons name='ios-color-palette' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.hobby.color} />
        )
        case 'payments': return (
            <Ionicons name='ios-wallet' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.payments.color} />
        )
        case 'gifts': return (
            <Ionicons name='ios-gift' size={props.style ? 40 : 28} color={props.style ? colors.white : colors.cats.gifts.color} />
        )
        default: break;
    }
}

export default RenderIcon
