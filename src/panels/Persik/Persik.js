import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ToolBar from "../../components/toolbar/toolbar"

import persik from '../../img/persik.png';
import './Persik.css';
import axios from "axios";
import {BACKEND_URL} from "../../requests";
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";

const osName = platform();

const Persik = props => {
	const [userAvatar, setAvatar] = useState(null)
	let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
	async function loadAvatar() {
		await axios.get(`${BACKEND_URL}/meeting/`,
			{
				headers: {
					'Authorization': `Token ${userToken.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		).then((resp) => {
			if (resp.status === 200) {
				setAvatar(resp.data.data[0].members[0].avatar)
				console.log(resp.data)
			}
		});
	}
	loadAvatar()
	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Persik
			</PanelHeader>
			<img className="Persik" src={userAvatar} alt="Persik The Cat"/>
		</Panel>
	)
};

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
