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
import './Settings.css';
import Interests from '../../components/interests/interests'
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import axios from "axios";
import {BACKEND_URL} from "../../requests";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";

const Settings = ({ id, go, fetchedUser, fetchData}) => {

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

    useEffect(() => {
        let arr = fetchedUser.interests.map((item) => item.id)
        setInterests(arr)
    }, [])

    const doInterests = e => {
        updateUserInterests()
        go(e)
        fetchData()
    }

    const checkCheckbox = (checkboxId) => {
        let arr = fetchedUser.interests.map((item) => item.id)
        console.log(arr)
        return arr.includes(checkboxId)
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
        <PanelHeader>Настройки</PanelHeader>
        <RichCell 
        disabled
        multiline
        before={<Avatar size={120} src={fetchedUser.avatar}/>}>
        <div className = "name">{`${fetchedUser.first_name} ${fetchedUser.second_name}`}</div>
        </RichCell>
        <div onChange={addRemoveInterest} data-id={1}><Checkbox defaultChecked={checkCheckbox(1)}>Иностранные языки</Checkbox></div>
        <div onChange={addRemoveInterest} data-id={2}><Checkbox defaultChecked={checkCheckbox(2)}>Дизайн и творчество</Checkbox></div>
        <div onChange={addRemoveInterest} data-id={3}><Checkbox defaultChecked={checkCheckbox(3)}>Фотография</Checkbox></div>
        <div onChange={addRemoveInterest} data-id={4}><Checkbox defaultChecked={checkCheckbox(4)}>ЕГЭ и ОГЭ</Checkbox></div>
        <div onChange={addRemoveInterest} data-id={5}><Checkbox defaultChecked={checkCheckbox(5)}>Робототехника</Checkbox></div>
        <div onChange={addRemoveInterest} data-id={6}><Checkbox defaultChecked={checkCheckbox(6)}>Программирование</Checkbox></div>
        <div className = "auex"><Button size="l"  onClick={doInterests} data-to="yourpage">Сохранить</Button></div>
        <div className = "otstup"></div>
    </Panel>
)};

Settings.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		avatar: PropTypes.string,
		first_name: PropTypes.string,
		second_name: PropTypes.string,

	}),
};


export default Settings; 