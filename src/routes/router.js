import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import LockDetails from '../components/Lock/components/lockDetails'
import SettingsContainer from '../components/Lock/SettingsContainer'
import LayoutUser from '../components/User/userLayout'
import ProfileContainer from '../components/Profile/ProfileContainer'
import LoginContainer from '../components/Auth/loginLayout'
import LockUsersLayout from '../components/LockUsers/lockUsersLayout'
import Dash from '../components/dash'
import NotFound from '../common/components/notFound'
import MainNavbar from './../common/components/navbar'
import NewLock from '../components/Lock/NewLock'
import NewConfiguration from '../components/Configuration/NewConfiguration'
import BrowseClusterDoors from '../components/Cluster/BrowseClusterDoors'

const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }
  return true
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )}
  />
)

export default props => (
  <div>
    <Router>
      <Switch>
        <AuthRoute path="/" exact component={Dash} />
        <Route path="/login" component={LoginContainer} />
        <AuthRoute path="/user/:userId" component={LayoutUser} />
        <AuthRoute path="/profile" component={ProfileContainer} />
        <AuthRoute path="/log/:itemId" component={LockDetails} />
        <AuthRoute
          path="/settings/:itemId"
          component={SettingsContainer}
        />
        <AuthRoute
          path="/browseclusterdoors/:lockid"
          component={BrowseClusterDoors}
        />
        <AuthRoute path="/tolock/:itemId" component={LockUsersLayout} />
        <AuthRoute path="/newlock" component={NewLock} />
        <AuthRoute path="/newconfiguration" component={NewConfiguration} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </div>

)
