import React, { useEffect, useState } from "react";
import { Switch, Group, Divider, HoverCard, Text, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type ScriptType = "script" | "inline";

interface Script {
    type: ScriptType;
    handle: string;
    src?: string;
    deps?: string[];
    in_footer?: boolean;
    source?: string;
}

interface ScriptState {
    script: string[];
    inline: string[];
}

interface CapturedScriptsProps {
    scripts: Script[];
    options: { disabled_scripts: ScriptState };
    setOptions: (key: string, value: ScriptState) => void;
}

const CapturedScripts: React.FC<CapturedScriptsProps> = ({ scripts, options, setOptions }) => {
    // 1. Single source of truth: Local state initialized from props
    const [scriptState, setScriptState] = useState<ScriptState>(() => ({
        script: options?.disabled_scripts?.script || [],
        inline: options?.disabled_scripts?.inline || [],
    }));

    // 2. Optimized Toggle Function
    const handleToggle = (handle: string, type: keyof ScriptState) => {
        const currentHandles = scriptState[type];
        const isCurrentlyDisabled = currentHandles.includes(handle);

        const updatedHandles = isCurrentlyDisabled
            ? currentHandles.filter((h) => h !== handle)
            : [...currentHandles, handle];

        const newState = {
            ...scriptState,
            [type]: updatedHandles,
        };

        // Update local state for immediate UI feedback
        setScriptState(newState);

        // Push to parent immediately to ensure the "Save" button gets the right data
        setOptions("disabled_scripts", newState);
    };

    // 3. Prevent render if no scripts exist
    if (!scripts || scripts.length === 0) {
        return <Text size="sm" c="dimmed" my="md">No scripts captured.</Text>;
    }

    return (
        <Stack gap="xs">
            <Divider my="xs" label="Captured Scripts" labelPosition="left" />

            {scripts.map((script, index) => {
                // Determine if this specific item is disabled (checked)
                // We use script.type as the key to look into the state
                const isExcluded = scriptState[script.type]?.includes(script.handle);
                return (
                    <div key={`${script.handle}-${index}`}>
                        <Group gap="xs">
                            <Switch
                                label={script.handle}
                                // Flip the logic: if it IS NOT in the excluded list, show it as "On" (Blue)
                                checked={!isExcluded}
                                // When toggled, it still adds/removes from your disabled list correctly
                                onChange={() => handleToggle(script.handle, script.type)}
                                size="xs"
                                color="rgb(153 177 210)" // Standard active color

                            />

                            {script.type === "script" ? (
                                <HoverCard width={280} shadow="md" withArrow>
                                    <HoverCard.Target>
                                        <IconInfoCircle size={14} style={{ cursor: 'help', color: 'gray' }} />
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <div style={{ fontSize: 10, wordBreak: "break-all" }}>
                                            <strong>Source:</strong> {script.src || "Core / Internal"} <br />
                                            <strong>Dependencies:</strong> {script.deps?.length ? script.deps.join(", ") : "None"} <br />
                                            <strong>Location:</strong> {script.in_footer ? "Footer" : "Header"} <br />
                                            <strong>Origin:</strong> {script.source || "Unknown"}
                                        </div>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            ) : (
                                <Text c="dimmed" size="xs" fs="italic">[inline]</Text>
                            )}
                        </Group>
                    </div>
                );
            })}
        </Stack>
    );
};

export default CapturedScripts;