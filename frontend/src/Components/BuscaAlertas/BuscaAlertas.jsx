
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


export class BuscaAlertas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedAlert: {},
            showInfo: false,
            index: 0
        }
    }

    render() {

        const renderMap = this.props.alerts.map((value, index) => {
            let imgSrc = '';
            switch (value.tipoAlerta.id) {
                case 2:
                    imgSrc = 'https://svgshare.com/i/DTt.svg'
                    break;
                case 3:
                    imgSrc = 'https://svgshare.com/i/DVT.svg'
                    break;
                case 4:
                    imgSrc = 'https://svgshare.com/i/DUx.svg'
                    break;
                case 5:
                    imgSrc = 'https://svgshare.com/i/DV9.svg'
                    break;
                case 6:
                    imgSrc = 'https://svgshare.com/i/DVH.svg'
                    break;
                case 7:
                    imgSrc = 'https://svgshare.com/i/DUN.svg'
                    break;
                case 8:
                    imgSrc = 'https://svgshare.com/i/DVU.svg'
                    break;
                case 9:
                    imgSrc = 'https://svgshare.com/i/DTu.svg'
                    break;
                case 10:
                    imgSrc = 'https://svgshare.com/i/DVV.svg'
                    break;
            }

            
            return (<Marker
                key={value.id}
                animation={"DROP"}
                label={""}
                position={{ lat: value.latitude, lng: value.longitude }}
                onClick={() => { this.setState({ selectedAlert: value, index, showInfo: true }) }}
                icon={{ url: imgSrc, scaledSize: { width: 40, height: 40 } }}
            />)
        }
        )
        return (
            <div>
                <GoogleMap
                    defaultZoom={6}
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
                                <p><strong>{this.state.selectedAlert.nome}</strong></p>
                                <p>{this.state.selectedAlert.descricao}</p>
                                <p><strong>Tipo de Alerta: {this.state.selectedAlert.tipoAlerta.nome}</strong></p>
                            </div>
                        </InfoWindow>
                    )}

                </GoogleMap>
            </div>
        );
    }
}

export default withScriptjs(withGoogleMap(BuscaAlertas))
