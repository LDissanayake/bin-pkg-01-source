import React, { ReactElement, useEffect, useState } from 'react';
import { SiteOptions } from './Home';
import * as homeStyles from './Home.module.css';
import * as styles from './CMSManage.module.css';
import { ActionIcon, Code, Divider, HoverCard, Input, Notification, Select, Switch, Text } from '@mantine/core';
import { IconPlus, IconMinus, IconTrash, IconEdit, IconCheck, IconCircle, IconInfoCircle } from '@tabler/icons-react';

const CMSManage = ({ options, setOptions }: {
    options: SiteOptions,
    setOptions: (option: string, value: any) => void;
}) => {
    const [customPostData, setCustomPostData] = useState(options?.custom_posts || []);
    const [newPostInputs, setNewPostInputs] = useState<{
        id: string;
        slug: string;
        archiveSlug: string;
        labelSingle: string;
        labelPlural: string;
        type: 'post' | 'record';
        fields: { label: string; type: string }[];
    }>({
        id: '',
        slug: '',
        archiveSlug: '',
        labelSingle: '',
        labelPlural: '',
        type: 'post',
        fields: [], // Initialize as an empty array
    });

    const [isCreating, setIsCreating] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (options?.custom_posts &&
            JSON.stringify(options?.custom_posts) !== JSON.stringify(customPostData)) {
            setCustomPostData(options.custom_posts);
        }
    }, [options]);

    const [mount, setMount] = useState(false);
    useEffect(() => {
        setMount(true);
    }, []);

    useEffect(() => {
        if (!mount) { return }
        setOptions('custom_posts', customPostData);
    }, [customPostData]);

    const canCreate =
        newPostInputs.id &&
        newPostInputs.slug &&
        newPostInputs.labelSingle;

    const isUnique = (id: string, slug: string, excludeIndex: number | null = null): boolean => {
        return !customPostData.some((post, index) => {
            if (excludeIndex !== null && index === excludeIndex) return false; // Exclude the current post
            return post.id === id || post.slug === slug;
        });
    };

    const sanitizeId = (value:string) => {
        // Convert to lowercase, remove anything not a–z
        return value.toLowerCase().replace(/[^a-z]/g, '');
    };


    const handleNewInputChange = (key: string, value: string) => {
        if (key === 'id') {
            value = sanitizeId(value);
        }
        setNewPostInputs((prevState) => {
            const updatedInputs = { ...prevState, [key]: value };

            // If the `id` changes and the type is 'record', update the slug with the new `id`.
            if (key === 'id' && prevState.type === 'record') {
                updatedInputs.slug = value;
            }

            // If the `type` changes to 'record', update the slug with the current `id`.
            if (key === 'type' && value === 'record') {
                updatedInputs.slug = prevState.id;
            }

            return updatedInputs;
        });
    };


    const handleCreate = () => {
        if (!isUnique(newPostInputs.id, newPostInputs.slug)) {
            setError('ID or Slug must be unique.');
            return;
        }
        setCustomPostData([...customPostData, newPostInputs]);
        resetForm();
        setError(null);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setNewPostInputs(customPostData[index]);
        setIsCreating(true);
    };

    const handleUpdate = () => {
        if (editingIndex === null) return;
        if (!isUnique(newPostInputs.id, newPostInputs.slug, editingIndex)) {
            setError('ID or Slug must be unique.');
            return;
        }
        const updatedPosts = [...customPostData];
        updatedPosts[editingIndex] = newPostInputs;
        setCustomPostData(updatedPosts);
        resetForm();
        setError(null);
    };

    const handleRemove = (index: number) => {
        const updatedPosts = customPostData.filter((_, i) => i !== index);
        setCustomPostData(updatedPosts);
    };

    const resetForm = () => {
        setNewPostInputs({
            id: '',
            slug: '',
            archiveSlug: '',
            labelSingle: '',
            labelPlural: '',
            type: 'post',
            fields: []
        });
        setIsCreating(false);
        setEditingIndex(null);
    };

    const renderCustomPosts = () => {
        const groupedPosts = customPostData.reduce((acc, post) => {
            acc[post.type] = acc[post.type] || [];
            acc[post.type].push(post);
            return acc;
        }, {} as Record<string, typeof customPostData>);

        return Object.entries(groupedPosts).map(([type, posts]) => (
            <div key={type}>
                <Divider my="xs" label={type === 'post' ? 'Custom Posts' : 'Info Records'} labelPosition="left" />
                {posts.map((post, index) => {
                    const originalIndex = customPostData.indexOf(post);
                    return (
                        <div key={`${type}-${index}`}>
                            <div className={styles.postItem}>
                                <div className={styles.postTitle}>
                                    {post.labelPlural}
                                    {type === 'post' && <span>/{post.slug}/</span>}
                                </div>
                                <div className={styles.postActions}>
                                    <ActionIcon
                                        variant="light"
                                        onClick={() => handleEdit(originalIndex)}
                                    >
                                        <IconEdit width="70%" height="70%" stroke={1} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="light"
                                        onClick={() => handleRemove(originalIndex)}
                                        color="red"
                                    >
                                        <IconTrash width="70%" height="70%" stroke={1} />
                                    </ActionIcon>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        ));
    };


    return (
        <div>
            <div className={styles.title}>
                <div className={styles.titleCol}>CMS{infoData.cms}</div>
                <div className={styles.titleCol}>
                    <ActionIcon onClick={() => {
                        if (isCreating) {
                            setIsCreating(false);
                            resetForm();
                        } else {
                            setIsCreating(true)
                        }
                    }
                    }>
                        {
                            isCreating ? <IconMinus width="70%" height="70%" stroke={1} /> :
                                <IconPlus width="70%" height="70%" stroke={1} />
                        }
                    </ActionIcon>
                </div>
            </div>
            {error && <Notification color="red" withCloseButton={false} withBorder m={6}>{error}</Notification>}
            <div>
                {isCreating ? (
                    <div className={styles.formWrap}>
                        <div className={styles.controlWrap}>
                            <div className={styles.controlCol}>
                                <div className={styles.controlLabel}>
                                    <div className={styles.controlLabelText}>ID</div>
                                    <div className={styles.controlLabelInfo}>{infoData.id}</div>
                                </div>
                            </div>
                            <div className={styles.controlCol}>
                                <Input
                                    size="xs"
                                    value={newPostInputs.id}
                                    onChange={(event) => handleNewInputChange('id', event.currentTarget.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.controlWrap}>
                            <div className={styles.controlCol}>
                                <div className={styles.controlLabel}>
                                    <div className={styles.controlLabelText}>Type</div>
                                    <div className={styles.controlLabelInfo}>{infoData.type}</div>
                                </div>
                            </div>
                            <div className={styles.controlCol}>
                                <Select
                                    value={newPostInputs.type}
                                    data={[
                                        { value: 'post', label: 'Post' },
                                        { value: 'record', label: 'Info Record' }
                                    ]}
                                    size='xs'
                                    onChange={(value) => handleNewInputChange('type', value || 'post')}
                                    comboboxProps={{ withinPortal: false }}
                                    allowDeselect={false}
                                />
                            </div>
                        </div>
                        {newPostInputs.type === 'post' && <>
                            <Divider my="xs" label="Slugs" labelPosition="left" />
                            <div className={styles.controlWrap}>
                                <div className={styles.controlCol}>
                                    <div className={styles.controlLabel}>
                                        <div className={styles.controlLabelText}>Post-type Slug</div>
                                        <div className={styles.controlLabelInfo}>{infoData.slug}</div>
                                    </div>
                                    <Input
                                        size="xs"
                                        value={newPostInputs.slug}
                                        onChange={(event) => handleNewInputChange('slug', event.currentTarget.value)}
                                    />
                                </div>
                                <div className={styles.controlCol}>
                                    <div className={styles.controlLabel}>
                                        <div className={styles.controlLabelText}>Archive Slug</div>
                                        <div className={styles.controlLabelInfo}>{infoData.archiveSlug}</div>
                                    </div>
                                    <Input
                                        size="xs"
                                        value={newPostInputs.archiveSlug}
                                        onChange={(event) => handleNewInputChange('archiveSlug', event.currentTarget.value)}
                                    />
                                </div>
                            </div></>}
                        <Divider my="xs" label="Labels" labelPosition="left" />
                        <div className={styles.controlWrap}>
                            <div className={styles.controlCol}>
                                <div className={styles.controlLabel}>
                                    <div className={styles.controlLabelText}>Label Single</div>
                                    <div className={styles.controlLabelInfo}>{infoData.labelSingle}</div>
                                </div>
                                <Input
                                    size="xs"
                                    value={newPostInputs.labelSingle}
                                    onChange={(event) => handleNewInputChange('labelSingle', event.currentTarget.value)}
                                />
                            </div>
                            <div className={styles.controlCol}>
                                <div className={styles.controlLabel}>
                                    <div className={styles.controlLabelText}>Label Plural</div>
                                    <div className={styles.controlLabelInfo}>{infoData.labelPlural}</div>
                                </div>
                                <Input
                                    size="xs"
                                    value={newPostInputs.labelPlural}
                                    onChange={(event) => handleNewInputChange('labelPlural', event.currentTarget.value)}
                                />
                            </div>
                        </div>
                        <div>
                            {editingIndex === null ? (
                                <ActionIcon disabled={!canCreate} onClick={handleCreate}>
                                    <IconPlus width="70%" height="70%" stroke={1} />
                                </ActionIcon>
                            ) : (
                                <ActionIcon disabled={!canCreate} onClick={handleUpdate}>
                                    <IconCheck width="70%" height="70%" stroke={1} />
                                </ActionIcon>
                            )}
                        </div>
                    </div>
                ) : (
                    renderCustomPosts()
                )}
            </div>
        </div>
    );
};

export default CMSManage;


const Info = ({ children }: { children: ReactElement | ReactElement[] }) => {
    return <HoverCard width={280} shadow="md" withinPortal={false} withArrow>
        <HoverCard.Target>
            <IconInfoCircle width="16px" height="16px" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
            {children}
        </HoverCard.Dropdown>
    </HoverCard>
}


const infoData = {
    cms: (<Info>
        <Text size="xs">
            CMS
        </Text>
        <Text size="xs" c="dimmed" my="xs">
            A tool for managing additional content types beyond the default WordPress Posts and Pages.
        </Text>
        <Text size="xs" c="dimmed" my="xs">
            This CMS allows you to create and manage Custom Posts (e.g., portfolios, concept projects, galleries) and Info Records (e.g., team members, testimonials),
            tailored to your website's specific needs.
        </Text>
        <Text size="xs" c="dimmed" my="xs" fs="italic">
            This CMS extends WordPress's core capabilities, which already handle Posts and Pages.
        </Text>
    </Info>),
    id: (<Info>
        <Text size="xs">
            ID
        </Text>
        <Text size="xs" c="dimmed" my="xs">
            A unique identifier for the custom post type. This is used internally to manage and reference your custom posts.
        </Text>
        <Divider my={12} />
        <Text size="xs" c="dimmed" my="xs">
            ⚠️ Warning: Once the ID is set, avoid changing it.
        </Text>
        <Text size="xs" c="dimmed" my="xs">
            If you have existing posts associated with this custom post ID, they will become unreachable until you revert to the old ID or create a new custom post type with the previous ID.
        </Text>
    </Info>),
    type: (<Info>
        <Text size="xs">
            Custom Posts
        </Text>
        <Text size="xs" c="dimmed" my="xs">Manage unique types of posts for custom use cases, such as projects, concept or portfolios.</Text>
        <Divider my={12} />
        <Text size="xs">
            Info Records
        </Text>
        <Text size="xs" c="dimmed" my="xs">
            A flexible data type used to store structured information that supports your content.
            Info records are ideal for backend data like team member profiles, testimonials, FAQs, or other auxiliary details.
            They are not designed to be directly displayed as standalone pages but are often used to populate sections of your site dynamically.
        </Text>
    </Info>),
    slug: (
        <Info>
            <Text size="xs">
                Post-type Slug
            </Text>
            <Text size="xs" c="dimmed" my="xs">
                The unique identifier used in the URL structure for posts of this custom type. It defines how the posts will be accessed on the front end.
            </Text>
            <Divider my={12} />
            <Text size="xs">
                Example:
            </Text>
            <Text size="xs" c="dimmed">
                If you set the PostType Slug as <Code>projects</Code>, posts of this type will appear at <Code>/projects/your-post-title/</Code>.
            </Text>
        </Info>
    ),
    archiveSlug: (
        <Info>
            <Text size="xs">
                Archive Slug
            </Text>
            <Text size="xs" c="dimmed" my="xs">
                Optional: A redirect slug for archive pages. Use this if the archive URL differs from the Post-type Slug.
            </Text>
        </Info>
    ),
    labelSingle: (
        <Info>
            <Text size="xs">
                Label Single
            </Text>
            <Text size="xs" c="dimmed" my="xs">
                An admin-only label used to represent a single instance of this item (e.g., 'Product'). Not used on the front end.
            </Text>
        </Info>
    ),
    labelPlural: (
        <Info>
            <Text size="xs">
                Label Plural
            </Text>
            <Text size="xs" c="dimmed" my="xs">
                An admin-only label used to represent multiple instances of this item (e.g., 'Products'). Not used on the front end.
            </Text>
        </Info>
    ),
}