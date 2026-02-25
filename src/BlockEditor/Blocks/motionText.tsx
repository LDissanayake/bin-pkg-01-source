import React from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { TextIcon } from '@radix-ui/react-icons';

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Motion Text',
    icon: <TextIcon />,
    cats: ['basic'],
    type: 'motionText',
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
                    controlType: 'textarea',
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
                tag: { // tag
                    label: 'Tag',
                    controlType: 'select',
                    lock: true,
                    inputData: {
                        data: [
                            { label: 'Paragraph', value: 'p' },
                            { label: 'Heading 1', value: 'h1' },
                            { label: 'Heading 2', value: 'h2' },
                            { label: 'Heading 3', value: 'h3' },
                            { label: 'Heading 4', value: 'h4' },
                            { label: 'Heading 5', value: 'h5' },
                            { label: 'Heading 6', value: 'h6' },
                            { label: 'Div', value: 'div' },
                            { label: 'Span', value: 'span' },
                        ],
                        allowDeselect: false
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 'span',
                    },
                },
            }
        },
        TAC: {
            label: 'Behavior',
            actions: true,
            order: ['txtsm', 'clw', 'asp'],
            properties: {
                txtsm: {
                    label: 'Text Split Mode',
                    controlType: 'select',
                    lock: true,
                    inputData: {
                        data: [
                            { label: 'Word', value: 'w' },
                            { label: 'Letter', value: 'l' },
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
                    label: 'Clip Wrapper',
                    controlType: 'segment',
                    lock: true,
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
                asp: {
                    label: 'Animation Start Point',
                    controlType: 'select',
                    lock: true,
                    inputData: {
                        data: [
                            { label: 'Start', value: 's' },
                            { label: 'Center', value: 'c' },
                            { label: 'End', value: 'e' },
                            { label: 'Pointer', value: 'p' },
                        ],
                        allowDeselect: false
                    },
                    responsive: false,
                    colorMode: false,
                    data: {
                        vs: 'm',
                        value: 's',
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
            tag: {
                vs: 'm',
                value: 'p'
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