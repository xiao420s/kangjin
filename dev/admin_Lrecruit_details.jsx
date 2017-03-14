// const React=require('react');
// const ReactDOM=require('react-dom');
// import { Input } from 'antd';
// class Adminrecruitdetails extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             data:[]
//         };
//     }
//     change(obj){
//         const that=this;
//         const index=$(obj).closest('tr').children().first().text();
//         const values={id:index,job:obj.value};
//         var aa=location.href.split('/');
//         console.log(aa);
//         var bb=aa[aa.length-1];
//         fetch(`/admin/admin_Lrecruit/${bb}/updateCate`,{
//             credentials: 'same-origin',
//             method:'post',
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify(values)})
//             .then((res)=>res.json()).then((data)=>{
//             if(data){
//                 that.setState((ps)=>({data:ps.data.map((v)=>{
//                     if(v.id==values.id){
//                         v.job=values.job;
//                     }
//                     return v;
//                 })}));
//             }
//         })
//     }
//     componentDidMount(){
//         const that=this;
//         var aa=location.href.split('/');
//         // console.log(aa);
//         var bb=aa[aa.length-1];
//         // console.log(bb);
//         fetch(`/admin/admin_recruit/${bb}/getid`,{credentials: 'same-origin'}).then((res)=>res.json()).then((data)=>{
//             console.log(data);
//             that.setState({
//                 data:data
//             });
//         });
//     }
//     render(){
//         // const newData=this.state.data.map((v)=>({
//         //     key:v.id, job:v.job, num:v.num,demand:v.demand,action:<span><a href={`/admin/admin_recruit/${v.id}`}>编辑</a><span className="ant-divider"/><a href={`/admin/admin_recruit/del/${v.id}`} >删除</a></span>
//         // }));
//         // const newData=this.state.data.map((v)=>({key:v.cate_id,caption:<input onChange={(e)=>this.change(e.currentTarget)} type="text" defaultValue={v.cate_name}/>,action:<a href="javascript:void(0);" onClick={()=>this.del(v.cate_id)}>删除</a>}));
//         return(
//
//                 <div className="Adminrecruitdetailsbox" style={{width:'80%',margin:'0 auto'}}>
//                     <p>招聘职位：<span><Input onChange={(e)=>this.change(e.currentTarget)} type="text"/></span></p>
//                     <p>招聘人数：<span><Input placeholder="" /></span></p>
//                     <p>招聘要求：<span><Input type="textarea" placeholder="123" autosize={{ minRows: 2, maxRows: 6 }} /></span></p>
//                 </div>
//
//         )
//     }
// }
// ReactDOM.render(<Adminrecruitdetails />, document.getElementById('page'));

const React=require('react');
const ReactDOM=require('react-dom');
const Nav = require('./admin_nav.jsx');

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
// 按钮部分
import { Button, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
    console.log('click', e);
}
// 详情页
import { Input } from 'antd';
class Adminrecruitdetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.change=this.change.bind(this);
    }
        change(e){
        e.preventDefault();
        const that=this;
        var aa=location.href.split('/');
        // console.log(aa);
        //     console.log(this.job.refs.input.value)
        var bb=aa[aa.length-1];
        const index=bb;
        // console.log(index);
        const values={id:index,job:this.job.refs.input.value,num:this.num.refs.input.value,demand:this.demand.refs.input.value};
        console.log(values);

        fetch(`/admin/admin_recruit/${bb}/updateinfo`,{
            credentials: 'same-origin',
            method:'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)})
            .then((res)=>res.json()).then((data)=>{
            console.log(data)
            if(data=="ok"){
                location.href="/admin/admin_recruit"


            }
        })
    }
    componentDidMount(){
        const that=this;
        var aa=location.href.split('/');
        var bb=aa[aa.length-1];
        fetch(`/admin/admin_recruit/${bb}/getid`,{credentials: 'same-origin'}).then((res)=>res.json()   ).then((data)=>{
            // console.log(data);
            that.setState({
                data:data
            });
        });
    }

    render(){
        const div=this.state.data.map((v,i)=>(
            <div key={i}>

                <div className="Adminrecruitdetailsbox" style={{width:'70%',margin:'0 auto'}}>
                    <div className="con"><i>招聘职位：</i><span><Input ref={(el)=>{this.job=el}}  type="text" defaultValue={v.job} /></span></div>
                    <div className="con"><i>招聘人数：</i><span><Input ref={(el)=>{this.num=el}}  type="text" defaultValue={v.num}/></span></div>
                    <div className="con"><i>招聘要求：</i><span><Input ref={(el)=>{this.demand=el}} type="textarea"className='duohang' defaultValue={v.demand} autosize={{ minRows: 2, maxRows: 6 }} /></span>
                    </div>
                    <div style={{width:'240px',margin:'16px auto',textAlign:'center' }}>
                        <a><Button type="primary" style={{margin:'0 16px',height:'34px',width:'auto'}} onClick={this.change} >保存</Button></a>
                        <a  href="/admin/admin_recruit"><Button type="danger" style={{margin:'0 16px',height:'34px',width:'auto'}}  >返回</Button></a>
                    </div>
                </div>
            </div>  ))

        return(
           <div>
             {div}
           </div>
        )
    }
}

class Admin extends React.Component{
    render(){
        return (
            <div className="admin">

                <Adminrecruitdetails/>

            </div>
        )
    }
}

ReactDOM.render(<Nav><Admin/></Nav>,document.getElementById('page'));
