import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ToolBar from '../../components/toolbar/toolbar'
import SelectTool from '../../components/selecttool/selecttool'
import Zvezda from '../../components/zvezda/zvezda'
import Answer from '../../components/answer/answer'
import { Banner } from '@vkontakte/vkui';
import { WriteBar, WriteBarIcon } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon24ChevronLeft from '@vkontakte/icons/dist/24/chevron_left';
import './Vopros.css';
import { useState, useEffect, useRef, Fragment } from 'react';



const Vopros = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Вопрос</PanelHeader>
            <div>
                <text>Автор</text>
            </div>
            <div>
                <text>Вопрос такой то</text>
            </div>
          <Group>
          <WriteBar
            after={
              <Fragment>
                <WriteBarIcon>
                    <Icon28Send fill='#8a00ee' onClick={go} data-to="vopros"/>
                </WriteBarIcon>
              </Fragment>
            }
            placeholder="Ответ"
          />
        </Group>
        <Zvezda autor = "yulia" otv = "otvet takoi to"></Zvezda>
        <Zvezda autor = "kotya" otv = "sila v dengah, brat"></Zvezda>
        <div className = "back">
          <Icon24ChevronLeft onClick={go} data-to="tolking"></Icon24ChevronLeft>
        </div>
	</Panel>
);
Vopros.propTypes = {
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

export default Vopros;
