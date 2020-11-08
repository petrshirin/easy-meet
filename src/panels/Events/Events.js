import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import HorizontalScrol from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import UserStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
// import CreateEvent from './panels/create_event/create_event';

import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';

import "./Events.css";
import CardEvent from '../../components/cardEvent/cardEvent';
import {Avatar, Caption, Headline, ModalPageHeader, RichCell} from '@vkontakte/vkui';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import axios from 'axios';





const Events = ({id, go, setEventId}) => {
    const [activeStatus, setStatus] = useState("0");
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [eventsList, setEvents] = useState([
        {
            id: 1,
            name: "qwe",
            date: "12.12.2020",
            time: "11:11",
            members: [
                {
                    id: 5,
                    first_name: "Петр",
                    second_name: "Ширин",
                    avatar: "https://sun4-16.userapi.com/impf/c851420/v851420053/fbe04/7GHWNgcRBWA.jpg?size=200x0&quality=96&crop=1,40,1197,1197&sign=89bc2d03c563da16f8170f746313d98b&ava=1",
                    user_url: "https://vk.com/id140227524",
                    interests: []
                }
            ]
        }
    ]);


    async function loadEvents() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.get(`${BACKEND_URL}/meeting/?type=${activeStatus}`,
            {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 200) {
                setEvents(resp.data.data)
                setPopout(null)
            }
        });
    }

    useEffect(() => {
        loadEvents()

    }, [activeStatus])


    const setSt = e => {
        setStatus(e.currentTarget.dataset.st);
    };
    return (
        <Panel id={id} style={{}}>
            <div className = "cent"><PanelHeader>EasyMeet</PanelHeader></div>
            <HorizontalScrol className="bar">
                <div style={{display: 'flex'}}>
                    <div style={{color: activeStatus === "0" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="0">
                        <Text>Все мероприятия</Text>
                    </div>
                    <div style={{color: activeStatus === "1" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="1">
                        <Text>Предстоящие</Text>
                    </div>
                    <div style={{color: activeStatus === "2" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="2">
                        <Text>Администрируемые</Text>
                    </div>
                    <div style={{color: activeStatus === "3" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="3">
                        <Text>Прошедшие</Text>
                    </div>
                </div>
            </HorizontalScrol>

            <Group separator="hide" header={<Header mode="secondary"/>}>
                <CardGrid className="centerHeader">
                    {eventsList.map((item) => (
                        <CardEvent
                            go={go}
                            setEventid={setEventId}
                            eventId={item.id}
                            name={item.name}
                            date={item.date}
                            time={item.time}
                            members={item.members}
                        />
                        )

                    )}
                </CardGrid>
            </Group>
            <div className="ico"><Icon28AddCircleOutline fill='#8a00ee' onClick={go} data-to="createEvent" width={50}
                                                         height={50}/></div>
        </Panel>
    )
};

export default Events; 