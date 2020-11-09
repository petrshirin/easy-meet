import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import ReactMapboxGl, {Layer, Feature, Marker, Popup} from 'react-mapbox-gl';
import MarkerMeet from '../../components/markerMeet/markerMeet';
import 'mapbox-gl/dist/mapbox-gl.css';
import bridge from "@vkontakte/vk-bridge";
import {USER_DATA_STORAGE_KEY} from "../../redux/reducers/store";
import axios from "axios";
import "./map.css";
import {BACKEND_URL} from "../../requests";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoianVsaWFzaHZhcnRzYmVyZyIsImEiOiJja2g3cHI1dmMwNnAyMnNuc2w5N3ByNnE1In0.N0jjx4ER6NWNKghAc-OMCQ'
});


const MapMeet = ({id, go, setActivePanel, setProfilerUser}) => {
    const [lat, setLat] = useState(52.287054);
    const [lon, setLon] = useState(104.281047);
    const [selfPosition, setPosition] = useState({
        "first_name": "Имя",
        "second_name": "Фамилия",
        "avatar": null,
        "user_url": null,
        "latitude": "55.750000000000",
        "longitude": "37.570000000000"
    });
    const [markers, setMarkers] = useState([
        {
            "id": 9,
            "first_name": "Петр",
            "second_name": "Ширин",
            "avatar": "https://sun4-16.userapi.com/impf/c851420/v851420053/fbe04/7GHWNgcRBWA.jpg?size=200x0&quality=96&crop=1,40,1197,1197&sign=89bc2d03c563da16f8170f746313d98b&ava=1",
            "user_url": "https://vk.com/id140227524",
            "interests": [
                {
                    "id": 2,
                    "name": "Дизайн и творчество"
                }
            ],
            "latitude": "55.030197143555",
            "longitude": "82.920433044434",
            "score": 5.0
        }
    ]);


    useEffect(() => {
        loadUserGeo()
        loadMarkerMeets()
    }, [])
    async function loadUserGeo() {
        const userGeo = await bridge.send("VKWebAppGetGeodata")
        console.log(userGeo)
        if (!userGeo.available) {
            setActivePanel('events')
        }
        let data = {
            latitude: userGeo.lat,
            longitude: userGeo.long,
        }
        sendUserGeo(data)
        setLat(data.latitude)
        setLon(data.longitude)
    }

    async function sendUserGeo(data) {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.post(`${BACKEND_URL}/user/position/update`,
            data, {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 201) {
                setPosition(resp.data.data)
            }
        });
    }

    async function loadMarkerMeets() {
        let userToken = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY));
        await axios.get(`${BACKEND_URL}/user/position/`,
            {
                headers: {
                    'Authorization': `Token ${userToken.token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        ).then((resp) => {
            if (resp.status === 200) {
                setMarkers(resp.data.data)
                console.log(resp.data.data)
            }
        });
    }

    return (
        <Panel id={id} className="centerHeader">
            <PanelHeader><div className = "kol">Карта</div></PanelHeader>
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '600px',
                    width: '400px'
                }}
                center={[lon, lat]}
            >
                <MarkerMeet go={go} userInfo={selfPosition} self={true} setProfilerUser={setProfilerUser}/>
                {markers.map((item) => (<MarkerMeet go={go} userInfo={item} setProfilerUser={setProfilerUser}/>))}

            </Map>
        </Panel>
    );
};

export default MapMeet