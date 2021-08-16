import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Pages/Home'
import Account from '../Pages/Account'
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import { PrivateRoute } from './PrivateRoute';
import Dev from '../Pages/Dev';
import { useState } from 'react';
import UserLeaveConfirmation from '../Components/UserLeaveConfirmation';


export default function Routing({user, profile, switchTheme, isDarkMode}) {
    const [open, setOpen] = useState(true)
    const onClose = (e) => {}
    return (
         <Router getUserConfirmation={(message, callback) => {
            return UserLeaveConfirmation(message, callback, open, setOpen);
         }}>
             <Switch>
                 <Route exact path='/'><Home {...{user, profile, switchTheme, isDarkMode}}/></Route>
                 <Route path='/login'><Login /></Route>
                 <Route path='/signup'><SignUp /></Route>
                 <Route path='/dev'><Dev /></Route>
                 <PrivateRoute path='/account'><Account {...{user: user.currentUser, profile, switchTheme, isDarkMode}}/></PrivateRoute>
             </Switch>
         </Router>
    )
}