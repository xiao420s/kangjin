const React = require('react');

import {Menu, Dropdown, Icon} from 'antd';
import {Breadcrumb} from 'antd';
const SubMenu = Menu.SubMenu;


const menu = (
    <Menu>
        <Menu.Item>
            <a rel="noopener noreferrer" href="/login/logout">退出</a>
        </Menu.Item>
    </Menu>
);

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img src="/admin/images/icon_admin.png" className="icon"/>
                <img src="/admin/images/logo.png" className="logo"/>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="javascript:void(0);">
                        超级管理员 <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>
        )
    }
}
exports.Header = Header;


class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            openKeys: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
    }

    handleClick(e) {
        console.log('Clicked: ', e);
        this.setState({current: e.key});
    }

    onOpenChange(openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({openKeys: nextOpenKeys});
    }

    getAncestorKeys(key) {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{width: 200}}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
            >
                <SubMenu key="sub1" title={<span><Icon type="switcher"/><span><a href="/admin/product">产品分类管理</a></span></span>}></SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore"/><span><a href="/admin/admin_productList">产品管理</a></span></span>}></SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="switcher"/><span><a href="/admin/news">新闻中心分类</a></span></span>}></SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="book"/><span><a href="/admin/admin_news">新闻管理</a></span></span>}></SubMenu>
                <SubMenu key="sub5" title={<span><Icon type="calculator"/><span><a href="/admin/admin_health">营养保健管理</a></span></span>}></SubMenu>
                <SubMenu key="sub6" title={<span><Icon type="exception"/><span><a href="/admin/admin_recruit">招聘信息</a></span></span>}>
                </SubMenu>
                <SubMenu key="sub7" title={<span><Icon type="solution"/><span><a href="/admin/admin_message">留言管理</a></span></span>}>
                </SubMenu>
            </Menu>
        );
    }
}
class Side extends React.Component {
    render() {
        return (
            <div className="side_left">
                <Sider />
            </div>
        )
    }
}
exports.Side = Side;
//面包屑
class Crumbs extends React.Component {
    render() {
        return (
            <div className="crumbs">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>主页</Breadcrumb.Item>
                    {/*<Breadcrumb.Item href="">产品分类管理</Breadcrumb.Item>*/}
                </Breadcrumb>
            </div>
        )
    }
}
exports.Crumbs = Crumbs;
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <p>copy right @ 2017 1608 group</p>
            </div>
        )
    }
}
exports.Footer = Footer;