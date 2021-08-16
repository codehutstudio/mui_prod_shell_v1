import { useState,createElement } from 'react'
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import styled from "styled-components";
import clsx from 'clsx'
import { capitalCase } from "capital-case";


import { Menu, MenuItem, makeStyles } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NoteIcon from '@material-ui/icons/Note';

import {
    Button,
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    Tooltip,
    IconButton,
    Divider,
    Switch as SwitchMui
} from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import IconFactory from "../../Custom/IconFactory";
import AccountDashboard from './components/AccountDashboard'
import Projects from './components/Projects'
import Messages from './components/Messages'
import Links from './components/Links'
import Invoices from './components/Invoices'
import Documents from './components/Documents'
import Admin from './components/Admin'
import Profile from './components/Profile'
import { AdminRoute } from '../../Custom/AdminRoute';

const useStyles = makeStyles(theme => ({
    settingsList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    settingsPanel: {
        width: 250
    }
}))

const RoutingCmps = {
    projects: Projects,
    messages: Messages,
    links: Links,
    invoices: Invoices,
    documents: Documents,
    admin: Admin
}
export const Wrapper = styled.div`

`
export const AccountMenu = ({ menuItems, notify, profile, basePath, closeMobileMenu }) => {
    const location = useLocation()
    const isActive = name => {
        return `/${name}` === location.pathname || `${basePath}/${name}` === location.pathname
    }
    return (
        <List>
            {menuItems.map(({ name, isProtected }) => (
                (isProtected && profile.isAdmin) | !isProtected ?
                    <Tooltip key={name} title={capitalCase(name)} placement="right">
                        <ListItem selected={isActive(name)} button onClick={() => {notify({ action: 'go', payload: name }); closeMobileMenu()}}>
                            <ListItemIcon>{IconFactory(name)}</ListItemIcon>
                            <ListItemText primary={capitalCase(name)} />
                        </ListItem>
                    </Tooltip>
                    : null
            ))}
        </List>
    )
}

const ToolbarWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`
export const Toolbar = ({ notify, switchTheme, isDarkMode }) => {
    const [menuAnchorEL, setMenuAnchorEl] = useState(null)
    const menuOpen = Boolean(menuAnchorEL)
    const handleMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const menuClose = () => {
        setMenuAnchorEl(null)
    }

    const [showSettings, setShowSettings] = useState(false)
    const closeSettingsMenu = () => setShowSettings(false)
    return (
        <ToolbarWrapper>
            <Tooltip title="Home">
                <IconButton onClick={() => notify({ action: 'home' })}>
                    <HomeIcon style={{ color: '#fff' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Tasks">
                <IconButton>
                    <AssignmentIcon style={{ color: '#fff' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Messages">
                <IconButton>
                    <MailOutlineIcon style={{ color: '#fff' }} />
                </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem style={{ background: '#fff' }} />
            <IconButton onClick={handleMenu} style={{ marginLeft: '20px' }}>
                <MoreVertIcon style={{ color: '#fff' }} />
            </IconButton>
            <Menu
                open={menuOpen}
                onClose={menuClose}
                anchorEl={menuAnchorEL}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItem button onClick={() => { notify({ action: 'goto', payload: 'profile' }); menuClose() }}>
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    {switchTheme && (
                        <ListItem button onClick={() => setShowSettings(true)}>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    )}
                    <ListItem button onClick={() => { notify({ action: 'logout'}); menuClose() }}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </List>
                <SettingsMenu {...{ open: showSettings, onClose: closeSettingsMenu, checked: isDarkMode, switchTheme }} />
            </Menu>
        </ToolbarWrapper>
    )
}

export const SettingsMenu = ({ open, onClose, checked, switchTheme }) => {
    const classes = useStyles()
    return (
        <Dialog
            {...{ open, onClose }}
            classes={{paper: classes.settingsPanel}}
        >
            <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.settingsList}>
                <ListItem>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Dark Mode" />
                    <ListItemSecondaryAction>
                        <SwitchMui
                            edge="end"
                            onChange={switchTheme}
                            checked={checked}
                            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Dialog>
    )
}

const loadCmp = ({name, profile}) => {
    if (typeof RoutingCmps[name] !== 'undefined') {
        return createElement(RoutingCmps[name], {profile: profile})
    }
}
export const AccountRouting = ({ profile, routes, basePath }) => {
    const { path } = useRouteMatch()
    return (
        <Switch>
            <Route exact path={path}>
                <AccountDashboard {...{profile}}/>
            </Route>
            <Route path={`${basePath}/profile`}>
                <Profile {...{ profile }} />
            </Route>
            {routes.map(({ name, isProtected }) => (
                (isProtected && profile.isAdmin) | !isProtected
                    ? (<AdminRoute profile={profile} key={name} path={`${basePath}/${name}`}>
                        {loadCmp({name, profile})}
                    </AdminRoute>)
                    : null
            ))}
        </Switch>
    )
}