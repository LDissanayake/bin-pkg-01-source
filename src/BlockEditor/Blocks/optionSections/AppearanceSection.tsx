import React, { useCallback } from "react";
import { Block, useEditorContext } from "../../EditorContext";
import DragNumberInput from "../../OptionPanel/components/Controls/DragNumberInput";
import { TransparencyGridIcon } from "@radix-ui/react-icons";
import { compactDesign } from "../../util/styleCodec";

type VariantKey = 'base' | string;

interface ChangePayload {
    value: string;
    property: string;
    variant: VariantKey;
}

const Section = ({ id, block, updated }: { id: string, block: Block, updated: () => void; }) => {

    const { editingVariant } = useEditorContext();

    const designData = block?.data?.design;

    /**
     * Generic design change handler
     */
    const handleChange = ({ value, property, variant }: ChangePayload) => {
            if (!designData || !value) return;

            designData[variant] ??= {};
            designData[variant][property] ??= { vs: 'm', value };

            designData[variant][property].value = value;

            block.d = compactDesign(designData);
            updated();
        };

    /**
     * Helpers for inputs
     */
    const getValue = (property: string, variant: VariantKey) =>
        designData?.[variant]?.[property]?.value ?? '';

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Opacity</span>
        <DragNumberInput
            value={getValue('op', editingVariant)}
            placeholder="1"
            onChange={(v) =>
                handleChange({
                    value: v,
                    property: 'op',
                    variant: editingVariant,
                })
            }
            step={.05}
            min={0}
            max={1}
            icon={<TransparencyGridIcon />}
        />
    </div>
}

export default Section;