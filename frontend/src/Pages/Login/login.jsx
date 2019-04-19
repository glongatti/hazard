import React from 'react';

import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import "./../Login/login.css"
class Login extends React.Component {

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
                <h1 class={"loginTitle"}>Formulário de Login</h1>
                <div class={"divLogin"}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
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
                                Fazer Login!
                        </Button>
                            &nbsp;
                        Or &nbsp; <a href="">Quero me cadastrar!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm
