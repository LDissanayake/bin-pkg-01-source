import React from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { BoxIcon, ImageIcon } from '@radix-ui/react-icons';

// Initial block configuration
const sectionConfig: BlockConfig = {
    title: 'Image',
    icon: <ImageIcon />,
    cats: ['layout'],
    type: 'image',
    children: false,
    rootAllow: true,
    childCats: ['basic', 'layout'],
    props: {
        styles: {
            i: {
                pt: {
                    vs: 'manual',
                    de: {
                        d: {
                            value: 're'
                        }
                    }
                },
                dt: {
                    vs: 'manual',
                    de: {
                        d: {
                            value: 'fl'
                        }
                    }
                },
            },
            v: {
                primary: {
                    n: {}, h: {}, c: {}
                }
            },
        },
        lt: 'bl',
        mode: 'e',
        tag: {
            vs: 'm',
            value: 'section'
        },
        options: {
        }
    },
    settings: {
        tabs: [],
        sections: [],
        controls: [],
    },
    options: {
        general: {
            label: 'General',
            actions: true,
            order: ['img'],
            properties: {
                img: { // image url
                    label: 'Image',
                    controlType: 'img',
                    lock: true,
                    responsive: true,
                    colorMode: true,
                    inputData: {},
                    data: {
                        vs: 'm',
                        de: {
                            d: { value: { d:  null, l: null } }
                        }
                    },
                },
            }
        }
    }
};

// Create a new block instance
const section = new Block(sectionConfig);

export default section;
