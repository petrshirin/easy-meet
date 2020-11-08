import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import MarkerMeet from '../../components/markerMeet/markerMeet';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoianVsaWFzaHZhcnRzYmVyZyIsImEiOiJja2g3cHI1dmMwNnAyMnNuc2w5N3ByNnE1In0.N0jjx4ER6NWNKghAc-OMCQ'
});


const MapMeet = ({ id, go }) => {
    const [lat, setLat] = useState(55.75);
    const [lon, setLon] = useState(37.57);

  return (
    <Panel id={id} className="centerHeader">
    <PanelHeader>Карта</PanelHeader>
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '600px',
        width: '400px'
      }}
      center={{ 
        lng: lon, 
        lat: lat
      }}
    >
    <MarkerMeet go={go}/>
    </Map>
    </Panel>
  );
};

export default MapMeet