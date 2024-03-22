import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Fab from '@mui/material/Fab'
import './swipeDrower.css'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { Link, useNavigate } from 'react-router-dom'
import { AdminUthContext } from '../../context/admin/AdminContext'
import { useContext } from 'react'
import axios from 'axios'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import StoreIcon from '@mui/icons-material/Store'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { GridMenuIcon } from '@mui/x-data-grid'



export default function SwipeableTemporaryDrawer ({ toggleDrawer, open }) {
  const navigate = useNavigate()
  const { dispatch } = useContext(AdminUthContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    axios
      .post('/admin/logout')
      .then(response => {
        console.log('Logout successful', response.data)

        navigate('/adminlogin')
      })
      .catch(error => {
        console.error('Logout failed', error)
      })
  }

  const handleNavigate = text => {
    text == 'Dashboard'
      ? navigate('/admin')
      : text == 'Users'
      ? navigate('/users')
      : text == 'Owners'
      ? navigate('/owners')
      : text === 'Blogs'
      ? navigate('/BlogsList')
      : text === 'Booking'
      ? navigate('/BookingList')
      : ''
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        {['Dashboard', 'Users', 'Owners', 'Blogs', 'Booking'].map(text => (
          <ListItem
            onClick={() => handleNavigate(text)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                {text === 'Dashboard' ? (
                  <DashboardIcon className='icon' />
                ) : text === 'Users' ? (
                  <PersonOutlineIcon className='icon' />
                ) : text === 'Owners' ? (
                  <StoreIcon className='icon' />
                ) : text === 'Blogs' ? (
                  <CreditCardIcon className='icon' />
                ) : text === 'Booking' ? (
                  <CreditCardIcon className='icon' />
                ) : (
                  ''
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map(text => (
          <ListItem onClick={handleLogout} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <div className='drowerMain'>
        <div className='febDiv'>

      <Fab
        onClick={toggleDrawer(true)}
        size='medium'
        color='secondary'
        aria-label='add'
       
      >
        <GridMenuIcon/>
      </Fab>
        </div>
      <Link to='/admin' style={{ textDecoration: 'none' }}>
        <h1>ADMIN PANEL</h1>
      </Link>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
      >
        <Avatar alt='Remy Sharp' src='/images/images (2).jpeg' />
      </StyledBadge>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
