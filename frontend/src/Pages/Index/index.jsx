import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import css from './index.css'

const { Content } = Layout;


class Index extends Component {




    render() {

        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div className={"divHome"}>
                        <Row>
                            <Col>
                                <h1 className="titulo">Está preocupado se está em uma área segura?<br /> Saiba onde estão os perigos perto de você.</h1>
                                <h3>Ou se preferir, crie alertas de risco em sua área!</h3>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Link to="/alertas"><Button type="primary" className={"btnHome"}>Procurar Alertas</Button></Link>
                            </Col>




                            <Col span={4}><Link to="/cadastro-alerta"><Button className={"btnHome"}>Criar Alertas</Button></Link></Col>
                            <Col span={4}></Col>
                            <Col span={4}></Col>
                        </Row>

                        <Row style={{ marginTop: 50 }}>
                            <Col span={4}></Col>
                            <Col span={16}>

                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>

                </Content>
            </Layout >
        );
    }
}

export default Index;
