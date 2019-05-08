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
            msgText: ''
        }
    }

    async createAlert(jsonObject) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.post('http://127.0.0.1:8090/alerta', jsonObject, headers)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const user = JSON.parse(localStorage.getItem('user'))
                // console.log('values',values)
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
                console.log('json', json)
                this.createAlert(json).then((result) => {
                    self.setState({
                        hasMsg: true,
                        msgText: 'Parabéns o seu alerta foi criado com sucesso!',
                        msgType: 'success'
                    })
                }).catch((err) => {
                    console.log('deu ruim', err.response)
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

    }


    render() {

        if (this.state.isLoading) {
            return (<p>Carregando...</p>)
        } else if (!this.state.isLoading && !this.state.user) {
            return <Redirect to="/login" />
        } else {
            const { getFieldDecorator } = this.props.form;

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
                                        <Option value="1">Option 1</Option>
                                        <Option value="2">Option 2</Option>
                                        <Option value="3">Option 3</Option>
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
