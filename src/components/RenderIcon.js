import React from 'react'
import {defaultColors} from "../colors";
import {Ionicons} from '@expo/vector-icons'

const RenderIcon = props => {

    switch(props.category) {
        case 'general': return (
              <Ionicons name='ios-cart' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.general.color} />
        )

        case 'house': return (
              <Ionicons name='ios-home' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.house.color} />
        )

        case 'transport': return (
              <Ionicons name='ios-car' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.transport.color} />
        )

        case 'food': return (
              <Ionicons name='ios-cafe' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.food.color} />
        )

        case 'people': return (
              <Ionicons name='ios-people' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.people.color} />
        )

        case 'entertainment': return (
              <Ionicons name='game-controller' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.entertainment.color} />
        )

        case 'education': return (
              <Ionicons name='ios-school' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.education.color} />
        )

        case 'health': return (
              <Ionicons name='ios-pulse' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.health.color} />
        )

        case 'appearance': return (
              <Ionicons name='ios-shirt' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.appearance.color} />
        )

        case 'hobby': return (
              <Ionicons name='ios-color-palette' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.hobby.color} />
        )
        case 'payments': return (
            <Ionicons name='ios-wallet' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.payments.color} />
        )
        case 'gifts': return (
            <Ionicons name='ios-gift' size={props.style ? 40 : 28} color={props.style ? defaultColors.white : defaultColors.cats.gifts.color} />
        )
        default: break;}
}

export default RenderIcon
