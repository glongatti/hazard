import React from 'react';

import BuscaAlertas from './../../Components/BuscaAlertas/BuscaAlertas'

import "./../Cadastro/cadastro.css"
import { Spin } from 'antd';
import { appConfig } from './../../config'
import axios from 'axios';


class Alertas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userLat: 0,
            userLng: 0,
            isLoading: true,
            alerts: []
        }
    }

    async getAllAlerts() {
        return axios.get(appConfig.apiRoot + 'alerta')
    }

    componentDidMount() {
        var self = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                self.setState({
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude,
                })
            }, function (error) {
                // console.log('error', error)
            }
        )

        this.getAllAlerts().then((result) => {
            const alerts = result.data.body.map((value, index) => value)
            self.setState({
                alerts: alerts,
                isLoading: false
            })
        }).catch((err) => {
            console.log(err)
        })
    }



    render() {
        if (this.state.isLoading) {
            return (
                <Spin size="large" />
            )
        } else {
            return (
                <div>
                    {/* <h1 className={"loginTitle"}>Alertas Próximos a você!</h1> */}


                    <BuscaAlertas
                        isMarkerShown
                        lat={this.state.userLat}
                        lng={this.state.userLng}
                        alerts={this.state.alerts}
                        googleMapURL={appConfig.apiGoogleMapsURL}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100vh` }} />}
                        // containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                </div>
            );
        }
    }
}


export default Alertas
