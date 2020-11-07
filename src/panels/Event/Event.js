import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import { MiniInfoCell } from '@vkontakte/vkui';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';
import Icon24Article from '@vkontakte/icons/dist/24/article';
import ButEvent from '../../components/event_but/event_but';

import axios from "axios";
import './Event.css';
import {BACKEND_URL} from "../../requests";
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";


const Event = ({ id, go, eventId }) => {
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const [isMember, setIsMember] = useState(false);
    const [eventInfo, setInfo] = useState({
        name: "Мероприятие",
        date: "12.12.2020",
        time: "12:12",
        creator: {
            id: 0,
            first_name: "Имя",
            second_name: "Фамилия",
            avatar: null,
            user_url: null,
            interests: []

        },
        place: "Место",
        price: null,
        max_participant: null,
        comment: "Коммент",
        invite_url: null
    });

    useEffect(() => {
        getInfoAboutEvent()
    }, [])

    async function getInfoAboutEvent() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.get(`${BACKEND_URL}/meeting/${eventId}`,
            {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 200) {
                setInfo(resp.data.data.meeting)
                setIsMember(resp.data.data.is_member)
                setPopout(null)
            }
        });
    }

    return (<Panel id={id} className="centerHeader">
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="events">{<Icon24Back
            fill="#000"/>}</PanelHeaderButton>}>{eventInfo.name}</PanelHeader>
        <ModalPageHeader>{eventInfo.name}</ModalPageHeader>

        <MiniInfoCell
            before={<Icon24Recent/>}
            textWrap="full"
            textLevel="primary"
        >{eventInfo.date} в {eventInfo.time}</MiniInfoCell>

        <MiniInfoCell
            before={<Icon28Place/>}
            textWrap="full"
            textLevel="primary"
        >{eventInfo.place}</MiniInfoCell>

        <MiniInfoCell
            before={<Icon28UserOutline/>}
            textWrap="full"
            textLevel="primary"
        ><a href={eventInfo.creator.user_url}>{`${eventInfo.creator.first_name} ${eventInfo.creator.second_name}`}</a></MiniInfoCell>

        {eventInfo.price ? <MiniInfoCell
            before={<Icon28CoinsOutline/>}
            textWrap="full"
            textLevel="primary"
        >{eventInfo.price}</MiniInfoCell> : ""}

        <MiniInfoCell
            before={<Icon24Article/>}
            textWrap="full"
            textLevel="primary"
        >{eventInfo.comment}</MiniInfoCell>

        <ButEvent urState={isMember} link_to={eventInfo.invite_url} setIsMember={setIsMember} eventId={eventId}/>
    </Panel>)
};

export default Event;