import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Events from './panels/Events/Events';
import Event from './panels/Event/Event';
import {BACKEND_URL} from './requests'
import Home from './panels/Home/Home';
import Persik from './panels/Persik/Persik';
import ToolBar from './components/toolbar/toolbar'
import SelectTool from './components/selecttool/selecttool'
import { Div } from '@vkontakte/vkui';
import Questions from './panels/Questions/Questions';
import Vopros from './panels/Vopros/Vopros';
import Tolking from './panels/Tolking/Tolking';
import YourPage from './panels/YourPage/YourPage';
import Settings from './panels/Settings/Settings';
import Registration from './panels/Registration/Registration';
import {login} from "./redux/actions";
import {useDispatch} from "react-redux";
import axios from "axios";
import {USER_DATA_STORAGE_KEY} from "./redux/reducers/store";
import CreateEvent from './panels/create_event/create_event';

const App = () => {
	const [activePanel, setActivePanel] = useState('events');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [fetchedUser, setUser] = useState(null);
	const [eventId, setEventId] = useState(0);
	const [questionId, setQuestionId] = useState(0);

	const dispatch = useDispatch()

	async function fetchData() {
		// Получение текущего пользователя, закоментил для девовского приложения
		const user = await bridge.send('VKWebAppGetUserInfo')
		let dataToBackEnd = {
			first_name: user.first_name,
			second_name: user.last_name,
			avatar: user.photo_200,

		}
		let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
		console.log(userToken)
		await axios.post(`${BACKEND_URL}/user/info/update/`,
			dataToBackEnd, {
				headers: {
					'Authorization': `Token ${userToken.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		).then((resp) => {
			if (resp.status === 201) {
				console.log(resp.data)
				setUser(resp.data.data)
			}
		});

		setPopout(null)
	}

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});


		async function getUserToken() {
			const queryParams = document.location.search
			await axios.post(`${BACKEND_URL}/user/auth/`,
				{"url": queryParams},
				{
					'Content-Type': 'application/json;charset=utf-8'
				}
			).then((resp) => {
				if (resp.status === 201) {
					if (resp.data.data.new) {
						setActivePanel('registration')
					}
					dispatch(login(resp.data.data))
					fetchData()
				}
			});
		}

		getUserToken()
	}, [])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	}


	return (
		<div>
			<View activePanel={activePanel} popout={popout}>
				<Events id='events' fetchedUser={fetchedUser} go={go} setEventId={setEventId}/>
				<Home id='home' fetchedUser={fetchedUser} go={go} />
				<Questions id='questions' setQuestionId={setQuestionId} go={go}/>
				<Vopros id='vopros' go={go} questionId={questionId}/>
				<Tolking id='tolking' go={go} setQuestionId={setQuestionId}/>
				<YourPage id='yourpage' fetchedUser={fetchedUser} go={go} />
				<Settings id='settings' fetchedUser={fetchedUser} go={go} fetchData={fetchData}/>
				<Registration id='registration' fetchedUser={fetchedUser} go={go} fetchData={fetchData}/>
				<Persik id='persik' go={go} />
				<Event id='event' go={go} eventId={eventId}/>
				<CreateEvent id='createEvent' go={go} />
			</View>
			<ToolBar activeWin={activePanel} go={go}/>

		</div>
	);
}

export default App;

