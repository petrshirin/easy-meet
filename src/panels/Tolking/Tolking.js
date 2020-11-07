import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ToolBar from '../../components/toolbar/toolbar'
import SelectTool from '../../components/selecttool/selecttool'
import Answer from '../../components/answer/answer'
import { Banner } from '@vkontakte/vkui';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import './Tolking.css';

const Tolking = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>EasyMeet</PanelHeader>
		<SelectTool></SelectTool>
		<div className = "aux">
		<Answer head = "ya lomal steklo?" ans = "4" but = {<Button onClick={go} data-to="vopros">Перейти</Button>}></Answer>
		<Answer head = "kak shekolad v ruke"  ans = "5" but = {<Button onClick={go} data-to="vopros">Перейти</Button>}></Answer>
		<Answer head = "ya rezal eti palci" ans = "6" but = {<Button onClick={go} data-to="vopros">Перейти</Button>}></Answer>
		<Answer head = "za to 4to oni" ans = '1' but = {<Button onClick={go} data-to="vopros">Перейти</Button>} ></Answer>
		</div>
		<div className = "ico">
			<Icon28AddCircleOutline fill='#8a00ee' onClick={go} data-to="questions" width = {50} height = {50}/> 
		</div>
		{/* {fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>} */}

		{/* <Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group> */}
		
	</Panel>
);

Tolking.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Tolking;
