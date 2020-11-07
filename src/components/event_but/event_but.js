import { Icon24VideoFillNone } from '@vkontakte/icons'
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import React from 'react'
import { useState } from 'react';

const ButEvent = () => {
    const [urState, setState] = useState('known');
    const [link_to, setList] = useState(null);

    return (
        <div>
            {urState == "unknown" ?
            <Button size="l" level="2" >
                Принять участие
            </Button> : null}
            {link_to != null ? <Button size='l' level="2">
                Открыть беседу
            </Button> : null}
            {urState === "known" ? 
            <Button size='l' level="2" style={{ backgroundColor: "azure", color: "#000", borderWirth: '1px', borderColor: "#8A00EE" }}>
                Отказаться от участия
            </Button> : null}
        </div>
    )
};


export default ButEvent;