import React from 'react';

import BuscaAlertas from './../../Components/BuscaAlertas/BuscaAlertas'

import "./../Cadastro/cadastro.css"
import { Spin } from 'antd';
import { appConfig } from './../../config'


class Alertas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userLat: 0,
            userLng: 0,
            isLoading: true
        }
    }
    componentDidMount() {
        var self = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                self.setState({
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude,
                    isLoading: false
                })
            }, function (error) {
                console.log('error', error)
            }
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spin size="large" />
            )
        } else {
            return (
                <div>
                    <h1 className={"loginTitle"}>Alertas Próximos a você!</h1>


                    <BuscaAlertas
                        isMarkerShown
                        lat={this.state.userLat}
                        lng={this.state.userLng}
                        googleMapURL={appConfig.apiGoogleMapsURL}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                </div>
            );
        }
    }
}


export default Alertas
