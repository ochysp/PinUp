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
            zoom: 13,
            draggable: true,
            radius: 200,
            markers: [[47.22354, 8.81714]]
        }
    }

    toggleDraggable = () => {
        this.setState({draggable: !this.state.draggable})
    };

    //TODO update im array anpassen anhand von index
    updatePosition = () => {
        const {lat, lng} = this.refs.marker.leafletElement.getLatLng();
        this.setState({
            marker: {lat, lng}
        })
    };

    addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    render() {
        const startPosition = [this.state.center.lat, this.state.center.lng];
        return (
            <Map center={startPosition}
                 zoom={this.state.zoom}
                 onClick={this.addMarker}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.state.markers.map((position, index) =>
                    <Marker key={'marker-${index}'}
                            draggable={this.state.draggable}
                            onDragend={this.updatePosition}
                            position={position}
                            ref="marker">
                        <Popup>

                            <span>I am a draggable Pin<br/> Pin#: {index}</span>
                        </Popup>
                        <Circle center={position}
                                radius={this.state.radius}
                                ref="circle"
                        />
                    </Marker>
                )}
            </Map>
        );
    }
}