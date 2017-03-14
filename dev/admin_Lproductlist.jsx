const React = require('react');
const ReactDOM=require('react-dom');
const Nav=require('./admin_nav.jsx');
//产品列表页部分
import { Card } from 'antd';
import { Select } from 'antd';
import { Button } from 'antd';
import { Pagination } from 'antd';
const Option = Select.Option;
class Lproductlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        fetch('/admin/product/getCates',{credentials: 'same-origin'}).then((res)=>res.json())
            .then((data)=>{
                this.setState({data:data});
            })
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        fetch(`/admin/admin_productList/updateCate/${this.props.data.id}/${value}`,{credentials: 'same-origin'}).then((res)=>res.json())
         .then((data)=>{
             if(data=='ok'){
                 location.href='/admin/admin_productList'
             }else {
                 alert('更新错误');
             }
         })
    }
    render(){
        const options=this.state.data.map((v,i)=><Option value={v.cate_id} key={i}>{v.cate_name}</Option>)
        return(
            <div className="Lcardbox">
                <Card>
                    <div className="custom-image">
                        <img alt="example" width="100%" src={this.props.data.thumb}/>
                    </div>
                    <div className="custom-card">
                        <h3>ID: {this.props.data.id}</h3>
                        <h3>名称: {this.props.data.name}</h3>
                        <h3>所属分类:
                            <Select value={this.props.data.cate_id} style={{ width: "120px",float:'right' }} onChange={this.handleChange}>
                                {options}
                            </Select>
                        </h3>

                    </div>
                    <div>
                        <a href={`/admin/admin_productList/${this.props.data.id}`}><Button className='Lxie' type="primary" style={{margin:'16px',height:'24px',paddingTop:'0',paddingBottom:"0"}} >编辑</Button></a>
                        <a href={`/admin/admin_productList/del/${this.props.data.id}`}><Button className='Lxie' type="danger" style={{margin:'16px',height:'24px',paddingTop:'0',paddingBottom:"0"}} >删除</Button></a>
                    </div>
                </Card>
            </div>
        )
    }
}
function handleMenuClick(e) {
    console.log('click', e);
}
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: 1,
            data:[]
        }
        this.onChange=this.onChange.bind(this);
    }
    onChange (page) {
        console.log(page);
        this.setState({
            current: page,
        });
        this.add=this.add.bind(this);
    }
    componentDidMount(){
        fetch('/admin/admin_productList/getAll',{credentials: 'same-origin'}).then((res)=>res.json())
            .then((data)=>{
                this.setState({
                    data: data
                });
            })
    }
    render(){
        return (
            <div>
                <div className="Ladd">
                    <a href="/admin/admin_productList/add">
                        <Button type="primary" style={{marginBottom:'10px'}}>添加</Button>
                    </a>
                </div>
                <div style={{overflow:'hidden'}}>
                    {this.state.data.map((v,i)=><Lproductlist data={v} key={i}/>)}
                </div>
                <Pagination current={this.state.current} onChange={this.onChange} total={this.state.data.length} style={{margin:'10px auto'}}/>
            </div>
        )
    }
}
ReactDOM.render(<Nav><Admin/></Nav>,document.querySelector('#page'));