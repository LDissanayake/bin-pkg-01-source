import React, { ReactElement, useEffect, useState } from 'react';
import * as styles from './TemplateMap.module.css';
import { Divider, MultiSelect, Select } from '@mantine/core';
import { IconArchive, IconChevronDown, IconChevronUp, IconDeviceTabletSearch, IconError404, IconFile, IconHome, IconTemplate } from '@tabler/icons-react';
import { useHomeContext } from './HomeContext';

interface ItemData {
    id: string,
    label: string,
    type: 'single' | 'multiple',
    icon: ReactElement,
    part?: boolean
}

interface Template {
    id: string;
    title: string;
}

interface TemplateMapProps {
    templateList: Template[];
    partList: Template[];
    onChange: React.Dispatch<React.SetStateAction<{
        selectedTemplates: { [key: string]: string | string[] };
        defaultTemplates: { [key: string]: string }
    }>>;
    map: {
        selectedTemplates?: { [key: string]: string | string[] };
        defaultTemplates?: { [key: string]: string }
    }
}

const Item = ({
    id,
    label,
    type,
    icon,
    onTemplateChange,
    selectedTemplates, templateList, defaultTemplates, onDefaultTemplateChange,
    openedItemId, setOpenedItemId
}: ItemData & {
    onTemplateChange: (id: string, value: string | string[]) => void,
    selectedTemplates: { [key: string]: string | string[] },
    defaultTemplates: { [key: string]: string },
    onDefaultTemplateChange: (id: string, value: string) => void,
    templateList: Template[];
    openedItemId: string | null;
    setOpenedItemId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    // Filter out templates already selected by other items
    const availableTemplates = templateList.filter(template => {
        const selectedTemplateIds = Object.keys(selectedTemplates)
            .filter(key => key !== id) // Exclude the current item
            .flatMap(key => selectedTemplates[key])
            .map(String); // Convert all IDs to strings for consistent comparison

        const currentSelection = selectedTemplates[id];
        return !selectedTemplateIds.includes(String(template.id)) || currentSelection === template.id;
    });

    // Enforce at least one selection for MultiSelect
    const handleMultiSelectChange = (value: string[]) => {
        // Prevent de-selecting all items
        if (value.length === 0) return; // Prevent the array from being empty
        onTemplateChange(id, value);

        // If an item is removed and it was the default selected item, update default selection
        if (defaultTemplates[id] && !value.includes(defaultTemplates[id])) {
            const newDefaultTemplate = value[0] || ''; // Set to first selected item or empty if no selection
            onDefaultTemplateChange(id, newDefaultTemplate);
        }
    };

    return (
        <div className={styles.item} data-open={openedItemId === id}>
            <div className={styles.titleWrap} onClick={() => setOpenedItemId(openedItemId === id ? null : id)}>
                <div className={styles.title}>
                    {icon} {label}
                </div>
                {openedItemId === id ? <IconChevronUp stroke={1} /> : <IconChevronDown stroke={1} />}
            </div>
            {openedItemId === id && (
                <div className={styles.section}>
                    {type === 'single' ? (
                        <Select
                            placeholder="Pick a template"
                            data={availableTemplates.map(t => ({ value: String(t.id), label: t.title }))}
                            value={String(selectedTemplates[id]) || ''}
                            onChange={(value) => onTemplateChange(id, value || '')}
                            size="xs"
                            searchable
                            comboboxProps={{ withinPortal: false }}
                            mt="sm"
                            variant="filled"
                        />
                    ) : (
                        <>
                            <MultiSelect
                                placeholder="Pick templates"
                                data={availableTemplates.map(t => ({ value: String(t.id), label: t.title }))}
                                value={(selectedTemplates[id] as string[] || []).map(String)}
                                onChange={handleMultiSelectChange}
                                size="xs"
                                searchable
                                comboboxProps={{ withinPortal: false }}
                                mt="sm"
                                variant="filled"
                            />
                            <Select
                                placeholder="Select default template"
                                data={(selectedTemplates[id] as string[] || []).map(value => {
                                    const template = templateList.find(t => String(t.id) === value);
                                    return { value: String(template?.id || ''), label: template?.title || '' };
                                })}
                                value={defaultTemplates[id] || ''}
                                onChange={(value) => onDefaultTemplateChange(id, value || '')}
                                size="xs"
                                searchable
                                comboboxProps={{ withinPortal: false }}
                                mt="sm"
                                variant="filled"
                                allowDeselect={false}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};


function TemplateMap({ templateList, partList, onChange, map }: TemplateMapProps) {

    const { postTypes } = useHomeContext();

    const data: (ItemData | string)[] = [
        'Core Templates',
        { id: 'front_page', label: 'Home Page', type: 'single', icon: <IconHome width={18} height={18} stroke={1} /> },
        { id: '404', label: '404 Page', type: 'single', icon: <IconError404 width={18} height={18} stroke={1} /> },
        { id: 'search', label: 'Search Page', type: 'single', icon: <IconDeviceTabletSearch width={18} height={18} stroke={1} /> },
        { id: 'home', label: 'Post Home', type: 'single', icon: <IconTemplate width={18} height={18} stroke={1} /> },
        { id: 'archive', label: 'Post Archive', type: 'single', icon: <IconArchive width={18} height={18} stroke={1} /> },
        'Single Templates',
    ];

    postTypes.forEach((item, index) => {
        if( item.type !== 'record' ) {
            data.push({ id: item.id, label: `${item.label} Template`, type: 'multiple', icon: <IconFile width={18} height={18} stroke={1} /> });
        }
    });

    data.push(
        'Template Parts',
        { id: 'frame', label: 'Header/ Site Frame', type: 'single', part: true, icon: <IconTemplate width={18} height={18} stroke={1} /> },
        { id: 'footer', label: 'Footer', type: 'single', part: true, icon: <IconTemplate width={18} height={18} stroke={1} /> }
    );

    const [selectedTemplates, setSelectedTemplates] =
        useState<{ [key: string]: string | string[] }>(map?.selectedTemplates || {});
    const [defaultTemplates, setDefaultTemplates] = useState<{ [key: string]: string }>(map?.defaultTemplates || {});

    const handleTemplateChange = (id: string, value: string | string[]) => {
        setSelectedTemplates(prev => ({ ...prev, [id]: value }));
    };

    const handleDefaultTemplateChange = (id: string, value: string) => {
        setDefaultTemplates(prev => ({ ...prev, [id]: value }));
    };

    const [openedItemId, setOpenedItemId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true) }, []);

    useEffect(() => {
        if (!mounted) { return }
        onChange({
            selectedTemplates,
            defaultTemplates: defaultTemplates
        })
    }, [selectedTemplates, defaultTemplates]);

    return (
        <div className={styles.wrap}>
            {data.map((item, i) => {
                if (typeof item === 'string') {
                    return (
                        <Divider key={i} mt={24} mb={12} label={item} labelPosition="left" />
                    );
                }
                return (
                    <Item
                        key={i}
                        {...(item as ItemData)}
                        onTemplateChange={handleTemplateChange}
                        onDefaultTemplateChange={handleDefaultTemplateChange}
                        selectedTemplates={selectedTemplates}
                        defaultTemplates={defaultTemplates}
                        templateList={item?.part ? partList : templateList}
                        openedItemId={openedItemId}
                        setOpenedItemId={setOpenedItemId}
                    />
                );
            })}
        </div>
    );
}

export default TemplateMap;
