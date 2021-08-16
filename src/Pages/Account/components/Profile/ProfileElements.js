import { useEffect, useState } from 'react';
import styled from 'styled-components'

import { Button, makeStyles, CircularProgress, IconButton, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { green, red } from '@material-ui/core/colors';
import fbApp from '../../../../_Db';
import { camelCase, capitalCase } from 'change-case';
import FormInputs from '../../../../Custom/FormInputs.js';
import UserMessage from '../../../../Components/UserMessage';


const SectionHeader = styled.h4`
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
const LoadingWrapper = styled.div``
const LoadingMessage = styled.div``
export const Loading = ({ msg }) => {
    return (
        <LoadingWrapper>
            <LoadingMessage>{msg}</LoadingMessage>
            <CircularProgress />
        </LoadingWrapper>
    )
}
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const Header = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.087);
    padding: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: rgba(0,0,0,0.2);
    padding: 10px;
    margin-bottom: 10px;
`
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
const AvatarOuterWrapper = styled.div`
    position: relative;
`
const DeletePhotoIcon = styled(HighlightOffIcon)`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    &:hover {
        color: ${red[600]}
    }

`
const ProfileAvatar = ({ url, notify }) => {
    return (
        <AvatarOuterWrapper>
            <AvatarWrapper>
                <img src={url} alt="avatar" style={{ height: '180px', width: '180px' }} />
            </AvatarWrapper>
            <DeletePhotoIcon onClick={() => notify({ action: 'delete:image' })} />
        </AvatarOuterWrapper>
    )
}
const EditPhoto = ({ notify }) => {
    const classes = useStyles()
    // const [selectedImage, setSelectedImage] = useState(false)
    const onImageSelected = e => {
        notify({ action: 'update:image', payload: e.target.files[0] })
    }

    // useEffect(() => {
    //     if (selectedImage) {
    //         (async () => {
    //             const fileRef = fbApp.storage().ref().child(savePath)
    //             const snapShot = await fileRef.put(selectedImage)
    //             const url = await snapShot.ref.getDownloadURL()
    //             setSelectedImage(false)
    //             onSave(url)
    //         })()
    //     }

    // }, [selectedImage, savePath, onSave])
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
export const ProfileImage = ({ image, notify, savePath }) => {
    return (
        <ImageWrapper>
            {image ? <ProfileAvatar url={image} notify={notify} /> : <DefaultAvatar />}
            <EditPhoto {...{ notify, savePath }} />
        </ImageWrapper>
    )
}
const sanitizeValue = (value, type) => {
    if (type === 'boolean') {
        return value ? 'Yes' : 'No'
    }
    return value
}
const ValueEditorWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`
const ValueLabel = styled.div`
    font-weight: bold;
    &:after {
        content: ':'
    }
`
const DataGroup = styled.div`
    display: flex;
    align-items: center;
`
const ValueData = styled.div`
    margin-right: 10px;
`
const ValueEditor = ({ label, value, schema, notify }) => {
    const [edit, setEdit] = useState(false)
    const [dataValue, setDataValue] = useState(value)
    const onChange = e => {
        if (!e.target) {
            setDataValue(e)
        } else {
            e.target.type === 'checkbox' ?
                setDataValue(e.target.checked)
                : setDataValue(e.target.value)
        }
    }
    const onSave = () => {
        notify({ action: `update:${label}`, payload: dataValue })
        setEdit(false)
    }
    const copy = (text) => {
        if ('clipboard' in navigator) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setUserMsg('Copied!')
                    setShowMsg(true)
                })
        } else {
            document.execCommand('copy', true, text);
            setUserMsg('Copied!')
            setShowMsg(true)
            return
        }
    }
    const [showMsg, setShowMsg] = useState(false)
    const [userMsg, setUserMsg] = useState('')
    return (
        <ValueEditorWrapper>
            <UserMessage msg={userMsg} open={showMsg} handleClose={() => setShowMsg(false)} />
            <ValueLabel>{capitalCase(label)}</ValueLabel>
            {edit
                ? <DataGroup>
                    <FormInputs value={dataValue} onChange={onChange} schema={schema} />
                    {/* <TextField value={dataValue} onChange={onChange} style={{width: dataValue ? dataValue.toString().length * 10 : '200px'}}/> */}
                    <IconButton size="small" onClick={() => setEdit(false)}>
                        <CancelIcon />
                    </IconButton>
                    <IconButton size="small" onClick={onSave}>
                        <SaveIcon />
                    </IconButton>
                </DataGroup>
                : <DataGroup>
                    <ValueData>{sanitizeValue(value, schema.type)}</ValueData>
                    {schema.editable
                        ? <IconButton size="small" onClick={() => setEdit(true)}>
                            <EditIcon />
                        </IconButton>
                        : <IconButton size="small" onClick={() => copy(value)}>
                            <FileCopyIcon />
                        </IconButton>
                    }
                </DataGroup>
            }
        </ValueEditorWrapper>
    )
}
const ProfileInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ProfileInfo = ({ items, schema, notify, profile }) => {
    return (
        <ProfileInfoWrapper>
            {items.map(item => {
                const label = camelCase(item)
                return <ValueEditor {...{ label, value: profile[label], schema: schema[label], notify }} />
            })}
        </ProfileInfoWrapper>
    )
}
const ProfileDataWrapper = styled.div`
    flex-direction: column;
    /* overflow-y: scroll; */
`
const ProfileDataSection = styled.div``
const ProfileHeader = styled.div`
    display: flex;
    justify-content: center;
`
export const ProfileData = ({ profile, sections, schema, notify }) => {
    return (
        <ProfileDataWrapper>
            {sections.map(({ name, items }) => (
                <ProfileDataSection key={name}>
                    <ProfileHeader>
                        <SectionHeader>{name}</SectionHeader>
                    </ProfileHeader>
                    <ProfileInfo {...{ items, schema, notify, profile }} />
                </ProfileDataSection>
            ))}
        </ProfileDataWrapper>
    )
}