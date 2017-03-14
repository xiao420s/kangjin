// 新加
const React=require('react');
const ReactDOM=require('react-dom');
// const common=require('./admin_common.jsx');
// const MyHeader=common.Header;
// const MySide=common.Side;
// const MyFooter=common.Footer;
// const MyCrumbs=common.Crumbs;
const Nav = require('./admin_nav.jsx');
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

//招聘信息部分
import { Table } from 'antd';

const columns = [{
    title: 'ID',
    dataIndex: 'key',
    render: text => <a href="#">{text}</a>,
},{
    title: '招聘岗位',
    dataIndex: 'job',
}, {
    title: '人数',
    dataIndex: 'num',
}, {
    title: '岗位要求',
    dataIndex: 'demand',
},{
    title: '操作',
    dataIndex: 'action',
    render: (text) => (
        <span>
            {text}
        </span>

    )
}];
//以上为招聘信息部分
// 按钮部分
import { Button, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
    console.log('click', e);
}

//以上为按钮部分
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.add=this.add.bind(this);
    }
    add(){
        const that=this;
        fetch('/admin/admin_recruit/add',{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            if(data){
                that.setState((ps)=>({data:[{id:data,job:'',num:'',demand:''}].concat(ps.data)}));
            }
        })
    }
    componentDidMount(){
        const that=this;
        fetch('/admin/admin_recruit/getid',{credentials: 'same-origin'}).then((res)=>res.json()).then((data)=>{
            // console.log(data);
            that.setState({
                data:data
            });
        });
    }
    render(){
        const newData=this.state.data.map((v)=>({
            key:v.id, job:v.job, num:v.num,demand:v.demand,action:<span><a href={`/admin/admin_recruit/${v.id}`}>编辑</a><span className="ant-divider"/><a href={`/admin/admin_recruit/del/${v.id}`} >删除</a></span>
    }));

        return (
            <div>
                <Button type="primary" style={{margin:'16px auto'}} onClick={this.add}>添加招聘信息               </Button>
                <div className="Lrecruit" >
                    <Table columns={columns} dataSource={newData} />
                </div>

            </div>
        )
    }
}
ReactDOM.render(<Nav><Admin/></Nav>,document.getElementById('page'));
