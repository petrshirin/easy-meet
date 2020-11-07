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

const ToolBar = ({ activeWin, go }) => (
    <Epic activeStory={activeWin} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={go}
            data-to="events"
            selected={activeWin === 'events'}
          >{(activeWin === 'events' || activeWin === 'event' || activeWin === 'createEvent') ? <Icon28Users3Outline fill="#eb1e23"/> : <Icon28Users3Outline fill="#000"/>}</TabbarItem>
          <TabbarItem
            onClick={go}
            selected={activeWin === 'persik'}
            data-to="persik"
          >{activeWin === 'persik' ? <Icon28SafariOutline fill="#eb1e23"/> : <Icon28SafariOutline fill="#000"/>}</TabbarItem>
          <TabbarItem
            onClick={go}
            selected={activeWin === 'home'}
            data-to="home"
          >{activeWin === 'home' ? <Icon24HelpOutline fill="#eb1e23"/> : <Icon24HelpOutline fill="#000"/>}</TabbarItem>
          <TabbarItem
            onClick={go}
            selected={activeWin === 'persik'}
            data-to="persik"
          >{activeWin === 'persik' ? <Icon28UserOutline fill="#eb1e23"/> : <Icon28UserOutline fill="#000"/>}</TabbarItem>
        </Tabbar>
        
      }></Epic>
);

ToolBar.props = {

}

export default ToolBar;