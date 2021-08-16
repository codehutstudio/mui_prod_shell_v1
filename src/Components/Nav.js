import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core"
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link as LinkS } from 'react-scroll'
import { Link as LinkR } from 'react-router-dom'
import { capitalCase } from 'change-case'
import styled from 'styled-components'
import {DbLogout} from '../_DbAccessFunctions'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Switch,
    FormGroup,
    FormControlLabel,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';

const NavMenuLink = styled(LinkS)`
    color: #fff;
    display:inline-block;
    text-transform:uppercase;
    &:after {
        display:block;
        content: '';
        border-bottom: solid 1px #fff;  
        transform: scaleX(0);  
        transition: transform 250ms ease-in-out;
    }
    &:hover:after { transform: scaleX(1); }
    &.active {
        color: rgba(255,255,255, 0.3)
    }
`
const NavRouterLink = styled(LinkR)`
    color: #fff;
    display:inline-block;
    text-transform:uppercase;
    &:after {
        display:block;
        content: '';
        border-bottom: solid 1px #fff;  
        transform: scaleX(0);  
        transition: transform 250ms ease-in-out;
    }
    &:hover:after { transform: scaleX(1); }
`
/**
    h1.fromRight:after{ transform-origin:100% 50%; }
    h1.fromLeft:after{  transform-origin:  0% 50%; }
 */
const useStyles = makeStyles((theme) => ({
    navMenuLink: {
        marginRight: theme.spacing(7),
        cursor: 'pointer',
    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',
        textTransform: 'uppercase',
    },
    settingsFormControl: {
        justifyContent: 'space-between',
        padding: '10px'
    },
    settingsList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    settingsPanel: {
        width: 250
    }
 
}))

const MainMenu = ({ user, links }) => {
    const classes = useStyles()
    return (
        <>
            {links.map(({ name, type, isProtected }, idx) => {
                return (
                    <React.Fragment key={idx}>
                        {!isProtected && type === 'scroll'
                            ? <NavMenuLink spy={true} activeClass="active" smooth="easeInOutQuint" offset={-64} to={name} className={classes.navMenuLink}>{capitalCase(name)}</NavMenuLink>
                            : user.currentUser && isProtected
                                ? <NavRouterLink className={classes.navLink} to={`/${name}`}>{capitalCase(name)}</NavRouterLink>
                                : !user.currentUser && !isProtected
                                    ? <NavRouterLink className={classes.navLink} to={`/${name}`}>{capitalCase(name)}</NavRouterLink>
                                    : null}
                    </React.Fragment>
                )
            }

            )}
        </>
    )
}

export const Nav = ({ links, user, profile, switchTheme, isDarkMode }) => {
    console.log('user', user)
    const classes = useStyles()
    const history = useHistory()

    const [showSettings, setShowSettings] = useState(false)
    const closeSettingPanel = () => {
        setShowSettings(false)
    }
    const [profileMenuAnchorEL, setProfileMenuAnchorEl] = useState(null)
    const profileMenuOpen = Boolean(profileMenuAnchorEL)
    const handleProfileMenu = (event) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };
    const profileMenuClose = () => {
        setProfileMenuAnchorEl(null)
    }
    const notify = name => () => history.push(`/${name.toLowerCase()}`)
    return (
        <AppBar color="primary" position="fixed">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
                    <MainMenu {...{ user, links }} />
                </Box>
                {user.currentUser && (
                    <>
                        <IconButton onClick={handleProfileMenu} style={{ marginLeft: '20px' }}>
                            <AccountCircle style={{ color: '#fff' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={profileMenuAnchorEL}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={profileMenuOpen}
                            onClose={profileMenuClose}
                        >
                            <MenuItem onClick={notify('Account')}>Account</MenuItem>
                            <MenuItem onClick={notify('Profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => setShowSettings(true)}>Settings</MenuItem>
                            <MenuItem onClick={DbLogout}>Log Out</MenuItem>
                        </Menu>
                        <Dialog
                            open={showSettings}
                            onClose={closeSettingPanel}
                            classes={{paper: classes.settingsPanel}}
                        // fullWidth={true}
                        >
                            {/* <DialogContent> */}
                            <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.settingsList}>
                                <ListItem>
                                    <ListItemIcon>
                                        <SettingsBrightnessIcon />
                                    </ListItemIcon>
                                    <ListItemText id="switch-list-label-wifi" primary="Dark Mode" />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            edge="end"
                                            onChange={switchTheme}
                                            checked={isDarkMode}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            {/* <FormGroup>
                                    <FormControlLabel
                                        className={classes.settingsFormControl}
                                        label="Dark Mode"
                                        labelPlacement="start"
                                        control={<Switch color="primary" checked={isDarkMode} onChange={switchTheme} />} />
                                    <Divider />
                                </FormGroup> */}
                            {/* </DialogContent> */}

                        </Dialog>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Nav
