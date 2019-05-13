import React from 'react';

import {
    Form, Icon, Input, Button, Alert
} from 'antd';
import { Link, Redirect } from "react-router-dom";

import axios from 'axios';

import "./../Login/login.css"

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            userAuthenticated: false,
            hasRequestError: false,
            errorMsg: ''
        }
    }

    async loginRequest(email, password) {
        var headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }

        return axios.post(`http://127.0.0.1:8090/usuario/login?email=${email}&senha=${password}`, null, headers)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // vai fazer request axios para logar
                this.loginRequest(values['email'], values['password']).then((response) => {
                    if (response.status === 200) {
                        const userObject = {
                            id: response.data.body.id,
                            email: response.data.body.email,
                            name: response.data.body.nome,
                            alertas: response.data.body.alertas
                        }

                        this.props.login()
                        localStorage.setItem('user', JSON.stringify(userObject))
                        self.setState({
                            userAuthenticated: true
                        })

                    }
                }).catch((err) => {
                    console.log('err', err)
                    if (err.response) {
                        self.setState({
                            hasRequestError: true,
                            errorMsg: err.response.data.message
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
        // console.log(this.props.login())
        const { getFieldDecorator } = this.props.form;

        if (this.state.userAuthenticated) return <Redirect to={"/meus-alertas"} />;

        return (
            <div>
                <h1 className={"loginTitle"}>Formulário de Login</h1>
                <div className={"divLogin"}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email',
                                {
                                    rules: [
                                        //     {
                                        //     type: 'email', message: 'O e-mail inserido não é válido!',
                                        // },
                                        { required: true, message: 'Por favor insira seu e-mail!' }],
                                    initialValue: this.state.email,
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
                                )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Preencha sua senha por favor!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Senha" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Fazer Login!
                        </Button>
                            &nbsp;
                        Or &nbsp; <Link to="/cadastro">Quero me cadastrar!</Link>
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

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm
