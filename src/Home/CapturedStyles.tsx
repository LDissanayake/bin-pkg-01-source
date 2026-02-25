import React, { useState } from "react";
import { Switch, Group, Divider, HoverCard, Text, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

// Matches your PHP capture logic
type StyleType = "stylesheet" | "inline" | "script"; 

interface Style {
    type: StyleType;
    handle: string;
    src?: string;
    deps?: string[];
    media?: string;
    source?: string;
}

interface StyleState {
    stylesheet: string[];
    inline: string[];
}

interface CapturedStylesProps {
    styles: Style[];
    options: { disabled_css: StyleState };
    setOptions: (key: string, value: StyleState) => void;
}

const CapturedStyles: React.FC<CapturedStylesProps> = ({ styles, options, setOptions }) => {
    // 1. Initialize local state from options prop
    const [styleState, setStyleState] = useState<StyleState>(() => ({
        stylesheet: options?.disabled_css?.stylesheet || [],
        inline: options?.disabled_css?.inline || [],
    }));

    // 2. Surgical toggle function
    const handleToggle = (handle: string, type: StyleType) => {
        // Map 'stylesheet' OR 'script' to the 'stylesheet' state key
        const stateKey = (type === "inline") ? "inline" : "stylesheet";
        
        const currentHandles = styleState[stateKey];
        const isCurrentlyDisabled = currentHandles.includes(handle);

        const updatedHandles = isCurrentlyDisabled
            ? currentHandles.filter((h) => h !== handle)
            : [...currentHandles, handle];

        const newState = {
            ...styleState,
            [stateKey]: updatedHandles,
        };

        // Update local UI immediately
        setStyleState(newState);
        
        // Notify parent (Studio) of the change
        setOptions("disabled_css", newState);
    };

    if (!styles || styles.length === 0) {
        return <Text size="sm" c="dimmed" my="md">No styles captured.</Text>;
    }

    return (
        <Stack gap="xs">
            <Divider my="xs" label="Captured Styles" labelPosition="left" />
            
            {styles.map((style, index) => {
                // Determine the correct key for state lookup
                const stateKey = (style.type === "inline") ? "inline" : "stylesheet";
                const isExcluded = styleState[stateKey]?.includes(style.handle);


                return (
                    <div key={`${style.handle}-${index}`}>
                        <Group gap="xs">
                            <Switch
                                label={style.handle}
                                // Flip the logic: if it IS NOT in the excluded list, show it as "On" (Blue)
                                checked={!isExcluded} 
                                // When toggled, it still adds/removes from your disabled list correctly
                                onChange={() => handleToggle(style.handle, style.type)}
                                size="xs"
                                color="rgb(153 177 210)" // Standard active color
                            />
                            
                            {(style.type === "stylesheet" || style.type === "script") ? (
                                <HoverCard width={280} shadow="md" withArrow>
                                    <HoverCard.Target>
                                        <IconInfoCircle size={14} style={{ cursor: 'help', color: 'gray' }} />
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <div style={{ fontSize: 10, wordBreak: 'break-all' }}>
                                            <strong>Source:</strong> {style.src || "Internal"} <br />
                                            <strong>Dependencies:</strong> {style.deps?.length ? style.deps.join(", ") : "None"} <br />
                                            <strong>Media:</strong> {style.media || "All"} <br />
                                            <strong>Origin:</strong> {style.source || "Unknown"}
                                        </div>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            ) : (
                                <Text c="dimmed" size="xs" fs="italic">[inline style]</Text>
                            )}
                        </Group>
                    </div>
                );
            })}
        </Stack>
    );
};

export default CapturedStyles;