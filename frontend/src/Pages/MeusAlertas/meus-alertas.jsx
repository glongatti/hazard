import React from 'react';

import { Table, Divider, Row, Col, Button, Modal } from 'antd';

import "./../Cadastro/cadastro.css"
import { Redirect, Link } from "react-router-dom";
import moment from 'moment'
import axios from 'axios';

const confirm = Modal.confirm;





class MeusAlertas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: null,
            alerts: []
        }
    }
    async getUserInfo(id) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.get(`http://127.0.0.1:8090/usuario/${id}`, null, headers)
    }

    async deleteAlert(alertId) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.delete(`http://127.0.0.1:8090/alerta/${alertId}`, null, headers)
    }

    showDeleteConfirm(value) {
        var self = this;
        const userToken = JSON.parse(localStorage.getItem('user'))

        confirm({
            title: 'Você tem certeza que deseja excluir este alerta?',
            content: 'Atenção, esta ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                self.deleteAlert(value.key).then((result) => {
                    self.getUserInfo(userToken.id).then((result) => {
                        const user = result.data.body

                        if (user.alertas) {
                            const alerts = user.alertas.map((value, index) => {
                                return {
                                    key: value.id,
                                    titulo: value.nome,
                                    descricao: value.descricao,
                                    tipo: value.tipoAlerta.nome,
                                    localizacao: value.latitude + ',' + value.longitude,
                                    data: moment(value.criacao).format('DD/MM/YYYY')

                                }
                            })
                            self.setState({
                                user: user,
                                isLoading: false,
                                alerts: alerts
                            })
                        } else {
                            self.setState({
                                user: user,
                                isLoading: false,
                                alerts: []
                            })
                        }
                    })
                }).catch((err) => {

                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    componentDidMount() {
        var self = this;
        const userToken = JSON.parse(localStorage.getItem('user'))
        
        this.getUserInfo(userToken.id).then((result) => {
            const user = result.data.body

            if (user.alertas) {
                const alerts = user.alertas.map((value, index) => {
                    return {
                        key: value.id,
                        titulo: value.nome,
                        descricao: value.descricao,
                        tipo: value.tipoAlerta.nome,
                        localizacao: value.latitude + ',' + value.longitude,
                        data: moment(value.criacao).format('DD/MM/YYYY')

                    }
                })
                self.setState({
                    user: user,
                    isLoading: false,
                    alerts: alerts
                })
            } else {
                self.setState({
                    user: user,
                    isLoading: false,
                    alerts: []
                })
            }

        }).catch((err) => {
            console.log('err', err)

            self.setState({
                user: null,
                isLoading: false
            })
        })

    }
    render() {

        const columns = [
            {
                title: 'Título',
                dataIndex: 'titulo',
                key: 'titulo',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: 'Descrição',
                dataIndex: 'descricao',
                key: 'descricao',
            }
            , {
                title: 'Tipo',
                dataIndex: 'tipo',
                key: 'tipo',
            }, {
                title: 'Localização',
                dataIndex: 'localizacao',
                key: 'localizacao',
            }, {
                title: 'Data da Criação',
                key: 'data',
                dataIndex: 'data'
            }, {
                title: 'Ação',
                key: 'acao',
                render: (text, record) => (
                    <span>
                        <a href="/">Editar {record.text}</a>
                        <Divider type="vertical" />
                        <a href="#" onClick={() => this.showDeleteConfirm(record)}>Deletar</a>
                    </span>
                ),
            }];


        if (this.state.isLoading) {
            return (<p>Carregando...</p>)
        } else if (!this.state.isLoading && !this.state.user) {
            return <Redirect to="/login" />
        } else {
            return (
                <div>
                    <Row>
                        <Col span={24} >
                            <h1 className={"loginTitle"}>Meus Alertas</h1>
                        </Col>

                        <Col span={20} offset={2}>
                            {this.state.user.alertas ? <Table columns={columns} dataSource={this.state.alerts} /> : <h3>Ops... parece que você não tem nenhum alerta cadastrado!</h3>}

                            {/* <Table columns={columns} dataSource={data} /> */}
                        </Col>
                        <Col span={24} style={{ marginBottom: 20 }}>
                            <Link to="/cadastro-alerta"> <Button type="primary">Cadastrar Alerta</Button></Link>
                        </Col>
                    </Row>


                </div>
            );
        }

    }
}


export default MeusAlertas
