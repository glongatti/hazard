import React from 'react';

import {
    Form, Icon, Input, Button, Select, Alert
} from 'antd';
import { Redirect } from "react-router-dom";

import "./cadastro-alerta.css"
import axios from 'axios';
import moment from 'moment'

const { TextArea } = Input;
const { Option } = Select;


class CadastroAlerta extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: null,
            userLat: 0,
            userLng: 0,
            hasMsg: false,
            msgText: '',
            tiposAlertas: []
        }
    }

    async createAlert(jsonObject) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.post('http://127.0.0.1:8090/alerta', jsonObject, headers)
    }

    async getTipoAlertas() {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.get('http://127.0.0.1:8090/tipoAlerta', headers)
    }



    handleSubmit = (e) => {
        e.preventDefault();
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const user = JSON.parse(localStorage.getItem('user'))
                var json = {
                    nome: values['nome'],
                    descricao: values['descricao'],
                    latitude: this.state.userLat,
                    longitude: this.state.userLng,
                    criacao: moment().utc().format('YYYY-MM-DD'),
                    usuario: {
                        id: user.id
                    },
                    tipoAlerta: {
                        id: values['tipo']
                    }
                }
                this.createAlert(json).then((result) => {
                    self.setState({
                        hasMsg: true,
                        msgText: 'Parabéns o seu alerta foi criado com sucesso!',
                        msgType: 'success'
                    })
                }).catch((err) => {
                    console.log('Erro', err.response)
                })
            }
        });
    }

    componentDidMount() {
        var self = this;
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.setState({
                user: user,
            })
        } else {
            this.setState({
                user: null,
                isLoading: false
            })
        }


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

        this.getTipoAlertas().then((result) => {

            const tipos = result.data.body.map((index, value) => {
                return {
                    ID: index.id,
                    Nome: index.nome
                }
            })
            console.log(tipos)
            self.setState({
                tiposAlertas: tipos
            })
        }).catch((err) => {
            console.log('err', err)
        })

    }


    render() {

        if (this.state.isLoading) {
            return (<p>Carregando...</p>)
        } else if (!this.state.isLoading && !this.state.user) {
            return <Redirect to="/login" />
        } else {
            const { getFieldDecorator } = this.props.form;

            const options = this.state.tiposAlertas.map((index, value) => <Option value={index.ID}>{index.Nome}</Option>)
            console.log('optios',options)
            return (
                <div>
                    <h1 className={"loginTitle"}>Cadastro de Alerta</h1>
                    <div className={"divLogin"}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <p>Por favorr, preencha os campos abaixo para poder fazer o cadastro do alerta</p>
                            <Form.Item>
                                {getFieldDecorator('nome', {
                                    rules: [{ required: true, message: 'Preencha o nome do alerta' }],
                                })(
                                    <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Nome do Alerta" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('descricao', {
                                    rules: [
                                        { required: true, message: 'Por favor insira a descrição do alerta!' }],
                                })(
                                    <TextArea rows={4} placeholder="Descrição do Alerta" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('tipo', {
                                    rules: [{ required: true, message: 'Preencha sua senha por favor!' }],
                                })(
                                    <Select defaultValue="1" placeholder="Tipo de Alerta">
                                        {/* <Option value="0">Assalto</Option>
                                        <Option value="1">Deslizamento ou escorregamento de terra</Option>
                                        <Option value="2">Epidemias</Option>
                                        <Option value="3">Inundação</Option>
                                        <Option value="4">Incêndios</Option>
                                        <Option value="5">Rajadas violentas de vento</Option>
                                        <Option value="6">Sismo</Option>
                                        <Option value="7">Tempestades</Option>
                                        <Option value="7">Troca de tiros</Option> */}
                                        {options}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Cadastrar Alerta
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    {this.state.hasMsg && (
                        <Alert style={{ margin: ' 20px auto', maxWidth: 500 }} type={this.state.msgType} message={"Atenção"} description={this.state.msgText} />
                    )}
                </div>
            );
        }


    }
}

const WrappedNormalLoginForm = Form.create()(CadastroAlerta);

export default WrappedNormalLoginForm
