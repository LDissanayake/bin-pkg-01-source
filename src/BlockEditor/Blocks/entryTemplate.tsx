import React from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { CardStackIcon, TextIcon } from '@radix-ui/react-icons';

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Entry Template',
    icon: <CardStackIcon />,
    cats: ['entry'],
    type: 'entryTemplate',
    children: true,
    rootAllow: false,
    userData: {},
    childCats: ['basic', 'layout'],
    designSections: [],
    options: {
        displayCondition: {
            label: 'Display Condition',
            actions: true,
            order: ['type', 'match', 'every', 'offset', 'index'],
            properties: {
                type: {
                    label: 'Condition Type',
                    controlType: 'segment',
                    lock: true,
                    rt: 'full',
                    inputData: {
                        data: [
                            { label: 'Basic', value: 'basic' },
                            { label: 'Pattern', value: 'pattern' },
                            { label: 'Single', value: 'single' }
                        ]
                    },
                    condition: {
                        type: 'if',
                        all: ['match', 'every', 'offset', 'single', 'index'],
                        basic: ['match'],
                        pattern: ['every', 'offset'],
                        single: ['index']
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 'basic',
                    },
                },
                match: {
                    label: 'Match',
                    controlType: 'select',
                    lock: true,
                    inputData: {
                        data: [
                            { label: "All", value: "all" },
                            { label: "First", value: "first" },
                            { label: "Last", value: "last" },
                            { label: "Odd", value: "odd" },
                            { label: "Even", value: "even" }
                        ],
                        input: {
                            allowDeselect: true
                        }
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: null,
                    },
                },
                every: {
                    label: 'Every',
                    controlType: 'number',
                    lock: true,
                    inputData: {
                        input: {
                            negative: false,
                        },
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: null,
                    },
                },
                offset: {
                    label: 'Start From (Offset)',
                    controlType: 'number',
                    lock: true,
                    inputData: {
                        input: {
                            negative: false,
                        },
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 0,
                    },
                },
                index: {
                    label: 'Index',
                    controlType: 'number',
                    lock: true,
                    inputData: {
                        input: {
                            negative: false,
                            min: 1
                        },
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 1,
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
            type: {
                vs: 'm',
                value: 'basic'
            },
            match: {
                vs: 'm',
                value: null
            },
        },
        mode: 'w',
    },
};

// Create a new block instance
const entryWrap = new Block(blockConfig);

export default entryWrap;