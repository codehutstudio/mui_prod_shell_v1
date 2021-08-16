import styled from 'styled-components'
import {Button, Paper} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';


const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`
const LogoElement = styled.div`
    cursor: pointer;
`

export const Logo = ({action}) => (
    <LogoWrapper>
        <LogoElement onClick={action}>
            <LockIcon />
        </LogoElement>
    </LogoWrapper>
)

const ErrorMsg = styled(Alert)`
    position: relative;
`
export const Error = ({ msg }) => (<ErrorMsg severity="error">{msg}</ErrorMsg>)


export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FormWrapper = styled(Paper)`
    max-width: 350px;
    width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 10px;
    & > div {
        margin-bottom: 10px;
    }
`
export const AuthButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & button {
        margin-bottom: 20px;
    }
`

const MessageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & button {
        margin-left: 10px;
    }
`
export const LoginMessage = ({action}) => {
    return (
        <MessageWrapper>
            Already have an account? <Button variant='contained' color="primary" onClick={action}>Login</Button>
        </MessageWrapper>
    )
}   

