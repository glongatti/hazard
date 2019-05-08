import React from 'react';

import { Table, Divider, Row, Col, Button } from 'antd';

import "./../Cadastro/cadastro.css"
import { Redirect, Link } from "react-router-dom";

const columns = [{
    title: 'Título do Alerta',
    dataIndex: 'titulo',
    key: 'titulo',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Tipo do Alerta',
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
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
        </span>
    ),
}];

const data = [{
    key: '1',
    titulo: 'John Brown',
    tipo: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];

class MeusAlertas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: null
        }
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
            return (
                <div>
                    <Row>
                        <Col span={24} >
                            <h1 className={"loginTitle"}>Meus Alertas</h1>
                        </Col>

                        <Col span={20} offset={2}>
                            {this.state.user.alertas ? <Table columns={columns} dataSource={data} /> : <h3>Ops... parece que você não tem nenhum alerta cadastrado!</h3> }

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
