import React, { useEffect, useRef, useState } from 'react'
import { useEditorContext } from '../EditorContext';
import generateStyleData from '../../Render/core/generateStyleData';
import generateSSRStyle from '../util/generateSSRStyle';

function PreviewCanvas({ loaded }:
    { loaded?: (loaded: boolean) => void }) {
    const {
        colorMode,
        refreshCanvas,
        page,
        pageBlocks,
        preview,
        editingDesignId
    } = useEditorContext();

    const iframeRef = useRef(null);
    const [iframeMounted, setIframeMounted] = useState<null | number>(null);

    useEffect(() => {
        if (iframeMounted && loaded) {
            loaded(true);
        }
    }, [iframeMounted])


    const handleMessage = (event: MessageEvent) => {
        // Handle the received message here.
        const message = event.data;

        const frame = iframeRef.current;
        const iframeWindow = (frame as HTMLIFrameElement | null)?.contentWindow;

        if (message.mounted) {
            if (iframeWindow) {
                setIframeMounted(Date.now());
            }
        }

    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);


    useEffect(() => {
        const frame = iframeRef.current;
        const iframeWindow = (frame as HTMLIFrameElement | null)?.contentWindow;
        if (iframeWindow) {

            const designBlock = pageBlocks.current.get(editingDesignId as string);
            const designOptions = designBlock?.data?.options;
            const assetId = designOptions?.assid?.value;

            const styleData = generateStyleData({ assetId, pageBlocks });
            const styleSSR = generateSSRStyle(styleData);

            iframeWindow.postMessage({
                colorMode: 'd',
                page,
                pageBlocks,
                frameId: preview,
                designId: editingDesignId,
                styleHTML: `${styleSSR.cssHTML} ${styleSSR.fontHTML}`
            }, '*');
        }
    }, [
        iframeMounted,
        page
    ]);

    const url = '/__addifect/studio/site-canvas/?addifect-mode=editor-canvas&p=true' 

    return (
        <iframe
            ref={iframeRef}
            key={refreshCanvas}
            id="previewCanvas"
            title="Addifect Canvas"
            style={{
                width: '100%',
                height: '100%',
                border: 0,
                background: '#fff',
            }}
            src={url}
        ></iframe>
    )

}

export default PreviewCanvas
