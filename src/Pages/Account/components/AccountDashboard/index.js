import React from 'react'

const AccountDashboard  = ({profile}) => {
    return (
        <div>
            Welcome {profile.displayName || profile.email}
        </div>
    )
}

export default AccountDashboard 
