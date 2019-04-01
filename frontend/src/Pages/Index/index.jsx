import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import './index.css'
const { Content } = Layout;


class Index extends Component {




    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <h1 className="titulo">Imagine uma frase impactante aqui!!!</h1>
                        <h3> Nossos melhores serviçoes estão aqui</h3>

                        <Row>
                            <Col span={4}></Col>
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="primary">Primary</Button>
                            </Col>




                            <Col span={4}><Button>Default</Button></Col>
                            <Col span={4}></Col>
                            <Col span={4}></Col>
                        </Row>



                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Index;
