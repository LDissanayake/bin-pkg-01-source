import { useContext } from 'react'
import { BlockFlowContext } from '../../../RenderEngine/BlockFlowContext';


export function useResolvedTheme({id, colorMode}: {id: string, colorMode: 'l' | 'd'}) {
    const parentData = useContext(BlockFlowContext);

    const globalTheme = colorMode;
    const parentTheme = parentData?.parentTheme;

    // later: local override
    const resolvedTheme = id === 'NxSG'
        ? 'l'
        : parentTheme || globalTheme;

    return {resolvedTheme, parentTheme};
}
