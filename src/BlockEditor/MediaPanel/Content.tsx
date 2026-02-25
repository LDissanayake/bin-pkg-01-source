import React, { useState, useEffect } from 'react';
import * as styles from './Content.module.css';
import { Button, Chip, Loader, ScrollArea } from '@mantine/core';
import { useEditorContext } from '../EditorContext';
import { fetchMedia } from '../../util/wpApi';
import { IconCheck, IconCheckbox, IconCloudDownload, IconRefresh } from '@tabler/icons-react';

type MediaItem = {
    id: number;
    title: {
        rendered: string;
    };
    media_details: {
        sizes: {
            thumbnail?: {
                source_url: string;
            };
        };
    };
    source_url: string;
    mime_type: string;
};

type MediaGalleryProps = {
    mediaType: string;
    refreshHash: number | null;
};

const Content: React.FC<MediaGalleryProps> = ({ mediaType, refreshHash }) => {
    const { panel } = useEditorContext();
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);


    const handleSelect = (value: string[]) => {
        if (panel?.data?.set) {
            panel.data.set(value)
        }
    }

    // Fetch media items
    const fetchMediaItems = async (reset: boolean = false) => {
        reset ? setLoading(true) : setLoadingMore(true);

        try {
            const currentPage = reset ? 1 : page;
            const response = await fetchMedia(mediaType, currentPage);
            const { data = [], totalPages } = response || {};

            if (Array.isArray(data)) {
                setMediaItems(reset ? [...data] : (prevItems) => [...prevItems, ...data]);
                setTotalPages(totalPages ? parseInt(totalPages) : 1);
                if (reset) setPage(1);
            } else {
                console.error('Invalid data format:', data);
                setMediaItems([]);
            }
        } catch (error) {
            console.error('Error fetching media:', error);
            setMediaItems([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setInitialLoad(true);
        }
    };

    // Load more media when page changes
    useEffect(() => {
        if (initialLoad && page > 1) {
            fetchMediaItems(false);
        }
    }, [page]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1); // Increment page to load more
        }
    };

    // Handle refresh or initial load
    const handleRefresh = () => {
        setMediaItems([]);
        setPage(1);
        fetchMediaItems(true);
    };

    useEffect(() => {
        if (initialLoad && refreshHash) {
            handleRefresh();
        }
    }, [refreshHash]);

    const renderPreview = (item: MediaItem) => {
        const { mime_type, media_details, source_url } = item;

        if (mime_type.startsWith('image')) {
            return (
                <img
                    src={media_details?.sizes?.thumbnail?.source_url || source_url}
                    alt={item.title.rendered}
                />
            );
        } else if (mime_type.startsWith('video')) {
            return (
                <video width="100%" controls>
                    <source src={source_url} type={mime_type} />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (mime_type.startsWith('audio')) {
            return (
                <audio controls>
                    <source src={source_url} type={mime_type} />
                    Your browser does not support the audio element.
                </audio>
            );
        }
        return null;
    };

    // Reusable loader component
    const renderLoader = (text: string, icon: React.ReactNode) => (
        <div className={styles.initLoadWrap}>
            <div className={styles.initLoad}>
                <div className={styles.rotate}>
                    {icon}
                </div>
                <span>{text}</span>
            </div>
        </div>
    );

    return (
        <div className={styles.wrap}>
            {loading && page === 1 && renderLoader('Syncing...', <IconRefresh style={{ width: '100px', height: '100px' }} stroke={0.2} />)}

            {!initialLoad ? (
                loadingMore
                    ? renderLoader('Syncing...', <IconRefresh style={{ width: '100px', height: '100px' }} stroke={0.2} />)
                    : (
                        <div className={styles.initLoad}>
                            <IconCloudDownload style={{ width: '100px', height: '100px' }} stroke={0.2} />
                            <Button variant="light" size="xs" onClick={() => fetchMediaItems(false)}>
                                {loadingMore ? <Loader color="blue" type="dots" /> : 'Load Files'}
                            </Button>
                        </div>
                    )
            ) : (
                <ScrollArea.Autosize mah="100%" type="never">
                    <div className={styles.mediaGrid}>
                        {mediaItems.map((item) => (
                            <div
                                key={item.id}
                                className={`${styles.mediaItem} 
                                    ${panel?.data?.selectedId == item.id && styles.mediaItemSelected}}`}
                                onClick={() => handleSelect([item.id.toString(), item.source_url, item.mime_type])}
                            >
                                {panel?.data?.selectedId == item.id &&
                                    <span className={styles.selectedMedia}>
                                        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </span>
                                }
                                {renderPreview(item)}
                            </div>
                        ))}
                    </div>
                    {page < totalPages && (
                        <div className={styles.loadmoreWrap}>
                            <Button
                                variant="light"
                                size="xs"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? <Loader color="blue" type="dots" /> : 'Load More'}
                            </Button>
                        </div>
                    )}
                </ScrollArea.Autosize>
            )}
        </div>
    );
};

export default Content;
