import React from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { TextIcon } from '@radix-ui/react-icons';
import { CenterToEdgeIcon, DiagonalLBTRIcon, DiagonalLTRBIcon, DiagonalRBTLIcon, DiagonalRTLBIcon, EdgeToCenterIcon, LeftToRightIcon, RadialBottomToTopIcon, RadialLeftToRightIcon, RadialRightToLeftIcon, RadialTopToBottomIcon, ReadingOrderLR_BTIcon, ReadingOrderLR_TBIcon, ReadingOrderRL_BTIcon, ReadingOrderRL_TBIcon, RightToLeftIcon } from '../../backup/BlockEditor/OptionPanel/components/MotionIcons';

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Label Text',
    icon: <TextIcon />,
    cats: ['basic'],
    type: 'labelText',
    children: false,
    rootAllow: false,
    userData: {},
    childCats: [],
    designSections: ['position', 'typography', 'transform', 'visibility'],
    options: {
        general: {
            label: 'General',
            actions: true,
            order: ['content', 'link', 'tag'],
            properties: {
                content: { // content
                    label: 'Content',
                    controlType: 'richText',
                    lock: true,
                    rt: 'full',
                    postData: {
                        postFields: [
                            {
                                value: 'title',
                                label: 'Title'
                            },
                            {
                                value: 'content',
                                label: 'Content'
                            },
                            {
                                value: 'author',
                                label: 'Author'
                            },
                            {
                                value: 'date',
                                label: 'Date'
                            }
                        ],
                    },
                    inputData: {
                        placeholder: 'Type here',
                        autosize: true
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: '',
                    },
                },
                link: {
                    label: 'link',
                    controlType: 'text',
                    rt: 'full',
                    postData: {
                        postFields: [
                            {
                                value: 'post-link',
                                label: 'Post Link'
                            },
                        ],
                    },
                    inputData: {
                        placeholder: 'Type here',
                        autosize: true
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: '',
                    },
                },
            }
        },
        TAC: {
            label: 'Text Motion',
            actions: true,
            order: ['txtsm', 'clw', 'std', 'sts'],
            properties: {
                txtsm: {
                    label: 'Split by',
                    controlType: 'select',
                    lock: true,
                    inputData: {
                        data: [
                            { label: 'Letter', value: 'c' },
                            { label: 'Word', value: 'w' },
                            { label: 'Lines', value: 'l' },
                        ],
                        allowDeselect: false
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 'w',
                    },
                },
                clw: {
                    label: 'Clip to Reveal',
                    controlType: 'segment',
                    lock: true,
                    rt: 'full',
                    inputData: {
                        data: [
                            { label: 'On', value: '1' },
                            { label: 'Off', value: '0' },
                        ],
                        allowDeselect: false
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: '0',
                    },
                },
                std: {
                    label: 'Stagger Direction',
                    controlType: 'VisualGridDropdown',
                    lock: true,
                    rt: 'full',
                    inputData: {
                        data: [
                            { label: 'Left To Right', value: 'l-r', icon: LeftToRightIcon },
                            { label: 'Right To Left', value: 'r-l', icon: RightToLeftIcon },
                            { label: 'Center To Edge', value: 'c-e', icon: CenterToEdgeIcon },
                            { label: 'Edge To Center', value: 'e-c', icon: EdgeToCenterIcon },
                            { label: 'Reading Order (LR-TB)', value: 're-lr-tb', icon: ReadingOrderLR_TBIcon },
                            { label: 'Reading Order (RL-BT)', value: 're-rl-bt', icon: ReadingOrderLR_BTIcon },
                            { label: 'Reading Order (RL-TB)', value: 're-rl-tb', icon: ReadingOrderRL_TBIcon },
                            { label: 'Reading Order (RL-BT)', value: 're-rl-bt', icon: ReadingOrderRL_BTIcon },
                            { label: 'Diagonal (LT-RB)', value: 'di-lt-rb', icon: DiagonalLTRBIcon },
                            { label: 'Diagonal (RT-LB)', value: 'di-rt-lb', icon: DiagonalRTLBIcon },
                            { label: 'Diagonal (RB-TL)', value: 'di-rb-tl', icon: DiagonalRBTLIcon },
                            { label: 'Diagonal (LB-TR)', value: 'di-lb-tr', icon: DiagonalLBTRIcon },
                            { label: 'Radial (TB)', value: 'ra-tb', icon: RadialTopToBottomIcon },
                            { label: 'Radial (LR)', value: 'ra-lr', icon: RadialLeftToRightIcon },
                            { label: 'Radial (RL)', value: 'ra-rl', icon: RadialRightToLeftIcon },
                            { label: 'Radial (BT)', value: 'ra-bt', icon: RadialBottomToTopIcon },
                        ],
                        allowDeselect: false
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 'l-r',
                    },
                },
                sts: {
                    label: 'Stagger speed',
                    controlType: 'number',
                    lock: true,
                    inputData: {
                        min: 0.01,
                        max: 2,
                        suffix:"s"
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: '0.8',
                    },
                },
            }
        },
    },
    props: {
        design: {
            st: {},
            base: {},
        },
        animation: {},
        variants: [
            {
                label: 'Base',
                id: 'base',
                minId: '',
                moutId: '',
                initId: ''
            }
        ],
        options: {
            content: {
                vs: 'm',
                value: ''
            },
            dvid: {
                vs: 'm',
                value: 'base'
            },
        },
        mode: 'e',
    },
};

// Create a new block instance
const text = new Block(blockConfig);

export default text;