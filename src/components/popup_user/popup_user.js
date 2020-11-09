import { Avatar, SimpleCell } from '@vkontakte/vkui';
import React, {useState} from 'react';

const PopupUser = ({ go, userInfo, setProfilerUser}) => {

    const goToProfile = e => {
        setProfilerUser(userInfo)
        go(e)
    }

    return (
        <SimpleCell onClick={goToProfile}>
            <Avatar
            data-to="mapProfile" src={userInfo.avatar}/>
            {`${userInfo.first_name} ${userInfo.second_name}`}
        </SimpleCell>
    ) 
};

export default PopupUser;