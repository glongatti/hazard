import React from 'react';

import { Table, Divider, Row, Col, Button } from 'antd';

import "./../Cadastro/cadastro.css"
import { Redirect, Link } from "react-router-dom";


class Logout extends React.Component {

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
            localStorage.removeItem('user')
            this.setState({
                isLoading:false
            })
        }else{
            this.setState({
                isLoading:false
            })
        }
    }
    render() {
        if (this.state.isLoading) {
            return (<p>Carregando...</p>)
        } 
        // else if (!this.state.isLoading && !this.state.user) {
        //     return <Redirect to="/" />
        // } 
        
        else {
            return (
                <div>
                    <Row>
                   

                        <Col span={20} offset={2}  style={{ marginTop: 50 }}>
                            <h2>A sua sessão foi finalizada com sucesso!</h2> 

                            {/* <Table columns={columns} dataSource={data} /> */}
                        </Col>
                        <Col span={24}>
                            <Link to="/"> <Button type="primary">Voltar para o Início</Button></Link>
                        </Col>
                    </Row>


                </div>
            );
        }

    }
}


export default Logout
