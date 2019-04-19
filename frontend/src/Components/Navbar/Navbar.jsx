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
                <Menu.Item key="inicio">
                    <Link to="/"><Icon type="home" />Início</Link>
                </Menu.Item>
                <Menu.Item key="alertas">
                    <Link to="/alertas"><Icon type="environment" />Visualizar Alertas</Link>
                </Menu.Item>

                <Menu.Item key="sobre" >
                    <Link to="/sobre"><Icon type="info-circle" />Sobre</Link>
                </Menu.Item>
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />Área do Usuário</span>}>
                    <MenuItemGroup key="user" >
                        <Menu.Item key="login"><Link to="/login">Fazer Login</Link></Menu.Item>
                        <Menu.Item key="cadastro"><Link to="/cadastro">Cadastrar-se</Link></Menu.Item>
                    </MenuItemGroup>
                </SubMenu>


            </Menu>
        );
    }

}