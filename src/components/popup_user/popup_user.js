import { Avatar, SimpleCell } from '@vkontakte/vkui';
import React, {useState} from 'react';

const PopupUser = ({ go, userInfo, setProfilerUser}) => {

    const goToProfile = e => {
        setProfilerUser(userInfo)
        go(e)
    }

    return (
        <SimpleCell>
            <Avatar
            onClick={goToProfile}
            data-to="mapProfile" src={userInfo.avatar}/>
            <a onClick={goToProfile}>{`${userInfo.first_name} ${userInfo.second_name}`}</a>
        </SimpleCell>
    ) 
};

export default PopupUser;