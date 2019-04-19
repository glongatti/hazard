import React from 'react';

import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import "./../Cadastro/cadastro.css"
class Cadastro extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <h1 class={"loginTitle"}>Formulário de Cadastro</h1>
                <div class={"divLogin"}>
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
                            {getFieldDecorator('password', {
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
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Cadastro);

export default WrappedNormalLoginForm
