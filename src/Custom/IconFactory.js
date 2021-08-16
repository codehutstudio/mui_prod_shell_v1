import { AiOutlineHome } from 'react-icons/ai'
import StorageIcon from '@material-ui/icons/Storage';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LockIcon from '@material-ui/icons/Lock';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import LinkIcon from '@material-ui/icons/Link';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const iconDictionary = {
    home: AiOutlineHome,
    projects: AccountTreeOutlinedIcon,
    messages: TextsmsOutlinedIcon,
    documents: InsertDriveFileOutlinedIcon,
    admin: LockIcon,
    database: StorageIcon,
    dashboard: DashboardOutlinedIcon,
    invoices: ReceiptIcon,
    users: PeopleIcon,
    profile: PersonIcon,
    account: PersonIcon,
    links: LinkIcon,
    default: HelpOutlineIcon,
}

const IconFactory = name => {
      const TagName = iconDictionary[name] || iconDictionary.default
    return <TagName/>
}

export default IconFactory