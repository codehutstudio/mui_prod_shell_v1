import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../Providers';
import { getLocal } from '../Providers/_LocalStorage';


export const PrivateRoute = ({ children, ...rest }) => {
    const {currentUser} = useAuth()
    const localProfile = getLocal('profile')
    return (
        <Route {...rest} render={() => {
            return  !!currentUser || !!localProfile
            ? children
            : <Redirect to='/login' />
          }} />
    )
} 