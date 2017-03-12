const React=require('react');
const ReactDOM=require('react-dom');
const common=require('./admin_common.jsx');
const MyHeader=common.Header;
const MySide=common.Side;
const MyFooter=common.Footer;
const MyCrumbs=common.Crumbs;
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
//产品列表页部分
import { Card } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
function handleChange(value) {
    console.log(`selected ${value}`);
}
const data=[
    {id:1,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/1'},
    {id:2,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/2'},
    {id:3,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/3'},
    {id:4,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/4'},
    {id:5,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/5'},
    {id:6,name:'粉红色的',pic:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',href:'/admin/admin_productList/6'}]
class Lproductlist extends React.Component{
    render(){
        return(
            <div className="Lcardbox">
                <Card >
                    <div className="custom-image">
                        <img alt="example" width="100%" src={this.props.data.pic}/>
                    </div>
                    <div className="custom-card">
                        <h3>ID: {this.props.data.id}</h3>
                        <h3>名称: {this.props.data.name}</h3>
                        <h3>所属分类:
                            <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="jack">豆浆</Option>
                                <Option value="lucy">传统豆制品</Option>
                                <Option value="disabled">卤制品</Option>
                                <Option value="Yiminghe">豆芽菜</Option>
                            </Select>
                        </h3>

                    </div>
                    <div>
                        <a href={this.props.data.href}><Button className='Lxie' type="primary" style={{margin:'16px auto',height:'34px'}} >编辑</Button></a>
                       <Button className='Ldel'type="danger" style={{margin:'16px 16px',height:'34px'}} >删除</Button>
                    </div>
                </Card>
            </div>

        )
    }
}
// 按钮部分
import { Button, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
    console.log('click', e);
}
class Admin extends React.Component{
    render(){
        return (
            <div>
                <Layout>
                    <Header style={{height:'80px',background:'#2b3643',padding:'0'}}><MyHeader/></Header>
                    <Layout>
                        <Sider><MySide/></Sider>
                        <Content style={{background:"#fff"}}>
                            <MyCrumbs/>
                            <div className="Ladd">
                                <Button type="primary" style={{margin:'10px auto',height:'34px'}} >添加</Button>
                            </div>
                            {/*<Lproductlist/>*/}
                            {this.props.data.map((v,i)=><Lproductlist data={v} key={i}/>)}
                        </Content>

                    </Layout>
                    <Footer style={{padding:0}}><MyFooter/></Footer>
                </Layout>
            </div>
        )
    }
}

ReactDOM.render(<Admin data={data}/>,document.querySelector('#page'));