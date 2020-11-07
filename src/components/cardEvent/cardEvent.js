import React from 'react';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import UserStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import {useDispatch} from "react-redux";
import {openEvent} from "../../redux/actions";

const { useState } = require("react");

const CardEvent = (props) => {

    const dispatch = useDispatch()

    const goToEventCard = e => {
        console.log(props)
        props.setEventid(props.eventId)
        props.go(e)
    }

    return (
        <Card size="l" mode="outline" onClick={goToEventCard} data-to="event" data-eventId={props.eventId}>
            <ModalPageHeader>{props.name}</ModalPageHeader>
            <Text>{props.date} в {props.time}</Text>
            {props.members.length > 0 &&
                <UserStack
                    photos={
                        props.members.slice(0, 3).map((item) => (item.avatar))
                    }
                >+{props.members.length}</UserStack>}
        </Card>
    )
};


export default CardEvent;