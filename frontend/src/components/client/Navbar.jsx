import { useContext } from 'react'
import { AuthContext } from '../../context/client/AuthContext'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons'

export default function Navbar () {
  const navigate = useNavigate()

  const { user, dispatch } = useContext(AuthContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    axios
      .post('/logout')
      .then(response => {
        console.log('Logout successful', response.data)

        navigate('/login')
      })
      .catch(error => {
        console.error('Logout failed', error)
      })
  }

  return (
    <div className='navbarHome'>
      <div className='navContainer'>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>WANDERINN</span>
        </Link>

        <div className='navItems'>
          {user ? (
            <>
              <div className='navIcon'>
                {' '}
                <FontAwesomeIcon icon={faUserCheck} />
              </div>

              <div className='userName'> {user.name}</div>
              <button className='logoutButton' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className='navBtnWrap'>

              <Link to='/login'>
                <button className='navButton'>Login</button>
              </Link>
              <Link to='/register'>
                <button className='navButton'>Register</button>
              </Link>
            </div>
           
          )}
        </div>
      </div>
    </div>
  )
}
