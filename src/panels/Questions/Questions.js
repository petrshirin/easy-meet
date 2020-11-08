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
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
import Icon24ChevronLeft from '@vkontakte/icons/dist/24/chevron_left';
import './Questions.css';
import { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";

const Questions = ({ id, setQuestionId, go }) => {

	const [part, setPart] = useState('')
	const [text, setText] = useState('')

	const doQuestion = e => {
		createQuestion()
		setQuestionId(0)
		go(e)
	}

	async function createQuestion() {
		let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
		await axios.post(`${BACKEND_URL}/question/create`,
			{
				text: text,
				part: part
			},
			{
				headers: {
					'Authorization': `Token ${userToken.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		).then((resp) => {
			if (resp.status === 200) {
			}
		});
	}

	return (
	<Panel id={id}>
		<PanelHeader><div className = "iop">Задать вопрос</div></PanelHeader>
            <FormLayout>
                <FormLayoutGroup top="Ваш вопрос">
                    <Input type="text" onChange={(e) => setText(e.target.value)}/>
                    <SelectTool setPart={setPart}/>
                    <div className = "aue"><Button size="l" onClick={doQuestion} data-to="tolking">Задать вопрос</Button></div>
                </FormLayoutGroup>
            </FormLayout>
			<div className = "back">
          		<Icon24ChevronLeft onClick={go} data-to="tolking"/>
			</div>
	</Panel>
)};

Questions.propTypes = {
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

export default Questions;
