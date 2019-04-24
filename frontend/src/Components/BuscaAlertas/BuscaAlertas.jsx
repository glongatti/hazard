
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '500px',
};

export class BuscaAlertas extends Component {
    render() {

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC7dOyAjw13KOMhdjebtBSQ-YbEU4v7PFI'
})(BuscaAlertas);
