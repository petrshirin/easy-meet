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
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="map">{<Icon24Back fill="#000"/>}</PanelHeaderButton>}>
            {`${fetchedUser.first_name} ${fetchedUser.second_name}`}
        </PanelHeader>
        <RichCell 
        disabled
        multiline
        before={<Avatar size={120} src={fetchedUser.avatar}/>}>
        <div>{`${fetchedUser.first_name} ${fetchedUser.second_name}`}</div>
        <div><text>{fetchedUser.score}</text></div>
        </RichCell>
        {fetchedUser.interests.map((item) => (
            <Interests name = {item.name}/>
        ))}
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