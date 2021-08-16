import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isEmpty, last } from '../../../../libs/dataVal'
import { ContactInfo, Header, HeaderButtons, PathLinks, ProfileImage, Wrapper } from './ProfileElements'

import { Divider, makeStyles, Button, Container } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { breadCrumbsFromPathname } from '../../../../Custom/BreadCrumbs'
import fbApp from '../../../../_Db'

const useStyles = makeStyles(theme => ({
    divider: {
        height: '1px',
        marginBottom: '10px'
    },
    button: {
        margin: theme.spacing(1)
    },
    profileImage: {
        marginBottom: '10px'
    }
}))

const Profile = ({ profile }) => {
    const classes = useStyles()
    const { pathname } = useLocation()
    const links = breadCrumbsFromPathname(pathname)

    const [isWorking, setIsWorking] = useState('')
    const [unsavedChanges, setUnsavedChanges] = useState({})
    const [profileCopy, setProfileCopy] = useState(profile)
    const [updateProfile, setUpdateProfile] = useState(false)

    const workDone = () => setIsWorking(false)

    /** Testing */
    const timer = useRef()

    useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);
      
      const notify = async ({ action, payload }) => {
          if (action.includes('update:')) {
              console.log('settingIsWorking', isWorking, action)
              setIsWorking(action) 
              console.log('isWorking = ', isWorking)
              const propName = last(action.split(':'))
              const update = { ...unsavedChanges, [propName]: payload }
              setUnsavedChanges(update)
              setProfileCopy({...profileCopy, ...update})
              setIsWorking('')
            
        }
    }

    useEffect(() => {
       (async () => {
        if(updateProfile && !isEmpty(unsavedChanges)) {
            await fbApp.firestore().doc(`users/${profile.id}`).update(unsavedChanges)
            setUpdateProfile(false)
        }
       })()
    }, [updateProfile, unsavedChanges, profile])

    return (
        <Wrapper>
            <Header>
                <PathLinks links={links} />
                <HeaderButtons>
                    {!isEmpty(unsavedChanges) && (<Button
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        variant='contained'
                        color="primary"
                        size="small"
                        onClick={() => setUpdateProfile(true)}
                    >Save Changes</Button>)}
                </HeaderButtons>
            </Header>
            <Divider flexItem className={classes.divider} />
            <ProfileImage {...{ profile, notify }} className={classes.profileImage} />
            <Divider flexItem className={classes.divider} />
            <Container>
                <ContactInfo {...{ profile: profileCopy, notify, isWorking }} />
            </Container>
        </Wrapper>
    )
}

export default Profile
