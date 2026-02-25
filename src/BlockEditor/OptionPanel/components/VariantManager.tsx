import React, { useEffect, useRef, useState } from "react";
import * as styles from "./VariantManager.module.css";

import {
    ClipboardIcon,
    CopyIcon,
    DotsHorizontalIcon,
    MinusCircledIcon,
    MixerHorizontalIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Tooltip, UnstyledButton } from "@mantine/core";
import { useEditorContext } from "../../EditorContext";
import { cloneDeep } from "lodash";

// ---- Helper: sanitize input for safe variant IDs ----
const sanitizeVariantId = (input: string) => {
    let id = input
        .trim()
        // remove spaces entirely (or change to "_" if you prefer)
        .replace(/\s+/g, "")
        // remove hyphens explicitly
        .replace(/-/g, "")
        // allow only letters, numbers, underscore
        .replace(/[^a-zA-Z0-9_]/g, "")
        // limit to 30 chars
        .slice(0, 30);

    // prefix with 'v' if starts with number or underscore
    if (/^[0-9_]/.test(id)) id = "v" + id;

    return id;
};


// ---- Helper: validate ID ----
const isVariantIdValid = (id: string, block: any) => {
    if (!id) return false;
    if (!/^[a-zA-Z]/.test(id)) return false; // must start with a letter
    if (block?.d?.[id]) return false; // must be unique
    return true;
};

const VariantManager = ({ forceUpdate }: { forceUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
    const {
        page,
        setPage,
        pageBlocks,
        editingBlock,
        editingVariant,
        setEditingVariant,
    } = useEditorContext();

    const blockId = editingBlock as string;
    const block = pageBlocks.current.get(blockId);

    const [items, setItems] = useState<string[]>([]);
    const [visibleItems, setVisibleItems] = useState<string[]>([]);
    const [overflowItems, setOverflowItems] = useState<string[]>([]);
    const [actionsVisible, setActionsVisible] = useState(false);
    const [copyData, setCopyData] = useState<any>(null);
    const [copiedFrom, setCopiedFrom] = useState<string | null>(null);
    const [copyHintVisible, setCopyHintVisible] = useState(false);

    const [newVariantId, setNewVariantId] = useState("");
    const [isValidNewId, setIsValidNewId] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // ---- Load variants ----
    useEffect(() => {
        if (block?.data?.design) {
            setItems(Object.keys(block.data.design));
        }
    }, []);

    // ---- Validate new variant ID ----
    useEffect(() => {
        if (!block?.d) return;
        setIsValidNewId(isVariantIdValid(newVariantId, block));
    }, [newVariantId, block]);

    // ---- Create Variant ----
    const handleCreateVariant = () => {
        if (!newVariantId || !isValidNewId || !block?.data?.design) return;

        block.data.design[newVariantId] = {};
        if (block.v) {
            block.v.push({ id: newVariantId })
        }
        setNewVariantId("");

        setPage((prev) => ({
            ...prev,
            [blockId]: Date.now(),
        }));

        setItems((prev) => [...prev, newVariantId]);
        handleVariantClick(newVariantId);
    };

    // ---- Copy Variant ----
    const handleCopy = () => {
        const variantData = block?.data?.design?.[editingVariant] || {};
        const copied = cloneDeep(variantData);

        setCopyData(copied);
        setCopiedFrom(editingVariant);
        setCopyHintVisible(true);

        setTimeout(() => setCopyHintVisible(false), 1500);
    };


    const [pasteHintVisible, setPasteHintVisible] = useState(false);

    // ---- Paste Variant ----
    const handlePaste = () => {
        if (!copyData || !block?.d || !editingVariant) return;

        (block.data as any).design[editingVariant] = cloneDeep(copyData);

        setPage((prev) => ({
            ...prev,
            [blockId]: Date.now(),
        }));

        forceUpdate(Date.now());

        setPasteHintVisible(true);
        setTimeout(() => setPasteHintVisible(false), 1000);
    };


    const deleteVariantById = (variantId: string) => {
        if (!block?.v) { return }
        block.v = (block.v || []).filter(v => v.id !== variantId);
    };


    // ---- Delete Variant ----
    const handleDelete = () => {
        if (!block?.data?.design || editingVariant === "base") return;

        delete block.data?.design?.[editingVariant];

        deleteVariantById(editingVariant);

        setPage((prev) => ({
            ...prev,
            [blockId]: Date.now(),
        }));

        const remaining = Object.keys(block.data?.design);
        const next = remaining[0] || "base";

        handleVariantClick(next, remaining);
    };


    // ---- Variant switch animation ----
    const handleVariantClick = (variant: string, latestItems?: string[]) => {
        if (variant === editingVariant || isFading) return;

        setIsFading(true);

        setTimeout(() => {
            setEditingVariant(variant);

            setItems((prev) => {
                const list = latestItems ?? prev;
                const copy = [...list];
                const index = copy.indexOf(variant);
                if (index > 0) {
                    copy.splice(index, 1);
                    copy.unshift(variant);
                }
                return copy;
            });

            setTimeout(() => setIsFading(false), 100);
        }, 150);
    };


    // ---- Responsive variant row ----
    const calculateVisibleItems = () => {
        const container = containerRef.current;
        if (!container) return;

        let totalWidth = 0;
        const visible: string[] = [];
        const hidden: string[] = [];

        items.forEach((variant) => {
            const fake = document.createElement("span");
            fake.textContent = variant;
            fake.style.visibility = "hidden";
            fake.style.position = "absolute";
            fake.style.whiteSpace = "nowrap";
            container.appendChild(fake);

            const width = fake.offsetWidth + 12;
            container.removeChild(fake);

            if (totalWidth + width < container.offsetWidth - 40) {
                totalWidth += width;
                visible.push(variant);
            } else {
                hidden.push(variant);
            }
        });

        setVisibleItems(visible);
        setOverflowItems(hidden);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(calculateVisibleItems);
        resizeObserver.observe(container);
        calculateVisibleItems();

        return () => resizeObserver.disconnect();
    }, [items]);

    const canCopy = Object.keys(block?.data?.design?.[editingVariant] || {}).length

    return (
        <div className={styles.variants}>
            <div className={styles.variants_card_wrap}>
                <div className={styles.variants_card}>
                    {/* Visible row */}
                    <div ref={containerRef} className={styles.variants_card_items}>
                        {visibleItems.map((text) => (
                            <span
                                key={text}
                                data-active={editingVariant === text}
                                onClick={() => handleVariantClick(text)}
                                style={{
                                    opacity: isFading ? 0 : 1,
                                    transform: `translateY(${isFading ? 10 : 0}px)`,
                                    transition: "all 0.15s ease",
                                }}
                            >
                                {text}
                            </span>
                        ))}
                        {overflowItems.length > 0 && (
                            <div className={styles.more_menu}>
                                <DotsHorizontalIcon />
                                <div className={styles.dropdown}>
                                    {overflowItems.map((text) => (
                                        <span key={text} onClick={() => handleVariantClick(text)}>
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Options toggle */}
                <div
                    className={styles.variants_card_options}
                    onClick={() => setActionsVisible(!actionsVisible)}
                >
                    <MixerHorizontalIcon />
                </div>
            </div>

            {/* Actions */}
            {actionsVisible && (
                <div className={styles.variants_action_panel}>
                    {/* Add new variant */}
                    <div className={styles.variants_action_add}>
                        <Tooltip
                            label={
                                !isValidNewId && newVariantId
                                    ? "Invalid or duplicate ID"
                                    : "Type variant name"
                            }
                            color={!isValidNewId ? "red" : "#0d0d0d"}
                            position="bottom"
                            offset={2}
                            fz={10}
                            opened={!isValidNewId && !!newVariantId}
                        >
                            <input
                                className={`${styles.variants_action_input} ${!isValidNewId ? styles.invalid : ""
                                    }`}
                                placeholder="type variant name"
                                value={newVariantId}
                                onChange={(e) =>
                                    setNewVariantId(sanitizeVariantId(e.currentTarget.value))
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && isValidNewId && newVariantId) {
                                        e.preventDefault(); // prevent form submission / focus loss
                                        handleCreateVariant();
                                    }
                                }}
                            />
                        </Tooltip>

                        {isValidNewId && newVariantId ? (
                            <Tooltip
                                label={`Create "${newVariantId}"`}
                                color="#0d0d0d"
                                position="bottom"
                                offset={2}
                                fz={10}
                            >
                                <UnstyledButton
                                    className={styles.variants_action}
                                    onClick={handleCreateVariant}
                                >
                                    <PlusCircledIcon />
                                </UnstyledButton>
                            </Tooltip>
                        ) : (
                            <UnstyledButton disabled className={styles.variants_action}>
                                <PlusCircledIcon />
                            </UnstyledButton>
                        )}
                    </div>

                    {/* Copy */}
                    {canCopy ? <Tooltip
                        label={
                            copyHintVisible
                                ? `Copied from "${editingVariant}"`
                                : `Copy "${editingVariant}" variant`
                        }
                        color={copyHintVisible ? 'green' : "#0d0d0d"}
                        position="bottom"
                        offset={2}
                        fz={10}
                    >
                        <UnstyledButton
                            onClick={handleCopy}
                            className={styles.variants_action}
                        >
                            <CopyIcon />
                        </UnstyledButton>
                    </Tooltip>
                        :
                        <UnstyledButton
                            className={styles.variants_action}
                            disabled
                        >
                            <CopyIcon />
                        </UnstyledButton>
                    }

                    {/* Paste */}
                    {copyData ? (
                        <Tooltip
                            label={
                                pasteHintVisible
                                    ? `Pasted to "${editingVariant}"`
                                    : `Paste from "${copiedFrom}"`
                            }
                            color={pasteHintVisible ? "green" : "#0d0d0d"}
                            position="bottom"
                            offset={2}
                            fz={10}
                        >
                            <UnstyledButton
                                onClick={handlePaste}
                                className={styles.variants_action}
                            >
                                <ClipboardIcon />
                            </UnstyledButton>
                        </Tooltip>
                    ) : (
                        <UnstyledButton disabled className={styles.variants_action}>
                            <ClipboardIcon />
                        </UnstyledButton>
                    )}


                    {/* Delete */}
                    {editingVariant === "base" ? (
                        <UnstyledButton disabled className={styles.variants_action}>
                            <MinusCircledIcon />
                        </UnstyledButton>
                    ) : (
                        <Tooltip
                            label={`Delete "${editingVariant}"`}
                            color="#0d0d0d"
                            position="bottom"
                            offset={2}
                            fz={10}
                        >
                            <UnstyledButton
                                onClick={handleDelete}
                                className={styles.variants_action}
                            >
                                <MinusCircledIcon />
                            </UnstyledButton>
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
};

export default VariantManager;
