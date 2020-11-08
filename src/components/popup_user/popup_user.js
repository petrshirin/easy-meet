import { Avatar, SimpleCell } from '@vkontakte/vkui';
import React, {useState} from 'react';

const PopupUser = ({ go }) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("Name User");

    return (
        <SimpleCell>
            <Avatar
            onClick={go}
            data-to="mapProfile"/>
            {userName}
        </SimpleCell>
    ) 
};

export default PopupUser;