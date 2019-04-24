import React from 'react';

import { Table, Divider } from 'antd';

import "./../Cadastro/cadastro.css"
import { Link } from "react-router-dom";

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


    render() {

        return (
            <div>
                <h1 class={"loginTitle"}>Meus Alertas</h1>

                <Table columns={columns} dataSource={data} />

            </div>
        );
    }
}


export default MeusAlertas
