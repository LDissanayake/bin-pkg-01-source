import React, { useState, useEffect } from 'react';
import * as styles from './MediaContent.module.css';
import { Button, Loader, ScrollArea } from '@mantine/core';
import { fetchMedia } from '../../../util/wpApi';
import { IconCheck, IconCloudDownload, IconRefresh } from '@tabler/icons-react';

type MediaItem = {
  id: number;
  title: { rendered: string };
  media_details: { sizes: { thumbnail?: { source_url: string } } };
  source_url: string;
  mime_type: string;
};

interface MediaContentProps {
  mediaType: string;
  refreshHash: number | null;
  onSelect?: (selected: string[]) => void;
  selectedId?: number | null;
}

const MediaContent: React.FC<MediaContentProps> = ({
  mediaType,
  refreshHash,
  onSelect,
  selectedId = null,
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  const fetchMediaItems = async (reset = false) => {
    reset ? setLoading(true) : setLoadingMore(true);
    try {
      const currentPage = reset ? 1 : page;
      const response = await fetchMedia(mediaType, currentPage);
      const { data = [], totalPages } = response || {};

      if (Array.isArray(data)) {
        setMediaItems(reset ? [...data] : prev => [...prev, ...data]);
        setTotalPages(totalPages ? parseInt(totalPages) : 1);
        if (reset) setPage(1);
      } else {
        setMediaItems([]);
      }
    } catch (error) {
      setMediaItems([]);
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setInitialLoad(true);
    }
  };

  useEffect(() => {
    if (initialLoad && page > 1) {
      fetchMediaItems(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMediaItems(true);
  }, [refreshHash]);

  const handleLoadMore = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const handleSelect = (item: MediaItem) => {
    onSelect?.([item.id.toString(), item.source_url, item.mime_type]);
  };

  const renderPreview = (item: MediaItem) => {
    const { mime_type, media_details, source_url } = item;

    if (mime_type.startsWith('image')) {
      return (
        <img
          src={media_details?.sizes?.thumbnail?.source_url || source_url}
          alt={item.title.rendered}
        />
      );
    }
    if (mime_type.startsWith('video')) {
      return (
        <video width="100%" controls>
          <source src={source_url} type={mime_type} />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (mime_type.startsWith('audio')) {
      return (
        <audio controls>
          <source src={source_url} type={mime_type} />
          Your browser does not support the audio element.
        </audio>
      );
    }
    return null;
  };

  const renderLoader = (text: string, icon: React.ReactNode) => (
    <div className={styles.initLoadWrap}>
      <div className={styles.initLoad}>
        <div className={styles.rotate}>{icon}</div>
        <span>{text}</span>
      </div>
    </div>
  );

  return (
    <div className={styles.wrap}>
      {loading && page === 1 && renderLoader('Syncing...', <IconRefresh style={{ width: 100, height: 100 }} stroke={0.2} />)}

      {!initialLoad ? (
        loadingMore ? (
          renderLoader('Syncing...', <IconRefresh style={{ width: 100, height: 100 }} stroke={0.2} />)
        ) : (
          <div className={styles.initLoad}>
            <IconCloudDownload style={{ width: 100, height: 100 }} stroke={0.2} />
            <Button variant="light" size="xs" onClick={() => fetchMediaItems(false)}>
              Load Files
            </Button>
          </div>
        )
      ) : (
        <ScrollArea.Autosize mah="100%" type="never">
          <div className={styles.mediaGrid}>
            {mediaItems.map(item => (
              <div
                key={item.id}
                className={`${styles.mediaItem} ${
                  selectedId === item.id ? styles.mediaItemSelected : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                {selectedId === item.id && (
                  <span className={styles.selectedMedia}>
                    <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </span>
                )}
                {renderPreview(item)}
              </div>
            ))}
          </div>

          {page < totalPages && (
            <div className={styles.loadmoreWrap}>
              <Button variant="light" size="xs" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? <Loader color="blue" type="dots" /> : 'Load More'}
              </Button>
            </div>
          )}
        </ScrollArea.Autosize>
      )}
    </div>
  );
};

export default MediaContent;
