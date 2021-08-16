import React, { useState } from 'react'
import { useHistory } from "react-router";

import { DbLogout } from '../../_DbAccessFunctions'


import DashboardLayout from '../../Components/DashboardLayout'
import { DASHBAORD_LINKS } from '../../_Customize';
import { AccountRouting, AccountMenu, Toolbar, Wrapper } from './AccountElements'


const Account = ({ profile, switchTheme, isDarkMode }) => {
    const history = useHistory()
    const basePath = '/account'
    const [showSettings, setShowSettings] = useState(false)
    const notify = ({ action, payload }) => {
        if (action === 'go') {
            payload === 'account' ? history.push(basePath) : history.push(`${basePath}/${payload}`)
        }
        if (action === 'logout') DbLogout()
        if (action === 'goto') history.push(`${basePath}/${payload}`)
        if (action === 'home') history.push('/')
        if (action === 'show') {
            (payload === 'settings' && setShowSettings(true));
        }
    }
    return (
        <Wrapper>
            <DashboardLayout
                toolbar={<Toolbar {...{ notify, switchTheme, isDarkMode }} />}
                menu={<AccountMenu {...{ menuItems: DASHBAORD_LINKS, notify, profile, basePath }} />}
                content={<AccountRouting {...{ profile, routes: DASHBAORD_LINKS, basePath }} />}
            />
        </Wrapper>

    )
}

export default Account
