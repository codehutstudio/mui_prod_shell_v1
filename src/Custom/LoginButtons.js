import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import googleLogo from '../assets/images/google.svg'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Button } from '@material-ui/core';

const GoogleIcon = styled(SVG).attrs({
    src: googleLogo
})`
    height: 20px;
    width: 20px;
`
export const Page = styled.div`
    height: 100vh;
    width: 100vw;
`
const classes = {
    google: {
        background: '#fff',
        color: '#757575',
    },
    facebook: {
        background: '#3b5998',
        color: "#fff",
    },
    twitter: {
        background: '#55acee',
        color: "#fff",
    },
    email: {
        background: "#db4437",
        color: "#fff",
    }
}
export const ThirdPartyLoginButton = ({type, action}) => {
    return (
        <>
            {type === 'google' && (<Button variant="contained" style={{...classes.google}} onClick={() => action("google")} startIcon={<GoogleIcon />}>Google</Button>) }
            {type === 'facebook' && (<Button variant="contained" style={{...classes.facebook}} onClick={() => action("facebook")} startIcon={<FacebookIcon />}>Facebook</Button>) }
            {type === 'twitter' && (<Button variant="contained" style={{...classes.twitter}} onClick={() => action("twitter")} startIcon={<TwitterIcon />}>Twitter</Button>) }
            {type === 'email' && (<Button variant="contained" style={{...classes.email}} onClick={() => action("email")} startIcon={<MailOutlineIcon />}>Email</Button>) }
        </>
    )
}
export const AuthButtons = ({ actions, notify }) => {
    return (
        <>
            {actions.map((a, i) => (
                <ThirdPartyLoginButton key={i} action={notify} type={a} />
            ))}
        </>
    )
}