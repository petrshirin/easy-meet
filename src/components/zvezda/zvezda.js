import React from 'react';
import PropTypes from 'prop-types';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Icon28SafariOutline from '@vkontakte/icons/dist/28/safari_outline';
import { Div } from '@vkontakte/vkui';
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import Icon24HelpOutline from '@vkontakte/icons/dist/24/help_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import { Banner } from '@vkontakte/vkui';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon20MessageOutline from '@vkontakte/icons/dist/20/message_outline';
import BannerText from '../textbanner/textbanner'
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import './zvezda.css';
import { useState, useEffect, useRef, Fragment } from 'react';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import axios from 'axios';


const Zvezda = ({autor, otv, mark, answerId}) => {
    const [countBlackStars, setBlackStars] = useState(mark ? mark : 0)
    const [countWhiteStars, setWhiteStars] = useState(mark ? 5 - mark : 5)
    const [popout, setPopout] = useState(null);

    const updateStars = e => {
        doMark()
        setBlackStars(e.currentTarget.dataset.count)
        setWhiteStars(5 - e.currentTarget.dataset.count)
    }

    async function doMark() {
        setPopout(<ScreenSpinner size='large'/>)
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.get(`${BACKEND_URL}/answer/${answerId}/mark`,
            {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 200) {
            }

            setPopout(null)
        });
    }

    return (
<Group>
    <div><text>{autor}</text></div>
    <div className = "tg"><text>{otv}</text></div>
    <div className = "container">
        <div className = "box">
            <div>{countBlackStars >= 1 ? <Icon24Favorite/> : <Icon24FavoriteOutline onClick = {updateStars} data-count = {1}/>}</div>
            <div>{countBlackStars >= 2 ? <Icon24Favorite/> : <Icon24FavoriteOutline onClick = {updateStars} data-count = {2}/>}</div>
            <div>{countBlackStars >= 3 ? <Icon24Favorite/> : <Icon24FavoriteOutline onClick = {updateStars} data-count = {3}/>}</div>
            <div>{countBlackStars >= 4 ? <Icon24Favorite/> : <Icon24FavoriteOutline onClick = {updateStars} data-count = {4}/>}</div>
            <div>{countBlackStars >= 5 ? <Icon24Favorite/> : <Icon24FavoriteOutline onClick = {updateStars} data-count = {5}/>}</div>
        </div>
    </div>
</Group>  

)};

Zvezda.propTypes = {
};

export default Zvezda;