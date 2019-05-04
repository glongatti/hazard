import React from 'react';

import {
    Form, Icon, Input, Button, Alert
} from 'antd';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";


import "./../Cadastro/cadastro.css"
class Cadastro extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            userAuthenticated: false,
            hasRequestError: false,
            errorMsg: ''
        }
    }

    async registerRequest(obj) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.post(`http://127.0.0.1:8090/usuario`, obj, headers)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {

                var jsonObject = {
                    "nome": values["nome"],
                    "email": values["email"],
                    "senha": values["senha"]
                }

                // vai fazer request axios para logar
                this.registerRequest(jsonObject).then((response) => {
                    if (response.status == 200) {

                        const userObject = {
                            id: response.data.id,
                            email: response.data.email,
                            name: response.data.nome
                        }

                        localStorage.setItem('user', JSON.stringify(userObject))
                        self.setState({
                            userAuthenticated: true
                        })

                    }
                }).catch((err) => {
                    console.log(err)
                    if (err.response) {
                        self.setState({
                            hasRequestError: true,
                            errorMsg: err.response.data.error
                        })

                    } else {
                        self.setState({
                            hasRequestError: true,
                            errorMsg: "Erro Interno no Servidor, por favor tente novamente mais tarde!"
                        })

                    }

                })

            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        if (this.state.userAuthenticated) return <Redirect to={"/meus-alertas"} />;

        return (
            <div>
                <h1 className={"loginTitle"}>Formulário de Cadastro</h1>
                <div className={"divLogin"}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <p>Por favor, preencha os campos abaixo para poder fazer o seu cadastro</p>
                        <Form.Item>
                            {getFieldDecorator('nome', {
                                rules: [{ required: true, message: 'Preencha seu nome completo!' }],
                            })(
                                <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Nome Completo" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'O e-mail inserido não é válido!',
                                },
                                { required: true, message: 'Por favor insira seu e-mail!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('senha', {
                                rules: [{ required: true, message: 'Preencha sua senha por favor!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Senha" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Criar Conta
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                {this.state.hasRequestError && (
                    <Alert style={{ margin: ' 20px auto', maxWidth: 500 }} type={"error"} message={"Erro!"} description={this.state.errorMsg} />
                )}
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Cadastro);

export default WrappedNormalLoginForm
