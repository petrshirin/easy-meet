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


const MapMeet = ({id, go, setActivePanel}) => {
    const [lat, setLat] = useState(55.75);
    const [lon, setLon] = useState(37.57);
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
            "first_name": "Имя",
            "second_name": "Фамилия",
            "avatar": null,
            "user_url": null,
            "latitude": "55.750000000000",
            "longitude": "37.570000000000"
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
        console.log(data)
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
                <MarkerMeet go={go} userInfo={selfPosition} self={true}/>
                {markers.map((item) => (<MarkerMeet go={go} userInfo={item}/>))}

            </Map>
        </Panel>
    );
};

export default MapMeet