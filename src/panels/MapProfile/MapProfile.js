import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { Banner, RichCell, Fragment } from '@vkontakte/vkui';
import './MapProfile.css';
import Interests from '../../components/interests/interests';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const MapProfile = ({ id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="map">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}></PanelHeader>
        <RichCell 
        disabled
        multiline
        before={<Avatar size={120} src={fetchedUser.photo_200}></Avatar>}>
        <div>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</div>
        <div><text>5.0</text></div>
        </RichCell>
        <Interests name = "Иностранные языки"></Interests>
        <Interests name = "ЕГЭ и ОГЭ"></Interests>
        <div className = "ico">
    </div>

    </Panel>
);

MapProfile.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};


export default MapProfile;