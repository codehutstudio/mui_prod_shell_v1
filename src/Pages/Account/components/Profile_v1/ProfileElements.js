import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { capitalCase } from 'change-case';

import styled from 'styled-components'

import {
    Button,
    makeStyles,
    Breadcrumbs,
    Typography,
    IconButton,
    TextField,
    ButtonGroup,
    Tooltip,
    CircularProgress,

} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';

import fbApp from '../../../../_Db';
import { isEmpty, isUndefined } from '../../../../libs/dataVal';

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
}))

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const SectionHeader = styled.h3`
    margin: 10px auto;
    position: relative;

    :before {
        content: "";
        display: block;
        width: 300px;
        height: 1px;
        left: 110%;
        top: 50%;
        background: rgba(0, 0, 0, 0.087);
        position: absolute;
    }

    :after {
        content: "";
        display: block;
        width: 300px;
        height: 1px;
        right: 110%;
        top: 50%;
        background: rgba(0, 0, 0, 0.087);
        position: absolute;
    }
`
/** Header Bar */
export const Header = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
export const PathLinks = ({ links }) => {
    const classes = useStyles()
    const linksCount = links.length - 1
    return (
        <>
            <Breadcrumbs>
                {links.map((link, idx) => (
                    idx < linksCount
                        ? <Link className={classes.link} color="inherit" key={idx} to={link}>{capitalCase(link.replace('/', ''))}</Link>
                        : <Typography key={idx}>{capitalCase(link.replace('/', ''))}</Typography>
                ))
                }
            </Breadcrumbs>
        </>
    )
}

export const HeaderButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
`
/** Contact Info */
const ContactDataNode = styled.div`
    display: flex;
    justify-content: space-between;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
    padding: 5px 0;
`
const ContactWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const ContactLabel = styled.div`
    font-weight: bold;
    :after {
        content: ":"
    }
`
const ContactValue = styled.div``
export const ContactInfo = (
    { profile: {
        firstName,
        lastName,
        displayName,
        email,
        phoneNumber
    }, notify, isWorking
    }) => {
    const data = {
        firstName,
        lastName,
        displayName,
        email,
        phoneNumber
    }
    const [edit, setEdit] = useState(false)

    const onNotify = ({ action, payload }) => {
        if (action.includes('edit:')) setEdit(action)
        if (action.includes('cancel:')) setEdit(false)
        if (action.includes('update:')) notify({ action, payload })
    }

    return (
        <ContactWrapper>
            <SectionHeader>Contact Info</SectionHeader>
            {Object.entries(data).map(([label, value], idx) => (
                <ContactDataNode key={label}>
                    <ContactLabel>{capitalCase(label)}</ContactLabel>
                    <ContactValue>
                        {/* <ValueEditor key={idx} {...{label, value, notify, isWorking}}/> */}
                        {edit === `edit:${label}`
                            ? <>
                                <ValueEditor key={idx} {...{ label, value, notify: onNotify, isWorking }} />
                            </>
                            : <>
                                {value}
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => onNotify({ action: `edit:${label}` })}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </>}
                    </ContactValue>
                </ContactDataNode>
            ))}
        </ContactWrapper>
    )
}
/** Data Editing */
const ValueEditorWrapper = styled.div`
    display: flex;
    align-items:center;
`
const ValueEditor = ({ label, value, notify, isWorking, toggleEdit }) => {
    const classes = useStyles()
    const updateLabel = `update:${label}`
    const [defaultValue, setDefaultValue] = useState(value)
    const [isSaving, setIsSaving] = useState(isWorking === updateLabel)
    const onChange = (e) => {
        e.preventDefault()
        setDefaultValue(e.target.value)
    }
    const onSave = (e) => {
        notify({ action: `update:${label}`, payload: defaultValue })
        notify({ action: `cancel:edit` })
    }

    return (
        <ValueEditorWrapper>
            <TextField
                key={label}
                name={label}
                value={defaultValue}
                style={{ width: isEmpty(defaultValue) || isUndefined(defaultValue) ? '200px' : defaultValue.toString().length * 10 }}
                onChange={onChange}
            />
                <Tooltip title="Cancel editing">
                    <IconButton onClick={() => notify({ action: `cancel:edit` })}>
                        <CancelIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                        <IconButton onClick={onSave} className={classes.saveButton}>
                            <SaveIcon />
                            {isSaving && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </IconButton>
                </Tooltip>

        </ValueEditorWrapper>
    )
}
/**  Photo Editing */

const EditPhoto = ({ savePath, onSave }) => {
    const classes = useStyles()
    const [selectedImage, setSelectedImage] = useState(false)
    const onImageSelected = e => {
        setSelectedImage(e.target.files[0])
    }

    useEffect(() => {
        if (selectedImage) {
            (async () => {
                const fileRef = fbApp.storage().ref().child(savePath)
                const snapShot = await fileRef.put(selectedImage)
                const url = await snapShot.ref.getDownloadURL()
                setSelectedImage(false)
                onSave(url)
            })()
        }

    }, [selectedImage, savePath, onSave])
    return (
        <>
            <input
                accept="image/*"
                className={classes.imageInput}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onImageSelected}
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color="default"
                    component='span'
                    startIcon={<PhotoCamera />}
                >Upload</Button>
            </label>
        </>
    )
}
const DefaultAvatar = styled(AccountCircle)`
    font-size: 10em;
`
const AvatarWrapper = styled.div`
    height: 180px;
    width: 180px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`
const ProfileAvatar = ({ url }) => {
    return (
        <AvatarWrapper>
            <img src={url} alt="avatar" style={{ height: '180px', width: '180px' }} />
        </AvatarWrapper>
    )
}

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: rgba(0,0,0,0.2);
    padding: 10px;
    margin-bottom: 10px;
`
export const ProfileImage = ({ profile: { id, photoURL }, notify }) => {
    const [currentPhoto, setCurrentPhoto] = useState(photoURL)
    const savePath = `images/${id}/images/avatarPhoto`
    const onSave = downloadUrl => {
        setCurrentPhoto(downloadUrl)
        notify({ action: 'update:photoURL', payload: downloadUrl })
    }
    return (
        <ImageWrapper>
            {currentPhoto ? <ProfileAvatar url={currentPhoto} /> : <DefaultAvatar />}
            <EditPhoto {...{ savePath, onSave }} />
        </ImageWrapper>
    )
}
