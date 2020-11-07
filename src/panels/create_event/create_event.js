import React, {useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import { Checkbox, Headline, MiniInfoCell, Textarea, WriteBar } from '@vkontakte/vkui';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';
import Icon24Article from '@vkontakte/icons/dist/24/article';
import ButEvent from '../../components/event_but/event_but';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import axios from 'axios';
// import WriteBar from '@vkontakte/vkui/dist/components/WriteBar/WriteBar';   

import './create_event.css';
import { useState } from 'react';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";

const CreateEvent = ({ id, go, p_eventId}) => {
    const [eventId, setEventId] = useState(p_eventId);
    const [chb, updateCheck] = useState(-1);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [place, setPlace] = useState("");
    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");
    const [invite_url, setInviteUrl] = useState("");

    const upd = e => {
		updateCheck(e.currentTarget.dataset.ch);
	};

    const publish = e => {
        if (eventId) {
            updateEvent()
        }
        else {
            createEvent()
        }
    }

    useEffect(() => {
        if (eventId !== 0) {
            getEvent()
        }
    }, [eventId])

    async function getEvent() {
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
                setName(resp.data.data.meeting.name)
                setDate(resp.data.data.meeting.date)
                setTime(resp.data.data.meeting.time)
                setPlace(resp.data.data.meeting.place)
                setPrice(resp.data.data.meeting.price)
                setComment(resp.data.data.meeting.comment)
                setInviteUrl(resp.data.data.meeting.invite_url)
            }
        });
    }

    async function updateEvent() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        const data = {
            name: name,
            date: date,
            time: time,
            place: place,
            price: price ? price : null,
            comment: comment,
            invite_url: invite_url ? invite_url : null
        }
        await axios.post(`${BACKEND_URL}/meeting/${eventId}/update`,
            data, {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 201) {
                document.getElementById('backToEvents').click()
            }
        });
    }

    async function createEvent() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        const data = {
            name: name,
            date: date,
            time: time,
            place: place,
            price: price ? price : null,
            comment: comment,
            invite_url: invite_url ? invite_url : null
        }
        await axios.post(`${BACKEND_URL}/meeting/create`,
            data, {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 201) {
                document.getElementById('backToEvents').click()
            }
        });
    }

    return (
    <Panel id={id} className="centerHeader" onScroll>
        <PanelHeader left={<PanelHeaderButton id={"backToEvents"} onClick={go} data-to="events">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}>Мероприятие</PanelHeader>
        <Input placeholder="Название" value={name} onChange={(e) => setName(e.target.value)}/>

        <table style={{ margin: 'auto', marginTop: '10%' }}>
        <tr>
        <td align='center'>{<Icon28CalendarOutline/>}</td>
        <td><Input type="date" placeholder="Дата" value={date} onChange={(e) => setDate(e.target.value)}/></td>
        </tr>

        <tr>
        <td align='center'>{<Icon24Recent/>}</td>
        <td><Input type="time" placeholder="Время" value={time} onChange={(e) => setTime(e.target.value)}/></td>
        </tr>
        <tr>
        <td align='center'>{<Icon28Place/>}</td>
        <td><Input type="text" placeholder="Местоположение" value={place} onChange={(e) => setPlace(e.target.value)}/></td>
        </tr>

        {/*<tr>*/}
        {/*<td align='center'>{<Icon28UserOutline/>}</td>*/}
        {/*<td>{curUser}</td>*/}
        {/*</tr>*/}

        <tr>
        <td align='center'>{<Icon28CoinsOutline/>}</td>
        <td><Input type="text" placeholder="Стоимость" value={price} onChange={(e) => setPrice(e.target.value)}/></td>
        </tr>

        <tr>
        <td align='center'>{<Icon24Article/>}</td>
        <td><Textarea placeholder="Описание" value={comment} onChange={(e) => setComment(e.target.value)}/></td>
        </tr>

        <tr>
        <td align="center"><Checkbox onChange={upd} data-ch={chb * -1}/></td>
        <td>{chb == 1 ? <Input type="link" value={invite_url} placeholder="Ссылка на беседу" onChange={(e) => setInviteUrl(e.target.value)}/> : <Input disabled type="link" placeholder="Ссылка на беседу"/>}</td>
        </tr>
        </table>
        <Button size="l" level="1" onClick={publish}>Опубликовать</Button>
    </Panel>
    );
};

export default CreateEvent;