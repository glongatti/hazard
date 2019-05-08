
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const mapStyles = {
    width: '100%',
    height: '500px',
};

export class BuscaAlertas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedAlert: {},
            showInfo: false,
            index: 0
        }
    }

    changeShowInfoState = (value) => {
        console.log('mudou', value)
    }

    render() {

        const renderMap = this.props.alerts.map((value, index) =>
            <Marker
                key={value.id}
                animation={"DROP"}
                label={(index + 1).toString()}
                position={{ lat: value.latitude, lng: value.longitude }}
                onClick={() => { this.setState({ selectedAlert: value, index, showInfo: true }) }}
            />

        )
        console.log(this.state.selectedAlert)
        return (
            <div>
                <GoogleMap
                    defaultZoom={7}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                >

                    {renderMap}
                    {this.state.showInfo && (
                        <InfoWindow
                            key={this.state.index}
                            position={{ lat: this.state.selectedAlert.latitude, lng: this.state.selectedAlert.longitude }}
                            onCloseClick={() => { this.setState({ selectedAlert: {}, showInfo: false }) }}
                        >
                            <div>
                                <p>{this.state.selectedAlert.nome}</p>
                                <p>{this.state.selectedAlert.descricao}</p>
                            </div>
                        </InfoWindow>
                    )}

                </GoogleMap>
            </div>
        );
    }
}

export default withScriptjs(withGoogleMap(BuscaAlertas))
