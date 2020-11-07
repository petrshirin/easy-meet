import React from 'react';
import PropTypes from 'prop-types';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Icon28SafariOutline from '@vkontakte/icons/dist/28/safari_outline';
import { Div } from '@vkontakte/vkui';
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import Icon24HelpOutline from '@vkontakte/icons/dist/24/help_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import { Banner } from '@vkontakte/vkui';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon20MessageOutline from '@vkontakte/icons/dist/20/message_outline';
import BannerText from '../textbanner/textbanner'
import './answer.css';

const Answer = ({go, head, subhead, ans, but, fetchedUser}) => (

<Banner className = "ans"
    header= {head}
    subheader= {subhead}    
    text = {<BannerText answ = {ans}/>}
    actions = {but}
  />

);

Answer.propTypes = {
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

export default Answer;