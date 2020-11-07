import React, {useEffect, useState} from 'react';
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
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";
import axios from 'axios';
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";

const Tolking = ({ id, go, setQuestionId}) => {
	const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
	const [part, setPart] = useState('')
	const [answerList, setAnswerList] = useState([
		{
			"id": 1,
			"creator":  {
				"id": 5,
				"first_name": "Петр",
				"second_name": "Ширин",
				"avatar": "https://sun4-16.userapi.com/impf/c851420/v851420053/fbe04/7GHWNgcRBWA.jpg?size=200x0&quality=96&crop=1,40,1197,1197&sign=89bc2d03c563da16f8170f746313d98b&ava=1",
				"user_url": "https://vk.com/id140227524",
				"interests": []
			},
			"text": "Ефрейтор",
			"part": "Дизайн и Творчество",
			"date_created": "07.11.2020 14:06",
			"answers": [
				{
					"id": 1,
					"commentator": 5,
					"comment": "Разработка чат бота под Vk или Telegram. Строки и стоимость могут измениться от функционала, цена за стандартного бота.",
					"date_commented": "07.11.2020 14:07"
				}
			]
		}
	]);

	useEffect(() => {
		updateQuestions()
	}, [part, ])


	async function updateQuestions() {
		let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
		await axios.get(`${BACKEND_URL}/question/?part=${part}`,
			{
				headers: {
					'Authorization': `Token ${userToken.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		).then((resp) => {
			if (resp.status === 200) {
				setAnswerList(resp.data.data)
				setPopout(null)
			}
		});
	}

	const goToQuestionCard = e => {
		setQuestionId(e.currentTarget.dataset.question)
		go(e)
	}

	return (<Panel id={id}>
		<PanelHeader>EasyMeet</PanelHeader>
		<SelectTool setPart={setPart}/>
		{answerList.map((item) => (
			<Answer head={item.text} ans={item.answers.length} but={<Button onClick={goToQuestionCard} data-to="vopros" data-question={item.id}>Перейти</Button>} go={go}/>
		))}
		<div className="ico">
			<Icon28AddCircleOutline fill='#8a00ee' onClick={go} data-to="questions" width={50} height={50}/>
		</div>

	</Panel>)
};

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
