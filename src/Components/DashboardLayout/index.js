import { cloneElement, useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Hidden } from '@material-ui/core';
import { useEffect } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  chevron: {
    color: "#fff"
  },
  drawerOpen: {
    paddingTop: '48px',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    paddingTop: '48px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerMobileOpen: {
    height: '100%'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    }
  },
}));

export default function DashboardLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('xs'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  console.log(sm)

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [drawerStyle, setDrawerStyle] = useState('temporary');

  useEffect(() => {
    if (sm) {
      setDrawerStyle('temporary')
      open && setOpen(false)
    }
    !sm && setDrawerStyle('permanent')
  }, [sm])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openMobileMenu = () => {
    setOpenMobile(true);
  }
  const closeMobileMenu = () => {
    setOpenMobile(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {!sm && 
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          }
          {sm && 
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openMobileMenu}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          }
          <div className={classes.toolbar}>
            {open && !sm &&
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.chevron} /> : <ChevronLeftIcon className={classes.chevron} />}
              </IconButton>
            }

          </div>
          {props.toolbar}
        </Toolbar>
      </AppBar>
      <Drawer
        variant={drawerStyle}
        anchor={sm ? 'top' : 'left'}
        open={!sm ? open : openMobile}
        onClose={closeMobileMenu}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open && !sm,
          [classes.drawerClose]: !open && !sm,

        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open && !sm,
            [classes.drawerClose]: !open && !sm,
          }),
        }}
      >
        <Divider />
        {cloneElement(props.menu, {closeMobileMenu})}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.content}
      </main>
    </div>
  );
}
