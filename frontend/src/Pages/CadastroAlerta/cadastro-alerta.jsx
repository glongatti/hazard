import React from 'react';

import {
    Form, Icon, Input, Button, Select
} from 'antd';
import { Redirect } from "react-router-dom";

import "./cadastro-alerta.css"

const { TextArea } = Input;
const { Option } = Select;


class CadastroAlerta extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            this.setState({
                user: user,
                isLoading: false
            })
        } else {
            this.setState({
                user: null,
                isLoading: false
            })
        }
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
                                {getFieldDecorator('nome-alerta', {
                                    rules: [{ required: true, message: 'Preencha o nome do alerta' }],
                                })(
                                    <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Nome do Alerta" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('desc', {
                                    rules: [
                                        { required: true, message: 'Por favor insira a descrição do alerta!' }],
                                })(
                                    <TextArea rows={4} placeholder="Descrição do Alerta" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
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
                                    Criar Conta
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            );
        }


    }
}

const WrappedNormalLoginForm = Form.create()(CadastroAlerta);

export default WrappedNormalLoginForm
