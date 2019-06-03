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
                                <h1 className="titulo">Fique alerta!<br/> Saiba se há algum perigo perto de você...</h1>
                                
                                <br />
								<Col span={24}>
									<Link to="/alertas"><Button type="primary" className={"btnHome"}>Procurar Alertas</Button></Link>
								</Col>
                            </Col>
							
                        </Row>
                        <Row type="flex" justify="end">
                            <Col span={4}>
								<h3 className="subTitulo">...ou faça sua parte:</h3>
								<Link to="/cadastro-alerta"><Button className={"btnHome btnCriar"}>Criar Alertas</Button></Link>
							</Col>
                            
                        </Row>

                    </Row>
                    <Row type={"flex"} style={{ marginTop: '50px' }}>
                        <Col span={8} className={"colFeatures"}>
                            <Col span={24}>
                                <img src="https://i.imgur.com/A9vsrrG.png" width="130" />
                            </Col>
                            <Col span={24}>
                            <br/>
                                <p> Contribua com milhares de usuários, avisando sobre áreas de risco na sua região.</p>
                            </Col>
                        </Col>
                        <Col span={8} className={"colFeatures"}>
                            <Col span={24}>
                                <img src="https://i.imgur.com/siEmVZN.png" />
                            </Col>
                            <Col span={24}>
                            <br/>
                                <p>Com o Hazard é possível andar sempre informado sobre regiões de risco.</p>
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
