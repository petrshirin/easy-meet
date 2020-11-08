import React, {useState} from 'react';
import Icon28Place from '@vkontakte/icons/dist/28/place';

import ReactMapboxGl, {Marker, Popup} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PopupUser from '../../components/popup_user/popup_user'

const MarkerMeet = ({go, userInfo, self}) => {
    const [vis, setVis] = useState(-1);

    const setVS = e => {
        setVis(e.currentTarget.dataset.vs);
    };

    return (
        <div>
            <Marker
                style=""
                coordinates={{
                    lng: userInfo.longitude,
                    lat: userInfo.latitude
                }}
                anchor="top"
                onClick={setVS}
                data-vs={vis * -1}
            ><Icon28Place fill={self ? "#8A00EE" : "#eb1e23"}/></Marker>
            <Popup
                coordinates={{
                    lng: userInfo.longitude,
                    lat: userInfo.latitude
                }}
                style={{
                    visibility: (vis === -1 ? "hidden" : "visible")
                }}

            ><PopupUser go={go}
                        userName={`${userInfo.first_name} ${userInfo.second_name}`}
                        avatar={userInfo.avatar} userUrl={userInfo.user_url}/>
            </Popup>
        </div>
    )
};

export default MarkerMeet;