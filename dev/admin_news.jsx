const React=require('react');
const ReactDOM=require('react-dom');
const common=require('./admin_common.jsx');
const MyHeader=common.Header;
const MySide=common.Side;
const MyFooter=common.Footer;
const MyCrumbs=common.Crumbs;
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Button } from 'antd';
import { Table } from 'antd';
const columns = [{
    title:'编号',
    dataIndex:'key',
}, {
    title: '新闻分类',
    dataIndex: 'caption',
    render: text => <a href="javascript:void(0);">{text}</a>,
}, {
    title: '操作',
    dataIndex: 'action',
    render: (text) => (
        <span>
            {text}
        </span>
    )
}];
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.change=this.change.bind(this);
        this.del=this.del.bind(this);
        this.add=this.add.bind(this);
    }
    change(obj){
        const that=this;
        const index=$(obj).closest('tr').children().first().text();
        const values={cate_id:index,cate_name:obj.value};
        fetch('/admin/news/updateCate',{
            credentials: 'same-origin',
            method:'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)})
            .then((res)=>res.json()).then((data)=>{
            if(data){
                that.setState((ps)=>({data:ps.data.map((v)=>{
                    if(v.cate_id==values.cate_id){
                        v.cate_name=values.cate_name;
                    }
                    return v;
                })}));
            }
        })
    }
    del(id){
        const that=this;
        fetch(`/admin/news/del/${id}`,{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            if(data){
                that.setState((ps)=>({data:ps.data.filter((v)=> v.cate_id!=id)}));
            }
        })
    }
    add(){
        const that=this;
        fetch('/admin/news/add',{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            if(data){
                that.setState((ps)=>({data:[{cate_id:data,cate_name:''}].concat(ps.data)}));
            }
        })
    }
    componentDidMount(){
        const that=this;
        fetch('/admin/news/getCates',{credentials: 'same-origin'}).then((res)=>res.json()).then((data)=>{
            that.setState({
                data:data
            });
        });
    }
    render(){
        const newData=this.state.data.map((v)=>({key:v.cate_id,caption:<input onChange={(e)=>this.change(e.currentTarget)} type="text" defaultValue={v.cate_name}/>,action:<a href="javascript:void(0);" onClick={()=>this.del(v.cate_id)}>删除</a>}));
        return (
            <div>
                <Layout>
                    <Header style={{height:'80px',background:'#2b3643',padding:'0'}}><MyHeader/></Header>
                    <Layout>
                        <Sider><MySide/></Sider>
                        <Content style={{background:"#fff"}}>
                            <MyCrumbs/>
                            <div style={{padding:'0 20px'}}>
                                <Button type="primary" style={{margin:'16px auto'}} onClick={this.add}>添加</Button>
                                <Table columns={columns} dataSource={newData} />
                            </div>
                        </Content>
                    </Layout>
                    <Footer style={{padding:0}}><MyFooter/></Footer>
                </Layout>
            </div>
        )
    }
}

ReactDOM.render(<Admin/>,document.querySelector('#page'));
