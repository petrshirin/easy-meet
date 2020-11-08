import { Avatar, SimpleCell } from '@vkontakte/vkui';
import React, {useState} from 'react';

const PopupUser = ({ go, userName, avatar, userUrl}) => {

    return (
        <SimpleCell>
            <Avatar
            onClick={go}
            data-to="mapProfile" src={avatar}/>
            <a href={userUrl}>{userName}</a>
        </SimpleCell>
    ) 
};

export default PopupUser;