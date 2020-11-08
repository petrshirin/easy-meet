import React, {useState} from 'react';
import Icon28Place from '@vkontakte/icons/dist/28/place';

import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PopupUser from '../../components/popup_user/popup_user'

const MarkerMeet = ({go}) => {
    const [lat, setLat] = useState(55.75);
    const [lon, setLon] = useState(37.57);
    const [vis, setVis] = useState(-1);

    const setVS = e => {
      setVis(e.currentTarget.dataset.vs);
      console.log(vis);
    };

    return (
        <div>
            <Marker 
                style=""
                coordinates={{
                lng: lon, 
                lat: lat
                }}
                anchor="top"
                onClick={setVS}
                data-vs={vis * -1}
            ><Icon28Place fill="#8A00EE"/></Marker>
            <Popup
                coordinates={{
                lng: lon,
                lat: lat
                }}
                style={{
                visibility: (vis == -1 ? "hidden" : "visible")
                }}
            ><PopupUser go={go}/></Popup>
      </div>
    )
};

export default MarkerMeet;