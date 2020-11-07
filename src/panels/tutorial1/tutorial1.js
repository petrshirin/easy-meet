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
import { Banner, RichCell, Fragment, Gallery} from '@vkontakte/vkui';
import {CardGrid, Card} from '@vkontakte/vkui';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import '../tutcss/tutcss.css';
import Interests from '../../components/interests/interests'
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CheckBox from '../../components/checkBox/checkBox'
import tut1 from '../../img/1_copy.svg';
import tut2 from '../../img/2_copy.svg';
import tut3 from '../../img/3_copy.svg';

const Tutorial1 = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader>EasyMeet</PanelHeader>
        {/* <img className = "ttt" src = {tut1}></img> */}
        <Group>
              <Gallery
                slideWidth="100%"
                style = {{height: '100%'}}
                bullets="dark">
                    <div>
                      <img className = "ttt" src = {tut1}></img>
                      <div className = "bold"><text>Узнавай о мероприятиях и создавай свои</text></div>
                    </div>
                    <div>
                      <img className = "ttt" src = {tut2}></img>
                      <div className = "bold"><text>Ищи новых друзей</text></div>
                    </div>
                    <div>
                      <img className = "ttt" src = {tut3}></img>
                      <div className = "bold"><text>Задавай вопросы</text></div>
                      <div className = "bold"><text>отвечай на чужие</text></div>
                      <div className = "bold"><text>оценивай ответы</text></div>
                    </div>
              </Gallery>
        </Group>
        <div className = "aue"><Button size="l"  onClick={go} data-to="registration">Пропустить</Button></div>
    </Panel>
);

Tutorial1.propTypes = {
    id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};


export default Tutorial1; 