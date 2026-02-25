import React, { useEffect, useMemo, useState } from 'react';
import * as styles from './Publish.module.css';
import { ActionIcon, LoadingOverlay, Popover, UnstyledButton } from '@mantine/core';
import { Block, useEditorContext } from '../EditorContext';
import genBlockData, { removeDatafromBlocks } from '../util/blockDataUtils';
import { IconUpload, IconWorldUpload } from '@tabler/icons-react';
import { extractBlockTree } from '../util/blockTreeUtils';
import { publishSiteTemplate } from '../../util/wpApi';
import { cloneDeep } from 'lodash';
import generateStyleData from '../../Render/core/generateStyleData';
import generateSSRStyle from '../util/generateSSRStyle';
import { DotsHorizontalIcon, MixIcon } from '@radix-ui/react-icons';
import { FrameIcon } from '../components/ToolBarIcons';
import ServerSideRender from '../../RenderEngine/ServerSideRender';


function Publish() {

    const { pageBlocks, editingDesignId, handleSave, publishHash } = useEditorContext();

    const [publishing, setPublishing] = useState(false);
    const [hash, setHash] = useState(Date.now());

    const root = pageBlocks.current.get('root');

    useEffect(() => {
        if (root) { genBlockData(root) }
    }, []);

    const activeDesign = root?.data?.options?.ad?.value === editingDesignId;

    const designBlock = pageBlocks.current.get(editingDesignId as string);
    const designOptions = designBlock?.data?.options;
    const assetId = designOptions?.assid?.value;

    const dirtyFrames = designOptions?.tp?.value || {};

    const count = useMemo(() => {
        return Object.values(dirtyFrames).filter(v => v === true).length;
    }, [dirtyFrames, publishHash]);


    // const handlePublish = (type: 'g' | 'fr', usefor: string, id: string, is_part:boolean) => {
    //     setPublishing(true);

    //     let publishBlock = {
    //         template_id: usefor,
    //         template_data: {},
    //         is_part
    //     }

    //     if (type === 'g') {
    //         const designAssetsBlocks: { [key: string]: Block } = cloneDeep(extractBlockTree(pageBlocks.current, assetId));

    //         removeDatafromBlocks(designAssetsBlocks);

    //         const styleData = generateStyleData({ assetId, pageBlocks });
    //         const styleSSR = generateSSRStyle(styleData);

    //         publishBlock.template_data = {
    //             designId: editingDesignId,
    //             assetId,
    //             blocks: designAssetsBlocks,
    //             ...styleSSR
    //         }
    //     } else {
    //         const blocks: { [key: string]: Block } = cloneDeep(extractBlockTree(pageBlocks.current, id));
    //         removeDatafromBlocks(blocks);
    //         publishBlock.template_data = {
    //             blocks,
    //             frameId: id
    //         };
    //     }

    //     publishSiteTemplate(clientAPI as string, authToken as string, publishBlock)
    //         .then(response => {
    //             if (response) {
    //                 if (designOptions?.tp?.value) {
    //                     designOptions.tp.value[id] = false;
    //                 }
    //             }

    //             setPublishing(false);
    //             setHash(Date.now());

    //             handleSave();

    //         })
    //         .catch(error => {
    //             console.error('Error loading style data:', error);
    //             setPublishing(false);
    //             setHash(Date.now());
    //         });
    // }


    const handlePublish = async (
        type: 'g' | 'fr',
        usefor: string,
        id: string,
        is_part: boolean
    ) => {
        try {
            setPublishing(true);

            let publishBlock: {
                template_id: string,
                template_data: { [key: string]: any },
                is_part: boolean
            }
                = {
                template_id: usefor,
                template_data: {},
                is_part,
            };

            // =========================
            // GLOBAL / ASSETS PUBLISH
            // =========================
            if (type === 'g') {
                const designAssetsBlocks: { [key: string]: Block } = cloneDeep(
                    extractBlockTree(pageBlocks.current, assetId)
                );

                const assetsBlock = pageBlocks.current.get(assetId) as Block;

                genBlockData(assetsBlock);

                const options = assetsBlock.data?.options?.default?.value;

                removeDatafromBlocks(designAssetsBlocks);

                const styleData = generateStyleData({ assetId, pageBlocks });
                const styleSSR = generateSSRStyle(styleData, false);

                publishBlock.template_data = {
                    designId: editingDesignId,
                    assetId,
                    blocks: designAssetsBlocks,
                    ...styleSSR,
                    defaultColorMode: options?.tcmd || 'l',
                    fontVersion: assetsBlock.data?.options?.lfu?.value || 1
                };

                // =========================
                // FRAME / PAGE TEMPLATE
                // =========================
            } else {
                const blocks: { [key: string]: Block } = cloneDeep(
                    extractBlockTree(pageBlocks.current, id)
                );

                const assetsBlock = pageBlocks.current.get(assetId) as Block;

                genBlockData(assetsBlock);

                const options = assetsBlock.data?.options?.default?.value;

                const minBlocks = removeDatafromBlocks(blocks);

                // OPTIONAL: Server-side render (async)
                const ssr = await ServerSideRender({
                    pageStructure: {
                        frameId: id,
                        designId: editingDesignId as string,
                        blocks,
                    },
                    colorMode: options?.tcmd || 'l',
                    type: '',
                    settingsData: {},
                    styleData: {},
                });

                publishBlock.template_data = {
                    blocks: minBlocks,
                    frameId: id,
                    ssr, // attach when ready
                };

                // Frame not a part then check header and footer and save that data
                if (!is_part) {

                    publishBlock.template_data.template_parts = {}

                    const frame = pageBlocks.current.get(id);
                    const options = frame?.data?.options;
                    const template_header = options?.th?.value;
                    const template_footer = options?.tf?.value;

                    if (template_header) {
                        publishBlock.template_data.template_parts.headerId = template_header;
                    }

                    if (template_footer) {
                        publishBlock.template_data.template_parts.footerId = template_footer;
                    }
                }

            }

            // =========================
            // SAVE TO WP
            // =========================
            const response = await publishSiteTemplate(publishBlock);

            if (response && designOptions?.tp?.value) {
                designOptions.tp.value[id] = false;
            }

            setHash(Date.now());
            handleSave();

        } catch (error) {
            console.error('Error publishing template:', error);
        } finally {
            setPublishing(false);
        }
    };



    const getLabel = (id: string) => {
        const block = pageBlocks.current.get(id) as Block;
        return block?.l || 'Frame'
    }

    const templateLabels: { [key: string]: string } = {
        'home': 'Home',
        'posts': 'Posts'
    }

    const is_part = (id: string) => {
        const block = pageBlocks.current.get(id) as Block;
        const templateType = block.data?.options?.type?.value;
        return templateType !== 'page';
    }

    return (
        <>
            <Popover key={hash} width={280} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <UnstyledButton
                        className={styles.action}
                        disabled={!activeDesign || !count}
                    >
                        <IconWorldUpload stroke={1.6} size={18} />
                        {count && !publishing ? <span className={styles.chip}>{count}</span> : ''}
                        {publishing ? <span className={styles.chip}><DotsHorizontalIcon /></span> : ''}
                    </UnstyledButton>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className={styles.list}>
                        {
                            (dirtyFrames[assetId]) &&
                            <div className={styles.list_item}>
                                <div className={styles.list_item_col}>
                                    <div className={styles.list_item_title}>
                                        Design Assets
                                        <div className={styles.list_item_title_label}>
                                            Global
                                            <MixIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.list_item_col} data-right>
                                    <ActionIcon
                                        radius="md"
                                        size='sm'
                                        onClick={() => handlePublish('g', '__global', assetId, false)}
                                    >
                                        <IconUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                </div>
                            </div>
                        }
                        {
                            Object.keys(dirtyFrames).map(id => {
                                if (id === assetId || !dirtyFrames[id]) { return '' }

                                // const frame = pageBlocks.current.get(id)?.ll || 'Frame';
                                const usefor = pageBlocks.current.get(id)?.data?.options?.usefor?.value;

                                return <div className={styles.list_item} key={id}>
                                    <div className={styles.list_item_col}>
                                        <div className={styles.list_item_title}>
                                            {templateLabels[usefor]}
                                            <div className={styles.list_item_title_label}>
                                                <FrameIcon />
                                                {getLabel(id)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.list_item_col} data-right>
                                        <ActionIcon
                                            radius="md"
                                            size='sm'
                                            onClick={() => handlePublish('fr', usefor || id, id, is_part(id))}
                                        >
                                            <IconUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </div>
                                </div>
                            }
                            )
                        }
                    </div>
                    <LoadingOverlay visible={publishing} zIndex={1000} loaderProps={{ type: 'bars' }} />
                </Popover.Dropdown>
            </Popover>
        </>
    )
}

export default Publish
