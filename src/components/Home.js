// @flow

import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div class="ui center aligned segment">
    { isAuthenticated
      ? <div>
          <p>Willkommen zurück!</p>
          <Link to={'/dashboard'}>Map</Link>
        </div>
      : <div className="ui padded segment">
          <Link className="ui teal button" to={'/login'}>Einloggen</Link>
          <div className="ui horizontal divider">Or</div>
          <Link className="ui blue button" to={'/signup'}>Registrieren</Link>
        </div>
    }
  </div>
)

export default Home
