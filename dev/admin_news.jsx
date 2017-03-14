const React = require('react');
const ReactDOM=require('react-dom');
const Nav=require('./admin_nav.jsx');
import { Button } from 'antd';
import { Table } from 'antd';
const columns = [{
    title:'编号',
    dataIndex:'key',
}, {
    title: '新闻分类',
    dataIndex: 'caption'
}, {
    title: '操作',
    dataIndex: 'action',
    render: (text,record) => (
        <span>
            <a href={`/admin/news/del/${record.key}`}>删除</a>
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
        this.add=this.add.bind(this);
    }
    change(obj){
        const that=this;
        const index=obj.id;
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
        const newData=this.state.data.map((v)=>({key:v.cate_id,caption:<input onChange={(e)=>this.change(e.currentTarget)} type="text" id={v.cate_id} defaultValue={v.cate_name}/>}));
        return (
            <div>
                <Button type="primary" style={{marginBottom:'10px'}} onClick={this.add}>添加</Button>
                <Table columns={columns} dataSource={newData} />
            </div>
        )
    }
}

ReactDOM.render(<Nav><Admin/></Nav>,document.querySelector('#page'));
