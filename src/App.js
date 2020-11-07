import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Events from './panels/Events/Events';
import Event from './panels/Event/Event';
import {authorizeUser} from './requests'
import Home from './panels/Home/Home';
import Persik from './panels/Persik/Persik';
import ToolBar from './components/toolbar/toolbar'
import { Div } from '@vkontakte/vkui';

const App = () => {
	const [activePanel, setActivePanel] = useState('events');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			// Получение текущего пользователя, закоментил для девовского приложения
			const user = await bridge.send('VKWebAppGetUserInfo')
			setUser(user)
			setPopout(null)
		}

		async function getUserToken() {
			const response = authorizeUser()
			if (response.errors) {

			}
		}
		getUserToken()
		fetchData()
	}, [])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	}


	return (
		<div>
			<View activePanel={activePanel} popout={popout}>
				<Events id='events' fetchedUser={fetchedUser} go={go}/>
				<Home id='home' fetchedUser={fetchedUser} go={go} />
				<Persik id='persik' go={go} />
				<Event id='event' fetchedUser={fetchedUser} go={go} />
			</View>
			<ToolBar activeWin={activePanel} go={go}/>
		</div>
	);
}

export default App;

