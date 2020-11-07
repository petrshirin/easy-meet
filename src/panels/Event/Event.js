import React from 'react';
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

import './Event.css';
const Event = ({ id, go, fetchedUser }) => (
    <Panel id={id} className="centerHeader">
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="events">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}>Мероприятие</PanelHeader>
        <ModalPageHeader>Название</ModalPageHeader>

        <MiniInfoCell
            before={<Icon24Recent/>}
            textWrap="full"
            textLevel="primary"
            >00.00.00 в 00:00</MiniInfoCell>

        <MiniInfoCell
            before={<Icon28Place/>}
            textWrap="full"
            textLevel="primary"
            >Место</MiniInfoCell>

        <MiniInfoCell
            before={<Icon28UserOutline/>}
            textWrap="full"
            textLevel="primary"
        >Организатор</MiniInfoCell>

        <MiniInfoCell
            before={<Icon28CoinsOutline/>}
            textWrap="full"
            textLevel="primary"
        >Деньги</MiniInfoCell>

        <MiniInfoCell
            before={<Icon24Article/>}
            textWrap="full"
            textLevel="primary"
        >Описание мероприятия</MiniInfoCell>

        <ButEvent/>
    </Panel>
);

export default Event;