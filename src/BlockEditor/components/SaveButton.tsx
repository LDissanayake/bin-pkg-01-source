import React, { useEffect, useRef, useState } from 'react'
import { UnstyledButton } from '@mantine/core';
import { useEditorContext } from '../EditorContext';
import { CheckIcon, Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import * as styles from './SaveButton.module.css';

function SaveButton() {
    const { handleSave, saveState, canSave } = useEditorContext();

    const isSaving = saveState === 'saving';
    const isSuccess = saveState === 'success';

    return (
        <UnstyledButton
            className={`${styles.saveBtn} ${isSaving ? styles.savingShimmer : ''} ${isSuccess ? styles.success : ''}`}
            disabled={!canSave}
            aria-label="Save"
            onClick={canSave && !isSaving ? handleSave : undefined}

        >
            <span className={styles.iconWrapper}>
                {saveState === 'idle' && <span className={styles.text}>Save</span>}
                {saveState === 'saving' && <DotsHorizontalIcon className={styles.slide} />}
                {saveState === 'success' && <CheckIcon className={styles.slide} style={{ color: '#fff' }} />}
                {saveState === 'error' && <Cross2Icon className={styles.slide} />}
            </span>
        </UnstyledButton>
    );
}

export default SaveButton;

