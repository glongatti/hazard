import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import './index.css'
import { Typography } from 'antd';
const { Text } = Typography;
const { Content } = Layout;


class Index extends Component {




    render() {

        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Row className={"divHome"}>
                        <Row>
                            <Col span={8}>
                                <h1 className="titulo">Fique alerta!<br/> Saiba se há algum perigo perto de você.</h1>
                                <h3>Ou faça sua parte</h3>
                                <br />
								<Col span={24}>
									<Link to="/alertas"><Button type="primary" className={"btnHome"}>Procurar Alertas</Button></Link>
								</Col>
                            </Col>
							
                        </Row>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={4}></Col>
                            




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

                    </Row>
                    <Row type={"flex"} style={{ marginTop: '50px' }}>
                        <Col span={8} className={"colFeatures"}>
                            <Col span={24}>
                                <img src="https://i.imgur.com/A9vsrrG.png" width="130" />
                            </Col>
                            <Col span={24}>
                            <br/>
                                <p> Contribua com milhares de usuários, avisando sobre áreas de riscona sua região.</p>
                            </Col>
                        </Col>
                        <Col span={8} className={"colFeatures"}>
                            <Col span={24}>
                                <img src="https://i.imgur.com/siEmVZN.png" />
                            </Col>
                            <Col span={24}>
                            <br/>
                                <p>Aqui no nosso sistema, será possível verificar se você está em uma região de risco.</p>
                            </Col>
                        </Col>
                        <Col span={8} className={"colFeatures"}>
                            <Col span={24}>
                                <img src="https://i.imgur.com/LH8F1Rn.png" />
                            </Col>
                            <Col span={24}>
                            <br/>
                                <p> Diversos tipos de classificação de alertas para você ficar ciente de tudo o que acontece ao seu redor.</p>
                            </Col>
                        </Col>
	
                    </Row>

                </Content>
            </Layout >
        );
    }
}

export default Index;
