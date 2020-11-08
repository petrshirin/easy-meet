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
import { Banner, RichCell, Fragment } from '@vkontakte/vkui';
import {CardGrid, Card} from '@vkontakte/vkui';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import './YourPage.css';
import Interests from '../../components/interests/interests'
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const YourPage = ({ id, go, fetchedUser}) => {
	return (
    <Panel id={id}>
        <PanelHeader>Личный кабинет</PanelHeader>
        <RichCell 
        disabled
        multiline
        before={<Avatar size={120} src={fetchedUser.avatar}/>}>
        <div>{`${fetchedUser.first_name} ${fetchedUser.second_name}`}</div>
        <div><text>{fetchedUser.score}</text></div>
        </RichCell>
		{fetchedUser.interests.map((item) => (
			<Interests name = {item.name}/>
		))}


        <div className = "ico">
			<Icon24Settings fill='#8a00ee' onClick={go} data-to="settings" width = {50} height = {50}/> 
		</div>

    </Panel>
) };

YourPage.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		avatar: PropTypes.string,
		first_name: PropTypes.string,
		second_name: PropTypes.string,
		score: PropTypes.number,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};


export default YourPage; 