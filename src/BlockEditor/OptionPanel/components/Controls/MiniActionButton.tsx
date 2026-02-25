import React from 'react';
import * as styles from './MiniActionButton.module.css';
import {UnstyledButton} from '@mantine/core';

function MiniActionButton(
    {
        icon,
        onClick
    }: {
        icon: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>,
        onClick: () => void,
    }
) {
    return (
        <UnstyledButton className={styles.wrap} onClick={onClick}>{icon}</UnstyledButton>
    )
}

export default MiniActionButton
