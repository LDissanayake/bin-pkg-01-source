import React, { useState } from 'react';
import * as styles from './MediaPicker.module.css';
import { ActionIcon, Divider, MantineTransition, Tooltip } from '@mantine/core';
import { IconMovie, IconPhoto, IconRefresh, IconVinyl, IconX } from '@tabler/icons-react';
import MediaContent from './MediaContent';

const tooltipProps = {
    color: "blue",
    style: { fontSize: '10px' },
    transitionProps: {
        transition: 'pop' as MantineTransition,
        duration: 300,
    },
};

type MediaType = 'image' | 'video' | 'audio';

interface MediaPickerProps {
    defaultMediaType?: MediaType;
    onSelect?: (selected: string[]) => void;
    selectedId?: number | null;
    close?: () => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({
    defaultMediaType = 'image',
    onSelect,
    selectedId = null,
    close
}) => {
    const [mediaType, setMediaType] = useState<MediaType>(defaultMediaType);
    const [refreshHash, setRefreshHash] = useState<number | null>(null);
    

    const types = [
        { id: 'image', label: 'Images', icon: <IconPhoto style={{ width: '70%', height: '70%' }} stroke={1} /> },
        { id: 'video', label: 'Videos', icon: <IconMovie style={{ width: '70%', height: '70%' }} stroke={1} /> },
        { id: 'audio', label: 'Audios', icon: <IconVinyl style={{ width: '70%', height: '70%' }} stroke={1} /> },
    ];

    const handleSelect = (value: string[]) => {
        if (onSelect) onSelect(value);
    };

    return (
                <div className={styles.wrap}>
                    <div className={styles.title}>
                        {/* <div className={styles.titleColumn}>Media Library</div> */}
                        <div className={styles.titleColumn}>
                            {/* {types.map(type => (
            <Tooltip
              key={type.id}
              label={type.label}
              {...tooltipProps}
              disabled={mediaType !== type.id}
            >
              <ActionIcon
                variant={type.id === mediaType ? 'filled' : 'light'}
                radius="xl"
                aria-label={type.label}
                onClick={() => setMediaType(type.id as MediaType)}
              >
                {type.icon}
              </ActionIcon>
            </Tooltip>
          ))}
          <Divider orientation="vertical" /> */}
                            <Tooltip label="Sync" {...tooltipProps}>
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
                                <ActionIcon
                                    variant="transparent"
                                    color="gray"
                                    radius="xl"
                                    aria-label="Sync"
                                    mr={-8}
                                    onClick={close}
                                >
                                    <IconX style={{ width: '70%', height: '70%' }} stroke={1} />
                                </ActionIcon>
                        </div>
                    </div>

                    <div className={styles.content} data-show={mediaType === 'image'}>
                        <MediaContent
                            mediaType="image"
                            refreshHash={refreshHash}
                            onSelect={handleSelect}
                            selectedId={selectedId}
                        />
                    </div>
                    <div className={styles.content} data-show={mediaType === 'video'}>
                        <MediaContent
                            mediaType="video"
                            refreshHash={refreshHash}
                            onSelect={handleSelect}
                            selectedId={selectedId}
                        />
                    </div>
                    <div className={styles.content} data-show={mediaType === 'audio'}>
                        <MediaContent
                            mediaType="audio"
                            refreshHash={refreshHash}
                            onSelect={handleSelect}
                            selectedId={selectedId}
                        />
                    </div>
                </div>
    );
};

export default MediaPicker;
