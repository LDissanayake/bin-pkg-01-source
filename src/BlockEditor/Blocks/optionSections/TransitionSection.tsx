import { IconCirclePlus, IconMinus, IconPlus, IconTransitionRight } from "@tabler/icons-react";
import { Block as EditorBlock, useEditorContext } from "../../EditorContext";
import * as styles from './TransitionSection.module.css';
import React, { useEffect, useState } from "react";
import { ActionIcon, Menu, UnstyledButton } from '@mantine/core';


function createVariantPairs(obj) {
    const keys = Object.keys(obj);
    const result = [];

    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            if (i === j) continue;

            const from = keys[i];
            const to = keys[j];

            result.push({
                id: `${from}-${to}`,
                to,
                from
            });
        }
    }

    return result;
}


const TransitionSection = (
    { id, block, updated, buttonPass, sectionId }:
        {
            id: string,
            block: EditorBlock,
            updated: () => void;
            buttonPass: (sectionId: string, btn: JSX.Element) => void;
            sectionId: string;
        }) => {

    const { pageBlocks } = useEditorContext();

    const combinations = createVariantPairs(block.data?.design || {});

    const [opened, setOpened] = useState(false);

    if (!block?.a) { block.a = {} }
    const animations = block.a;

    const handleAnimation = (id: string) => {
        if (animations[id]) {
            // delete
            delete animations[id];
        } else {
            animations[id] = {};
        }

        updated();
    }

    /**
     * Pass header button
     * uses latest display mode because dependencies are correct
     */
    useEffect(() => {
        buttonPass(
            sectionId,
            <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
                <Menu.Target>
                    <ActionIcon
                        variant="transparent"
                        radius="lg"
                        size="sm"
                        color={'gray'}
                    >
                        <IconCirclePlus
                            style={{ width: '85%', height: '85%' }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    {
                        combinations?.map(item => {
                            return <UnstyledButton
                                key={item.id}
                                className={styles.addListItem}
                                onClick={() => 
                                    {
                                        handleAnimation(item.id);
                                        setOpened(false);
                                    }
                                }
                            >
                                <span>{item.from}</span>
                                {
                                    animations[item.id] ? 
                                    <IconMinus size={14} stroke={1.5} />
                                    :
                                    <IconPlus size={14} stroke={1.5} />
                                }
                                <span>{item.to}</span>
                            </UnstyledButton>;
                        }
                        )
                    }
                </Menu.Dropdown >
            </Menu >
        );
    }, [opened, animations]);

    return <div className={styles.wrap}>
        {
            Object.keys(animations).map((item, i) => {
                const label = item.split('-');

                return <div key={i} className={styles.item}>
                    <span>{label[0]}</span>
                    <IconTransitionRight size={14} stroke={1.5} />
                    <span>{label[1]}</span>
                </div>
            }
            )
        }
    </div>

}

export default TransitionSection;