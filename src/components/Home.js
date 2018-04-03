// @flow

import React from 'react'
import {Map, TileLayer, Marker, Popup, Circle} from 'react-leaflet'

type State = {
    center: {
        lat: number,
        lng: number
    },
    marker: {
        lat: number,
        lng: number
    },
    zoom: number,
    draggable: boolean,
    radius: number
}

type Props = {
    authUser: { uid: string, },
}

export default class Home extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            center: {
                lat: 47.22354,
                lng: 8.81714,
            },
            marker: {
                lat: 47.22354,
                lng: 8.81714
            },
            zoom: 13,
            draggable: true,
            radius: 200
        }
    }

    toggleDraggable = () => {
        this.setState({draggable: !this.state.draggable})
    };

    updatePosition = () => {
        const {lat, lng} = this.refs.marker.leafletElement.getLatLng();
        this.setState({
            marker: {lat, lng}
        })
    };

    render() {
        const position = [this.state.center.lat, this.state.center.lng];
        const markerPosition = [this.state.marker.lat, this.state.marker.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker draggable={this.state.draggable}
                        onDragend={this.updatePosition}
                        position={markerPosition}
                        ref="marker">
                    <Popup>
                        <span>I am a draggable Pin <br/> Easily customizable.</span>
                    </Popup>
                    <Circle center={markerPosition}
                            radius={this.state.radius}
                            ref="circle"
                    />
                </Marker>
            </Map>
        );
    }
}