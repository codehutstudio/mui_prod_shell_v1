import { Breadcrumbs, Typography } from '@material-ui/core'
import { capitalCase } from 'change-case'
import { Link } from 'react-router-dom'
import { breadCrumbsFromPathname } from '../Custom/BreadCrumbs'

const AppBreadcrumbs = ({link}) => {
    const pathLinks = breadCrumbsFromPathname(link)
    const linksCount = pathLinks.length
    return (
        <Breadcrumbs>
        {pathLinks.map((link, idx) => (
            idx < linksCount
                ? <Link style={{textDecoration: 'none'}} color="primary" key={idx} to={link}>{capitalCase(link.replace('/', ''))}</Link>
                : <Typography key={idx}>{capitalCase(link.replace('/', ''))}</Typography>
        ))}
    </Breadcrumbs>
    )
}

export default AppBreadcrumbs
