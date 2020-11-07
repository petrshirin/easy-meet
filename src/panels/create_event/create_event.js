import React from 'react';
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
// import WriteBar from '@vkontakte/vkui/dist/components/WriteBar/WriteBar';   

import './create_event.css';
import { useState } from 'react';

const CreateEvent = ({ id, go, fetchedUser }) => {
    const [curUser] = "Gnom";
    const [chb, updateCheck] = useState(-1);

    const upd = e => {
        console.log(e.currentTarget.dataset.ch);
		updateCheck(e.currentTarget.dataset.ch);
	};

    return (
    <Panel id={id} className="centerHeader" onScroll>
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="events">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}>Мероприятие</PanelHeader>
        <Input placeholder="Название"/>

        <table style={{ margin: 'auto', marginTop: '10%' }}>
        <tr>
        <td align='center'>{<Icon28CalendarOutline/>}</td>
        <td><Input type="date" placeholder="Дата"/></td>
        </tr>

        <tr>
        <td align='center'>{<Icon24Recent/>}</td>
        <td><Input type="time" placeholder="Время"/></td>
        </tr>
        <tr>
        <td align='center'>{<Icon28Place/>}</td>
        <td><Input type="text" placeholder="Местоположение"/></td>
        </tr>

        <tr>
        <td align='center'>{<Icon28UserOutline/>}</td>
        <td>{curUser}</td>
        </tr>

        <tr>
        <td align='center'>{<Icon28CoinsOutline/>}</td>
        <td><Input type="text" placeholder="Стоимость"/></td>
        </tr>

        <tr>
        <td align='center'>{<Icon24Article/>}</td>
        <td><Textarea placeholder="Описание"/></td>
        </tr>

        <tr>
        <td align="center"><Checkbox onChange={upd} data-ch={chb * -1}/></td>
        <td>{chb == 1 ? <Input type="link" placeholder="Ссылка на беседу"/> : <Input disabled type="link" placeholder="Ссылка на беседу"/>}</td>
        </tr>
        </table>
        <Button size="l" level="1">Опубликовать</Button>
    </Panel>
    );
};

export default CreateEvent;