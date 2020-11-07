import { Select } from '@vkontakte/vkui';
import React from 'react';
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


const SelectTool = ({setPart}) => (
    <Select className = "sell" placeholder="Тема" onChange={(e) => setPart(e.target.value)}>
        <option value="foreign">Иностранные языки</option>
        <option value="design">Дизайн и творчество</option>
        <option value="ege">ЕГЭ и ОГЭ</option>
        <option value="rbt">Робототехника</option>
        <option value="proga">Программирование</option>
        <option value="photo">Фотография</option>
        <option value="supp">Техподдержка</option>
    </Select>
);

SelectTool.props = {

}

export default SelectTool;