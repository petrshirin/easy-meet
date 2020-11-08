import React, {useState, useEffect} from 'react';
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
import './Registration.css';
import Interests from '../../components/interests/interests'
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CheckBox from '../../components/checkBox/checkBox'
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import axios from "axios";
import {BACKEND_URL} from "../../requests";

const Registration = ({ id, go, fetchedUser, fetchData}) => {

	const [interests, setInterests] = useState([])

	const addRemoveInterest = e => {
		if (e.target.checked) {
			let new_interests = interests
			new_interests.push(+e.currentTarget.dataset.id)
			setInterests(new_interests)
		}
		else {
			let new_interests = interests.filter(item => item !== +e.currentTarget.dataset.id)
			setInterests(new_interests)
		}
	}

	const doInterests = e => {
		updateUserInterests()
		fetchData()
		go(e)
	}

	async function updateUserInterests() {
		let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
		await axios.put(`${BACKEND_URL}/user/interest/update`,
			{interests: interests}, {
				headers: {
					'Authorization': `Token ${userToken.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		).then((resp) => {
			if (resp.status === 201) {
			}
		});
	}

	return (
		<Panel id={id}>
			<PanelHeader>Регистрация</PanelHeader>
			{fetchedUser &&
			<Group title="User Data Fetched with VK Bridge">
				<div className = "ava"><Avatar size = {120} src={fetchedUser.avatar}/></div>
				<div className = "name">{`${fetchedUser.first_name} ${fetchedUser.second_name}`}</div>

			</Group>}
			<div className = "cb" onChange={addRemoveInterest} data-id={1}><CheckBox name = "Иностранные языки"/></div>
			<div className = "cb" onChange={addRemoveInterest} data-id={2}><CheckBox name = "Дизайн и творчество"/></div>
			<div className = "cb" onChange={addRemoveInterest} data-id={3}><CheckBox name = "Фотография"/></div>
			<div className = "cb" onChange={addRemoveInterest} data-id={4}><CheckBox name = "ЕГЭ и ОГЭ"/></div>
			<div className = "cb" onChange={addRemoveInterest} data-id={5}><CheckBox name = "Робототехника"/></div>
			<div className = "cb" onChange={addRemoveInterest} data-id={6}><CheckBox name = "Программирование"/></div>
			<div className = "aue"><Button size="l"  onClick={doInterests} data-to="events">Регистрация</Button></div>
		</Panel>
	) ;
}

Registration.propTypes = {
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


export default Registration; 