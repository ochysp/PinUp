// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const Home = () => (
  <div class="ui center aligned segment">
    {
       <div>
          <p>Willkommen</p>
          <Link to={'/map'}>Map</Link>
       </div>
    }
  </div>
)

export default Home
