import React, { useState } from 'react'
import { useLocation, Prompt } from 'react-router'

import { Button, makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


import { Header, ProfileData, Wrapper, ProfileImage, Loading } from './ProfileElements'

import AppBreadcrumbs from '../../../../Components/AppBreadcrumbs';
import { PROFILE_MODEL, PROFILE_MODEL_SECTIONS, PROFILE_TABLE_NAME } from '../../../../_Customize';
import { updateDoc, uploadFile } from '../../../../_DbDataFunctions';
import { useDocRef } from '../../../../_CustomHooks';
import { useEffect } from 'react';
import { isEmpty } from '../../../../libs/dataVal';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    imageInput: {
        display: 'none'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.dark
    },
    saveButton: {
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
        background: 'rgba(255,255,255, 0.8)',
    },
    headerButton: {
        marginRight: theme.spacing(2)
    }
}))
const Profile = ({ profile }) => {
    const classes = useStyles()
    const savePath = `${PROFILE_TABLE_NAME}/${profile.id}`
    const [docRef, dbProfile, loading, error] = useDocRef(savePath)
    const { pathname } = useLocation()

    const [userProfile, setUserProfile] = useState(profile)
    const [unsavedChanges, setUnsavedChanges] = useState({})
    const hasUnsavedChanges = !isEmpty(unsavedChanges)

    useEffect(() => {
        if (dbProfile) {
            setUserProfile({ id: dbProfile.id, ...dbProfile.data() })
        }
    }, [dbProfile])

    const uploadImage = async (file) => {
        const { success, result, error } = await uploadFile(savePath, file)
        await updateDoc({ name: savePath, data: { photoURL: result } })
    }
    const deleteImage = async () => {
        await docRef.update({photoURL: ''})
    }
    const saveChanges = async () => {
        await updateDoc({ name: savePath, data: unsavedChanges})
        setUnsavedChanges({})
    }

    const cancelChanges = () => {
        setUnsavedChanges({})
        setUserProfile({ id: dbProfile.id, ...dbProfile.data() })
    }
    const notify = ({ action, payload }) => {
        const [type, propName] =  action.split(':')
        if (type === 'update') {
            propName === 'image' && uploadImage(payload);
            if (propName !== 'image') {
                const update = {[propName]: payload}
                setUnsavedChanges({...unsavedChanges, ...update})
                setUserProfile({...userProfile, ...update})
            }
        }
        if (type === 'delete') {
            propName === 'image' && dbProfile.photoURL !== '' && deleteImage();
        }
    }
    return (
        <Wrapper>
            <Header>
                <AppBreadcrumbs link={pathname} />
                {hasUnsavedChanges && 
                <Box>
                    <Button className={classes.headerButton} size="small" variant="contained" color="primary" startIcon={<SaveIcon />} onClick={saveChanges}>Save Changes</Button>
                    <Button size="small" variant="contained" color="primary" startIcon={<CancelIcon />} onClick={cancelChanges}>Cancel Changes</Button>
                </Box>
                }
            </Header>
            <Prompt 
                when={hasUnsavedChanges} 
                message={JSON.stringify({
                    title: 'Before You Leave', 
                    message: 'You have unsaved changes. Click Cancel to go back and save your changes. Click OK to leave anyway.',
                    okButtonText: 'Go Back',
                    cancelButtonText: 'Leave Anyway'
                    })}/>
            {loading && <Loading msg="Loading Profile" />}
            {userProfile && (
                <>
                    <ProfileImage image={userProfile.photoURL} {...{ notify, savePath }} />
                    <ProfileData {...{  profile: userProfile, sections: PROFILE_MODEL_SECTIONS, schema: PROFILE_MODEL, notify, savePath }} />
                </>
            )}
            {error && 'Error loading profile'}
        </Wrapper>
    )
}

export default Profile
