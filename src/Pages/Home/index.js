import React from 'react'
import Nav from '../../Components/Nav'
import PageTitle from '../../Custom/PageTitle'
import { NAV_LINKS } from '../../_Customize'

import {
    About,
    Contact,
    Hero,
    Services,
    Wrapper,
} from './HomeElements'

const Home = ({user, profile, switchTheme}) => {
    return (
        <Wrapper>
            <PageTitle title="Home"/>
            <Nav links={NAV_LINKS} user={user} profile={profile} switchTheme={switchTheme}/>
            <Hero></Hero>
            <About></About>
            <Services></Services>
            <Contact></Contact>
        </Wrapper>
    )
}

export default Home
