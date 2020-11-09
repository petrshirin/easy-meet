import { Icon24VideoFillNone } from '@vkontakte/icons'
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import React from 'react'
import { useState } from 'react';
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import {BACKEND_URL} from "../../requests";
import axios from 'axios';

const ButEvent = ({urState, link_to, setIsMember, eventId}) => {
    const [action, setAction] = useState(urState ? 'subscribe' : "unsubscribe")

    const doAction = e => {
        sendAction()
        setIsMember(!urState)
    }


    async function sendAction() {

        let action_to_send = !urState ? 'subscribe' : "unsubscribe"
        console.log(action_to_send)
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        let data = {
            action: action_to_send
        }
        await axios.put(`${BACKEND_URL}/meeting/${eventId}/action`,
            data, {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 201) {
                if (action === 'subscribe') {
                    setAction('unsubscribe')
                }
                else {
                    setAction('subscribe')
                }
            }
        });
    }


    return (
        <div>
            {!urState ?
            <Button size="l" level="2" onClick={doAction}>
                Принять участие
            </Button> : null}
            {link_to != null ? <Button size='l' level="2" onClick={() => {window.location = link_to}}>
                Открыть беседу
            </Button> : null}
            {urState ?
            <Button onClick={doAction} size='l' level="2" style={{ backgroundColor: "azure", color: "#000", borderWidth: '1px', borderColor: "#8A00EE" }}>
                Отказаться от участия
            </Button> : null}
        </div>
    )
};


export default ButEvent;