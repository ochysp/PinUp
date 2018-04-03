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
            markerIsSet: false,
            center: {
                lat: 47.22354,
                lng: 8.81714,
            },
            marker: {
                lat: 47.22354,
                lng: 8.1714,
            },
            zoom: 13,
            draggable: true,
            radius: 200,
            // TODO markers sollte man zu Pins oder Post umändern um so Pins oder Posts auf der Map anzuzeigen (müsste geladen werden)
            markers: [/*[47.22354, 8.81714]*/]
        }
    }

    toggleDraggable = () => {
        this.setState({draggable: !this.state.draggable})
    };

    //TODO update im array anpassen anhand von index
    updatePosition = () => {
        const {lat, lng} = this.refs.marker.leafletElement.getLatLng();
        this.setState({
            marker: {lat, lng},
            circle: {lat, lng}
        })
    };

    //TODO Pins erstellen zur zeit wird nur die Position übergeben
    createPin = () => {
        console.log('create Pin at ' + this.refs.marker.leafletElement.getLatLng())
    }
    //TODO Posts erstellen zur zeit wird nur die Position übergeben
    createPost = () => {
        console.log('create Post at ' + this.refs.marker.leafletElement.getLatLng())
    }

    setMarker = (e) => {
        //const {marker} = this.state
        const {lat, lng} = e.latlng;
        //marker.push(e.latlng)
        this.setState({
            markerIsSet: true,
            marker: {lat, lng}
        })
    };
    /*addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    };*/

    render() {
        const startPosition = [this.state.center.lat, this.state.center.lng];
        const pathCreatePin = "";
        const pathCreatePost = "";
        // TODO Wird zur Zeit in PopUp referenziert

        const marker = this.state.markerIsSet ? (
            <Marker
                draggable={this.state.draggable}
                onDragend={this.updatePosition}
                position={this.state.marker}
                ref="marker">
                <Popup>
                    <span>
                        Create a<br/>
                        <a href={pathCreatePin} onClick={this.createPin}>
                            Pin
                        </a>
                        <br/>
                        <a href={pathCreatePost} onClick={this.createPost}>
                            Post
                        </a>
                    </span>
                </Popup>
            </Marker>
        ):null


        return (
            <Map center={startPosition}
                 zoom={this.state.zoom}
                 onClick={this.setMarker}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                //Array of markers * can be used later to show Pins
                /*{this.state.markers.map((position, index) =>
                    <Marker key={'marker-${index}'}
                            draggable={this.state.draggable}
                            onDragend={this.updatePosition}
                            position={position}
                            ref="marker">
                        <Popup>
                            <span>I am a draggable Pin<br/> Pin#: {index}</span>
                        </Popup>
                        <Circle key={'circle-${index}'}
                                center={position}
                                radius={this.state.radius}
                                ref="circle"
                        />
                    </Marker>
                )}*/
                {marker}
            </Map>
        );
    }
}