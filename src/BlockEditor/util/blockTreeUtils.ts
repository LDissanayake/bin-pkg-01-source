// BlockTreeUtils.ts
// Strongly-typed tree utilities for your block system

import { Block } from "../EditorContext";



export type BlockMap = Map<string, Block>;

const BlockTreeUtils = {
    /**
     * Get the direct parent of a block
     */
    getParent(map: BlockMap, id: string): Block | null {
        const node = map.get(id);
        if (!node) return null;

        const parentId = node.p;
        return parentId ? map.get(parentId) || null : null;
    },

    /**
     * Get all ancestors (root is last)
     */
    getParents(map: BlockMap, id: string): Block[] {
        const parents: Block[] = [];
        let current = map.get(id);

        while (current && current.p) {
            const parent = map.get(current.p);
            if (!parent) break;

            parents.push(parent);
            current = parent;
        }

        return parents;
    },

    /**
     * Find nearest parent by type
     */
    findParentByType(
        map: BlockMap,
        id: string,
        type: string
    ): Block | null {
        let current = map.get(id);

        while (current && current.p) {
            const parent = map.get(current.p);
            if (!parent) return null;

            if (parent.t === type) return parent;

            current = parent;
        }

        return null;
    },

    /**
     * Collect all parents until a specific type is reached.
     * Does NOT include the stop-type parent.
     */
    getParentsUntil(
        map: BlockMap,
        id: string,
        stopType: string
    ): Block[] {
        const list: Block[] = [];
        let current = map.get(id);

        while (current && current.p) {
            const parent = map.get(current.p);
            if (!parent) break;

            if (parent.t === stopType) break;

            list.push(parent);
            current = parent;
        }

        return list;
    },

    getParentsIdsUntil(
        map: BlockMap,
        id: string,
        stopType: string
    ): string[] {
        const list: string[] = [];
        let current = map.get(id);

        while (current && current.p) {
            const parent = map.get(current.p);
            if (!parent) break;

            if (parent.t === stopType) break;

            list.push(current.p);
            current = parent;
        }

        return list;
    },

    /**
     * Optional: Build reverse children index for fast lookup
     */
    buildChildrenIndex(map: BlockMap): Map<string, string[]> {
        const index = new Map<string, string[]>();

        for (const [id, node] of map) {
            const parentId = node.p;
            if (!parentId) continue;

            if (!index.has(parentId)) index.set(parentId, []);
            index.get(parentId)!.push(id);
        }

        return index;
    },

    /**
    * Find the first node (self or parent) matching a type.
    */
    findSelfOrParentByType(
        map: BlockMap,
        id: string,
        type: string
    ): { id: string; block: Block } | null {
        let currentId: string | null = id;
        let current: Block | null = map.get(currentId) ?? null;

        while (current) {
            if (current.t === type) {
                return { id: currentId as string, block: current };
            }

            const parentId = current.p;
            if (!parentId) break;

            currentId = parentId;
            current = map.get(parentId) ?? null;
        }

        return null;
    },

    getUniqueTypesFromBlocks(
        map: BlockMap,
        ids: string[]
    ): string[] {
        const seen = new Set<string>();
        const types: string[] = [];

        for (const id of ids) {
            const block = map.get(id);
            if (!block) continue;

            const type = block.t;
            if (!type) continue;

            if (!seen.has(type)) {
                seen.add(type);
                types.push(type);
            }
        }

        return types;
    },

    getTypesWithCounts(
        map: BlockMap,
        ids: string[]
    ): { type: string; count: number }[] {
        const counts = new Map<string, number>();

        for (const id of ids) {
            const block = map.get(id);
            if (!block) continue;

            const type = block.t;
            if (!type) continue;

            counts.set(type, (counts.get(type) ?? 0) + 1);
        }

        // Convert map → array
        return Array.from(counts.entries()).map(([type, count]) => ({
            type,
            count
        }));
    }

};

export default BlockTreeUtils;


/**
 * Extract a block + all its children as a plain object.
 * @param {Map<string, any>} blocksMap - your full block map
 * @param {string} id - starting block id
 * @returns {Record<string, any>} new object containing the subtree
 */
export function extractBlockTree(blocksMap, id) {
    const result = {};
    const visited = new Set();

    function collect(currentId) {
        if (!blocksMap.has(currentId) || visited.has(currentId)) return;

        visited.add(currentId);

        const node = blocksMap.get(currentId);

        // store the block in plain object
        result[currentId] = node;

        // recursively add children
        const children = node.c || [];
        for (const childId of children) {
            collect(childId);
        }
    }

    collect(id);
    return result;
}
