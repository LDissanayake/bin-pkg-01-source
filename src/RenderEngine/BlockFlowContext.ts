import { createContext } from "react";

export type BlockFlow = {
  parentTheme?: 'd' | 'l',
  instanceVariables?: any,
  componentVariables?: any
};

export const BlockFlowContext = createContext<BlockFlow>({});
