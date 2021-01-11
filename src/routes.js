import React from 'react'
import {Route, Switch,  Redirect} from "react-router-dom";
import {ROUTE_CONSTANTS} from './routeConstants'


/* Page Imports */
import BookViewer from './pages/BookViewer'
import Conact from './pages/contact'
import Library from './pages/library'
import Login from './pages/login'
import SignUp from './pages/signUp'

export const unauthRoutes = (
    <Switch>
        <Route exact path={ROUTE_CONSTANTS.SIGNUP_PAGE} component={SignUp} />
        <Route exact path={ROUTE_CONSTANTS.LOGIN_PAGE} component={Login} />
        <Redirect
            to={{
              pathname: ROUTE_CONSTANTS.LOGIN_PAGE
            }}
          />
    </Switch>
)

export const authRoutes = (
    <Switch>
        <Route exact path={ROUTE_CONSTANTS.LIBRARY_PAGE} component={Library} />
        <Route exact path={ROUTE_CONSTANTS.BOOK_PAGE} component={BookViewer} />
        <Route exact path={ROUTE_CONSTANTS.CONTACT_PAGE} component={Conact} />
        <Redirect
            to={{
              pathname: ROUTE_CONSTANTS.LIBRARY_PAGE
            }}
          />
    </Switch>
)
