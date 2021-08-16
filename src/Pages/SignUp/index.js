import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { AutoForm } from '../../Custom/AutoForm'
import { AuthButtons } from '../../Custom/LoginButtons'
import { FormSchemas, SIGNUP_ERROR_CODES, SOCIAL_LOGINS } from '../../_Customize'
import { AuthButtonsWrapper, Error, FormWrapper, LoginMessage, Logo, Wrapper } from './SignUpElements'
import { SignUpEmail } from '../../_DbAccessFunctions';


const SignUp = () => {
    const history = useHistory()
    const goto = url => () => history.push(url)

    const [signupCreds, setSignupCreds] = useState(false)
    const onSubmit = data => {
        setShowEmailSignUp(false)
        setSignupCreds(data)
    }
    const notify = (action) => (payload) => {
        if (payload === 'email') setShowEmailSignUp(true)
        if (payload !== 'email') setSocialSignup(payload)
    }
    const [showEmailSignUp, setShowEmailSignUp] = useState(false)
    const hideEmailSignUp = () => {
        setShowEmailSignUp(false)
    }
    const [socialSignup, setSocialSignup] = useState(false)
    const handleSocialSignUpError = ({ code }) => {
        setSignupError(SIGNUP_ERROR_CODES[code])
    }

    const [signupError, setSignupError] = useState(false)

    useEffect(() => {
        const signup = async () => {
            if (signupCreds) {
                const result = await SignUpEmail(signupCreds);
                (result.error && handleSocialSignUpError(result.error));
                (result.success && goto('/account')());

                return () => setSignupError(false)
            }
        }
        signup()
    }, [signupCreds])

    useEffect(() => {
        (async () => {
            if (socialSignup) {
                const result = await SOCIAL_LOGINS[socialSignup]();
                (result.error && handleSocialSignUpError(result.error));
                (result.success && goto('/account')());
            }
        }

        )()
    }, [socialSignup])

    const authButtonsConfig = {
        type: 'signup',
        actions: ['email', 'google', 'facebook', 'twitter']
    }
    return (
        <Wrapper>
            <FormWrapper>
                <Logo action={goto('/')}/>
                {signupError && <Error msg={signupError} />}
                <AuthButtonsWrapper>
                    <AuthButtons notify={notify("signup")} {...authButtonsConfig} />
                </AuthButtonsWrapper>
                <LoginMessage action={goto('/login')} />
                <Dialog
                    open={showEmailSignUp}
                    onClose={hideEmailSignUp}
                    maxWidth="xs"
                    fullWidth={true}
                >
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent>
                        <AutoForm submitBtnText="Sign Up" onSubmit={onSubmit} schema={FormSchemas.loginForm} />
                    </DialogContent>
                </Dialog>
            </FormWrapper>
        </Wrapper>
    )
}

export default SignUp
