import {Route} from 'react-router-dom'


export const AdminRoute = ({ children, profile, ...rest }) => {
    return (
        <Route {...rest} render={() => {
            return profile.isAdmin
            ? children
            : null
          }} />
    )
} 