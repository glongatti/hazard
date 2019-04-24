import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import './index.css'
const { Content } = Layout;


class Index extends Component {




    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24 }}>
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
                                <Button type="primary" className={"btnHome"}>Procurar Alertas</Button>
                            </Col>




                            <Col span={4}><Button className={"btnHome"}>Criar Alertas</Button></Col>
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
            </Layout>
        );
    }
}

export default Index;
