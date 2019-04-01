import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Navbar extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"

            >
                <Menu.Item key="mail">
                    <Icon type="home" />Início
                </Menu.Item>
                <Menu.Item key="app">
                    <Icon type="environment" />Visualizar Alertas
                </Menu.Item>

                <Menu.Item key="app" >
                    <Icon type="info-circle" />Sobre
                </Menu.Item>

                <Menu.Item key="app" >
                    <Icon type="user" />Área do Usuário
                </Menu.Item>



            </Menu>
        );
    }

}