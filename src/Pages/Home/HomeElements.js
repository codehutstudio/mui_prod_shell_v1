import styled from 'styled-components'

const Page = styled.div`
    height: 100vh;
    width: 100%;
`
export const Wrapper = styled.div``

const HeroWrapper = styled(Page).attrs({
    name: 'home'
})`
    margin-top: 64px;
`
const AboutWrapper = styled(Page).attrs({
    name: 'about'
})``
const ServicesWrapper = styled(Page).attrs({
    name: 'services'
})``
const ContactWrapper = styled(Page).attrs({
    name: 'contact'
})``

export const Hero = () => {
    return (
        <HeroWrapper>
            Hero
        </HeroWrapper>
    )
}

export const About = () => {
    return (
        <AboutWrapper>
            About
        </AboutWrapper>
    )
}

export const Services = () => {
    return (
        <ServicesWrapper>
            Services
        </ServicesWrapper>
    )
}

export const Contact = () => {
    return (
        <ContactWrapper>
            contact
        </ContactWrapper>
    )
}