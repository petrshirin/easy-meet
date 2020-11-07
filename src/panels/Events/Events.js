import React, { useState } from 'react';
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

import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';

import "./Events.css";
import { Avatar, Caption, Headline, ModalPageHeader, RichCell } from '@vkontakte/vkui';



const Events = ({ id, go, fetchedUser}) => {
	const [activeStatus, setStatus] = useState('all');

	const setSt = e => {
		setStatus(e.currentTarget.dataset.st);
	};

	return (
		<Panel id={id} style={{  }}>
			<PanelHeader>EasyMeet</PanelHeader>
			<HorizontalScrol className="bar">
				<div style={{ display: 'flex' }}>
					<div style={{ color: activeStatus==="all" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="all">
						<Text>Все мероприятия</Text>
					</div>
					<div style={{ color: activeStatus==="future" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="future">
						<Text>Предстоящие</Text>
					</div>
					<div style={{ color: activeStatus==="admin" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="admin">
						<Text>Администрируемые</Text>
					</div>
					<div style={{ color: activeStatus==="prev" ? "#eb1e23" : "#000"}} onClick={setSt} data-st="prev">
						<Text>Прошедшие</Text>
					</div>
				</div>
			</HorizontalScrol>

			<Group separator="hide" header={<Header mode="secondary"></Header>}>
				<CardGrid className="centerHeader">
					<Card size="l" mode="outline" onClick={go} data-to="event">
						<ModalPageHeader>Мероприятие 1</ModalPageHeader>
						<Text>00.00.0000 в 00:00</Text>
						{fetchedUser &&
							<UserStack
								photos={[
									fetchedUser.photo_200,
									fetchedUser.photo_200,
									fetchedUser.photo_200
								]}
								>+3</UserStack>}
					</Card>
					<Card size="l" mode="outline">
						<ModalPageHeader>Мероприятие 2</ModalPageHeader>
						<div style={{ height: 96 }} />
					</Card>
				</CardGrid>
			</Group>
			<TabbarItem style= {{ position: "absolute", right: '10px'}}><Icon28AddCircleOutline fill="#8A00EE"/></TabbarItem>
		</Panel>
	)
};

export default Events; 