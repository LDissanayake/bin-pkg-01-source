import React from 'react';
import { BoxModelIcon, DotsHorizontalIcon, ReaderIcon, WidthIcon } from "@radix-ui/react-icons";
import { Block, BlockConfig } from './blockTemplate';

// Initial block configuration
const config: BlockConfig = {
    title: 'Content Wrapper',
    icon: <ReaderIcon/>,
    cats: ['template'],
    type: 'contentWrapper',
    children: false,
    rootAllow: false,
    props: {
        styles: {
            width: { default: ['auto', ''] },
        },
    },
    settings: {
        tabs: [],
        sections: [],
        controls: [],
        tools: []
    },
};

// Create a new block instance
const block = new Block(config);

// Add tool
// block.addTool({
//     label: 'Width',
//     id: 'width-tool',
//     type: 'popover',
//     icon: <WidthIcon />,
//     controls: ['width-adv']
// });

// block.addTool({
//     label: 'Spacing',
//     id: 'spacing-tool',
//     type: 'popover',
//     icon: <BoxModelIcon />,
//     controls: [{
//         ctype: 'spacing',
//         data: {
//             padding: 'xy',
//             margin: 'xy'
//         }
//     }]
// });

// block.addTool({
//     label: 'More',
//     id: 'more-tool',
//     type: 'popover',
//     icon: <DotsHorizontalIcon />,
//     controls: [
//         {
//             id: 'label',
//             label: 'Admin Label',
//             type: 'input',
//             property: 'adminLabel',
//             isCSS: false,
//             propertyType: 'nr'
//         }
//     ]
// });

export default block;
