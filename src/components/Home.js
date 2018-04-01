import React from 'react'
import { render } from 'react-dom'
import { Map , TileLayer, Marker, Popup, Circle } from 'react-leaflet'

export default class Home extends React.Component<Props, *> {
  constructor() {
    super()
    this.state = {
      lat: 47.22354,
      lng: 8.81714,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position} draggable={true}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
          <Circle center={position} radius={200}  />
        </Marker>
      </Map>
    );
  }
}