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
import Zvezda from '../../components/zvezda/zvezda'
import Answer from '../../components/answer/answer'
import { Banner } from '@vkontakte/vkui';
import { WriteBar, WriteBarIcon } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon24ChevronLeft from '@vkontakte/icons/dist/24/chevron_left';
import './Vopros.css';
import { useState, useEffect, useRef, Fragment } from 'react';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import axios from 'axios';



const Vopros = ({ id, go, questionId}) => {
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [question, SetQuestion] = useState(
        {
            "id": 1,
            "creator": {
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
                    "commentator": {
                        "id": 5,
                        "first_name": "Петр",
                        "second_name": "Ширин",
                        "avatar": "https://sun4-16.userapi.com/impf/c851420/v851420053/fbe04/7GHWNgcRBWA.jpg?size=200x0&quality=96&crop=1,40,1197,1197&sign=89bc2d03c563da16f8170f746313d98b&ava=1",
                        "user_url": "https://vk.com/id140227524",
                        "interests": []
                    },
                    "comment": "Разработка чат бота под Vk или Telegram. Строки и стоимость могут измениться от функционала, цена за стандартного бота.",
                    "date_commented": "07.11.2020 14:07",
                    "mark": 3
                }
            ]
        }
    )
    const [answer, SetAnswer] = useState("")
    const [isUpdateQuestion, NeedUpdateQuestion] = useState(false)


    useEffect(() => {
        getQuestion()
    }, [isUpdateQuestion])

    const doAnswer = e => {
        sendAnswer()
    }


    async function getQuestion() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.get(`${BACKEND_URL}/question/${questionId}`,
            {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 200) {
                SetQuestion(resp.data.data)
                setPopout(null)
                NeedUpdateQuestion(true)
            }
        });
    }



    async function sendAnswer() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.post(`${BACKEND_URL}/question/${questionId}/answer/create`,
            {comment: answer}, {
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
		<div className = "zag"><PanelHeader>{question.text.slice(0, 15)}...</PanelHeader></div>
            <div className="tex">
                <text>{`${question.creator.first_name} ${question.creator.second_name}`}</text>
            </div>
            <div className="auttex">
                <text>{question.text}</text>
            </div>
          <Group>
          <WriteBar
            after={
              <Fragment>
                <WriteBarIcon>
                    <Icon28Send fill='#8a00ee' onClick={doAnswer} />
                </WriteBarIcon>
              </Fragment>
            }
            placeholder="Ответ"
            onChange={(e) => SetAnswer(e.target.value)}
          />
        </Group>
        {question.answers.map((item) => (
            <Zvezda autor ={`${item.commentator.first_name} ${item.commentator.second_name}`}
                    otv = {item.comment} mark={item.mark} answerId={item.id}/>
        ))}
        <div className = "back">
          <Icon24ChevronLeft onClick={go} data-to="tolking"/>
        </div>
	</Panel>
)};


export default Vopros;
