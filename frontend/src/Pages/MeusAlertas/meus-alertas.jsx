import React from 'react';

import { Table, Divider, Row, Col, Button } from 'antd';

import "./../Cadastro/cadastro.css"
import { Redirect, Link } from "react-router-dom";
import moment from 'moment'

const columns = [{
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
            <a href="/">Deletar</a>
        </span>
    ),
}];


class MeusAlertas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: null,
            alerts: []
        }
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            if(user.alertas){
                const alerts = user.alertas.map((value, index) => {
                    return {
                        key: index,
                        titulo: value.nome,
                        descricao: value.descricao,
                        tipo: value.tipoAlerta.nome,
                        localizacao: value.latitude + ',' + value.longitude,
                        data: moment(value.criacao).format('DD/MM/YYYY')
    
                    }
                })
                this.setState({
                    user: user,
                    isLoading: false,
                    alerts: alerts
                })
            }else{
                this.setState({
                    user: user,
                    isLoading: false,
                    alerts: []
                })
            }
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
