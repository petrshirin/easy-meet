import React from 'react';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import UserStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';

const { useState } = require("react");

const CardEvent = ({go}) => {
    const [nameEvent] = useState('Event 1');
    const [dateEvent] = useState('00.00.00');
    const [timeEvent] = useState('00:00');
    const [users] = useState(null);
    const [counrUsers] = useState(0);

    return (
        <Card size="l" mode="outline" onClick={go} data-to="event">
            <ModalPageHeader>{nameEvent}</ModalPageHeader>
            <Text>{dateEvent} в {timeEvent}</Text>
            {counrUsers > 0 &&
                <UserStack
                    photos={[
                    ]}
                >+{counrUsers}</UserStack>}
        </Card>
    )
};

export default CardEvent;