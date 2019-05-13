import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, Redirect } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            current: 'mail',
            isLoggout: false
        }
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            this.setState({
                user: user
            })
        } else {
            this.setState({
                user: null,
            })
        }
    }

    handleClick = (e) => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    handleLogout() {

    }

    renderUserArea() {
        if (this.props.isLogged) {
            return (
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />Área do Usuário</span>}>
                    <MenuItemGroup key="alertas" >
                        <Menu.Item key="meus-alertas"><Link to="/meus-alertas">Meus Alertas</Link></Menu.Item>
                        <Menu.Item key="cadastrar-alerta"><Link to="/cadastro-alerta">Cadastrar Alerta</Link></Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            )
        }
    }
    render() {
        if (this.state.isLoggout) {
            return <Redirect to="/" />
        } else {
            return (
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"

                >
                    <Menu.Item key="inicio">
                        <Link to="/"><Icon type="home" />Início</Link>
                    </Menu.Item>
                    <Menu.Item key="visualizar-alertas">
                        <Link to="/alertas"><Icon type="environment" />Visualizar Alertas</Link>
                    </Menu.Item>

                    <Menu.Item key="sobre" >
                        <Link to="/sobre"><Icon type="info-circle" />Sobre</Link>
                    </Menu.Item>

                    {this.renderUserArea()}

                    {!this.props.isLogged && (
                        <Menu.Item key="cadastro" >
                            <Link to="/cadastro"><Icon type="user-add" />Cadastre-se</Link>
                        </Menu.Item>
                    )}

                    {this.props.isLogged ? <Menu.Item key="logout" >
                        <Link to="/logout" onClick={this.props.logout}><Icon type="export" />Fazer Logout</Link>
                    </Menu.Item> : (
                            <Menu.Item key="login" >
                                <Link to="/login"><Icon type="user" />Fazer Login</Link>
                            </Menu.Item>
                        )}


                </Menu>
            );
        }
    }

}