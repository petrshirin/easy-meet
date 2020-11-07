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
import './Settings.css';
import Interests from '../../components/interests/interests'
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CheckBox from '../../components/checkBox/checkBox'

const Settings = ({ id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader>Настройки</PanelHeader>
        <RichCell 
        disabled
        multiline
        before={<Avatar size={120} src={fetchedUser.photo_200}></Avatar>}>
        <div className = "name">{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</div>
        </RichCell>
        <CheckBox name = "Иностранные языки"></CheckBox>
        <CheckBox name = "Дизайн и творчество"></CheckBox>
        <CheckBox name = "Фотография"></CheckBox>
        <CheckBox name = "ЕГЭ и ОГЭ"></CheckBox>
        <CheckBox name = "Робототехника"></CheckBox>
        <CheckBox name = "Программированиео"></CheckBox>
        <div className = "aue"><Button size="l"  onClick={go} data-to="yourpage">Сохранить</Button></div>
    </Panel>
);

Settings.propTypes = {
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


export default Settings; 