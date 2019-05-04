
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const mapStyles = {
    width: '100%',
    height: '500px',
};

export class BuscaAlertas extends Component {
    render() {

        return (
            <div>
                <GoogleMap
                    defaultZoom={50}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                >
                    <Marker
                        position={{ lat: this.props.lat, lng: this.props.lng }}
                    />
                </GoogleMap>
            </div>
        );
    }
}

export default withScriptjs(withGoogleMap(BuscaAlertas))
