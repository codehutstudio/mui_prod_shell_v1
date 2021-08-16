import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

import { FormSchemas } from '../../_Customize'
import { AutoForm } from '../../Custom/AutoForm'
import { AuthButtons } from '../../Custom/LoginButtons'

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { LoginEmail } from '../../_DbAccessFunctions';

import {
    Wrapper,
    SignUpMessage,
    FormWrapper,
    Logo,
    Error,
    AuthButtonsWrapper,
} from './LoginElements'

const Login = () => {
    const history = useHistory()
    const goto = url => () => history.push(url)

    const [loginError, setLoginError] = useState(false)
    const [loginCreds, setLoginCreds] = useState(false)
    const [showEmailLogin, setShowEmailLogin] = useState(false)
    const [socialLogin, setSocialLogin] = useState(false)
    const onSubmit = data => {
        setLoginCreds(data)
        setShowEmailLogin(false)
    }
    const notify = (action) => (payload) => {
        if (payload === 'email') setShowEmailLogin(true)
        if (payload !== 'email') setSocialLogin(payload)
    }
    const authButtonsConfig = {
        type: 'signup',
        actions: ['email', 'google', 'facebook', 'twitter']
    }

    useEffect(() => {
        (async () => {
            if(loginCreds) {
                const {success, result, error} = await LoginEmail(loginCreds)
                console.log('login', success, result)
               history.push('/account')
            }
            return () => setLoginCreds(false)
        })()
    }, [loginCreds, history])

    useEffect(() => {
        (async () => {
            if(socialLogin) {

            }
        })()
    }, [socialLogin])
    return (
        <Wrapper>
            <FormWrapper>
                <Logo action={goto('/')}/>
                {loginError && <Error msg={loginError} />}
                <AuthButtonsWrapper>
                    <AuthButtons notify={notify("login")} {...authButtonsConfig} />
                </AuthButtonsWrapper>
                <SignUpMessage action={goto('/signup')} />
                <Dialog
                    open={showEmailLogin}
                    onClose={() => setShowEmailLogin(false)}
                    maxWidth="xs"
                    fullWidth={true}
                >
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <AutoForm
                            submitBtnText="Login"
                            onSubmit={onSubmit}
                            schema={FormSchemas.loginForm}
                        />
                    </DialogContent>
                </Dialog>
            </FormWrapper>
        </Wrapper>
    )
}

export default Login
