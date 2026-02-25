import React from 'react'
import { useEditorContext } from '../../BlockEditor/EditorContext';
import Base from '../blocks/Base';
import TextFlow from '../blocks/TextFlow';
import Text from '../blocks/Text';
import Colors, { Color } from '../blocks/Colors';
import Fonts, { Font } from '../blocks/Fonts';
import genBlockData from '../../BlockEditor/util/blockDataUtils';
import Instance from '../blocks/Instance';
import ComponentsBlock from '../blocks/ComponentsBlock';

function ArtboardRender({ entry, part = false }: { entry: string[], part: boolean }) {
    const { colorMode } = useEditorContext();

    return <div className='artboard-root' style={{ position: 'relative' }} data-color-mode={colorMode}>
        {entry?.map(id => {
            return <RenderBlock key={id} id={id} part={part} />
        })}
    </div>
}


export default ArtboardRender;


/**
 * Render Block
*/
const RenderBlock = ({ id, part }: { id: string, part: boolean }) => {
    const { page, pageBlocks } = useEditorContext();

    const block = pageBlocks.current.get(id);

    let BlockComponent = null;

    if (!block) { return }


    genBlockData(block); // generate block data


    const type = block.t;

    switch (type) {
        case 'b':
            BlockComponent = Base;
            break;
        case 'cs':
            BlockComponent = Colors;
            break;
        case 'c':
            BlockComponent = Color;
            break;
        case 'fs':
            BlockComponent = Fonts;
            break;
        case 'f':
            BlockComponent = Font;
            break;
        case 't':
            BlockComponent = Text;
            break;
        case 'tf':
            BlockComponent = TextFlow;
            break;
        case 'i':
            BlockComponent = Instance;
            break;
        case 'cos':
            BlockComponent = ComponentsBlock;
            break;
        default:
            return null;
    }

    return <BlockComponent
        id={id}
        block={block}
        part={part}
    > {block?.c?.map((childId) => (
        <RenderBlock key={childId} id={childId} part={part} />
    ))}
    </BlockComponent>
}
