const React = require('react');
import { Layout, Menu, Icon , Dropdown , Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item >
            <a rel="noopener noreferrer" href="/login/logout">退出</a>
        </Menu.Item>
    </Menu>
);
class SiderDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        };
        this.toggle=this.toggle.bind(this);
    }

    toggle () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        var index=null;
        var path=location.pathname;
        var patharr=path.split('/');
        patharr.shift();
        if(!patharr[1]){
            index='admin/product';
        }else{
            index=patharr[0]+'/'+patharr[1];
        }
        var content;
        switch(index){
            case 'admin/product':content='产品分类管理';break;
            case 'admin/admin_productList':content='产品管理';break;
            case 'admin/news':content='新闻中心分类';break;
            case 'admin/admin_news':content='新闻管理';break;
            case 'admin/admin_health':content='营养保健管理';break;
            case 'admin/admin_recruit':content='招聘信息';break;
            case 'admin/admin_message':content='留言管理';break;
        }
        return (
            <Layout style={{minHeight:'662px'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={{height:'64px',paddingTop:'24px',paddingLeft:'30px'}}>
                        <img src="/admin/images/icon_admin.png" style={{width:'20px',height:'18px'}}/>
                        <span style={{color:'#fff',position:'relative',top:'-4px',left:'4px'}}>康晋食品</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[index]}>
                        <Menu.Item key="admin/product">
                            <a href="/admin/product">
                                <Icon type="switcher" />
                                <span className="nav-text">产品分类管理</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/admin_productList">
                            <a href="/admin/admin_productList">
                                <Icon type="switcher" />
                                <span className="nav-text">产品管理</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/news">
                            <a href="/admin/news">
                                <Icon type="switcher" />
                                <span className="nav-text">新闻中心分类</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/admin_news">
                            <a href="/admin/admin_news">
                                <Icon type="book" />
                                <span className="nav-text">新闻管理</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/admin_health">
                            <a href="/admin/admin_health">
                                <Icon type="calculator" />
                                <span className="nav-text">营养保健管理</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/admin_recruit">
                            <a href="/admin/admin_recruit">
                                <Icon type="exception" />
                                <span className="nav-text">招聘信息</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="admin/admin_message">
                            <a href="/admin/admin_message">
                                <Icon type="solution" />
                                <span className="nav-text">留言管理</span>
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding:'0 20px'}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="javascript:void(0);"  style={{float:'right',color:'#101010'}}>
                                超级管理员 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div style={{marginBottom:'10px'}}>
                            <Breadcrumb>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item><a href={'/'+index}>{content}</a></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
module.exports=SiderDemo;