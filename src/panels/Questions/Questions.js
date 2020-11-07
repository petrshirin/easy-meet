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
import Answer from '../../components/answer/answer'
import { Banner } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
import Icon24ChevronLeft from '@vkontakte/icons/dist/24/chevron_left';
import './Questions.css';

const Questions = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Задать вопрос</PanelHeader>
            <FormLayout>
                <FormLayoutGroup top="Ваш вопрос">
                    <Input type="text"/>
                    <SelectTool></SelectTool>
                    <div className = "aue"><Button size="l"  onClick={go} data-to="tolking">Задать вопрос</Button></div>
                </FormLayoutGroup>
            </FormLayout>
			<div className = "back">
          		<Icon24ChevronLeft onClick={go} data-to="tolking"></Icon24ChevronLeft>
			</div>
	</Panel>
);

Questions.propTypes = {
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

export default Questions;
