import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';

const Event = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="events">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}>Мероприятие</PanelHeader>
        <ModalPageHeader>Название</ModalPageHeader>


    </Panel>
);

export default Event;