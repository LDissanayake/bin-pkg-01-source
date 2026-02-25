import React from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { CardStackIcon, TextIcon } from '@radix-ui/react-icons';

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Entry Wrap',
    icon: <CardStackIcon />,
    cats: ['template',],
    type: 'entryWrap',
    children: true,
    rootAllow: false,
    userData: {},
    childCats: ['entry'],
    designSections: [],
    options: {
        general: {
            label: 'General',
            actions: true,
            order: ['entriesSource'],
            properties: {
                entriesSource: { //  type
                    label: 'Entries Source',
                    controlType: 'entriesSource',
                    lock: true,
                    inputData: {},
                    responsive: false,
                    colorMode: false,
                    rt: 'full',
                    data: {
                        vs: 'm',
                        value: {
                            type: 'post',
                            source: 'query',
                            nop: 12,
                            orderBy: 'date',
                            order: 'DESC',
                            pagination: false
                        },
                    },
                },
            }
        },
    },
    props: {
        design: {},
        animation: {},
        variants: [],
        options: {
            entriesSource: {
                vs: 'm',
                value: {
                    type: 'post',
                    source: 'query',
                    nop: 12,
                    orderBy: 'date',
                    order: 'DESC',
                    pagination: false
                }
            },
        },
        mode: 'w',
    },
};

// Create a new block instance
const entryWrap = new Block(blockConfig);

export default entryWrap;