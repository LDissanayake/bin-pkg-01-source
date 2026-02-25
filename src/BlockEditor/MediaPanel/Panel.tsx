import React, { useEffect, useState } from 'react';
import * as styles from './Panel.module.css';
import { ActionIcon, Divider, MantineTransition, Tooltip } from '@mantine/core';
import { IconMovie, IconPhoto, IconRefresh, IconVinyl } from '@tabler/icons-react';
import Content from './Content';
import { useEditorContext } from '../EditorContext';

const tooltipProps = {
    color: "blue",
    style: {
        fontSize: '10px'
    },
    transitionProps: {
        transition: 'pop' as MantineTransition,
        duration: 300
    }
}


function Panel() {
    const { panel } = useEditorContext();
    const [mediaType, setMediaType] = useState('image');

    const [refreshHash, setRefreshHash] = useState<null | number>(null);

    useEffect(() => {
        if (panel?.data?.mediaType) {
            setMediaType(panel.data.mediaType);
        }
    }, [panel]);

    const types = [
        { id: 'image', label: 'Images', icon: <IconPhoto style={{ width: '70%', height: '70%' }} stroke={1} /> },
        { id: 'video', label: 'Videos', icon: <IconMovie style={{ width: '70%', height: '70%' }} stroke={1} /> },
        { id: 'audio', label: 'Audios', icon: <IconVinyl style={{ width: '70%', height: '70%' }} stroke={1} /> },
    ]
    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                <div className={styles.titleColumn}>
                    Media Library
                </div>
                <div className={styles.titleColumn}>
                    {types.map(type => <Tooltip
                        key={type.id}
                        label={type.label}
                        {...tooltipProps}
                        disabled={
                            panel?.data?.mediaType && panel?.data?.mediaType !== type.id
                        }
                    >
                        <ActionIcon
                            variant={type.id === mediaType ? 'filled' : 'light'}
                            radius="xl"
                            aria-label={type.label}
                            onClick={() => setMediaType(type.id)}
                            disabled={
                                panel?.data?.mediaType && panel?.data?.mediaType !== type.id
                            }
                        >
                            {type.icon}
                        </ActionIcon>
                    </Tooltip>
                    )}
                    <Divider orientation="vertical" />
                    <Tooltip
                        label="Sync"
                        {...tooltipProps}
                    >
                        <ActionIcon
                            variant="transparent"
                            color="gray"
                            radius="xl"
                            aria-label="Sync"
                            mr={-8}
                            onClick={() => setRefreshHash(Date.now())}
                        >
                            <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1} />
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.content} data-show={mediaType === 'image'}>
                <Content mediaType='image' refreshHash={refreshHash} />
            </div>
            <div className={styles.content} data-show={mediaType === 'video'}>
                <Content mediaType='video' refreshHash={refreshHash} />
            </div>
            <div className={styles.content} data-show={mediaType === 'audio'}>
                <Content mediaType='audio' refreshHash={refreshHash} />
            </div>
        </div>
    )
}

export default Panel
