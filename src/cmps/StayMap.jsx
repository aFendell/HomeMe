import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';

class _GoogleMap extends Component {

    state = {
        lat: this.props.stay.loc.lat,
        lng: this.props.stay.loc.lng
    }

    onMapClicked = (props, map, ev) => {
        console.log("_GoogleMap ~ ev", ev)
        console.log("_GoogleMap ~ map", map)
        console.log("_GoogleMap ~ props", props)
        this.setState({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
    }

    render() {
        return (
            <div>
                <div className="map">
                    <Map className=""
                        google={this.props.google}
                        zoom={12}


                        // {console.log('loc: ', this.props.stay.loc.lat, this.props.stay.loc.lng)}
                        initialCenter={{

                            lat: this.props.stay.loc.lat,
                            lng: this.props.stay.loc.lng
                        }}
                        center={this.state}
                        onClick={this.onMapClicked}
                    >

                        <Marker
                            position={this.state}
                            name={'Current location'} />

                        <InfoWindow
                            visible={true}
                            position={this.state}
                        >
                            <div className="marker">
                                <h1>{"$" + this.props.stay.price}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyACGNqKBdDHLLnHdy2VSH1rGt3_coIbuM4')
    // apiKey: ('AIzaSyCkGXo73iO3SNrjIp9hxptFfE5duOCgKk4')
})(_GoogleMap)
