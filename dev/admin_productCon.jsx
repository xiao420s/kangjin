const React = require('react');
const ReactDOM = require('react-dom');
const Nav=require('./admin_nav.jsx');
const Editor=require('./wangEditor.jsx')

import {Input} from 'antd';
import {Upload, Icon, Modal} from 'antd';
import {Button} from 'antd';

class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
        this.handleCancel=this.handleCancel.bind(this);
        this.handlePreview=this.handlePreview.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
    componentDidMount(){
        fetch(`/admin/admin_productList/${this.props.id}/getCrousel`,{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            this.setState({fileList:data.map((v,i)=>{
                var obj={
                    uid: v.i_id,
                    name: v.img_url.split('/')[2],
                    status: 'done',
                    url: v.img_url
                }
                return obj;
            })})
        })
    }

    handleCancel() {
        this.setState({previewVisible: false})
    } ;

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange({fileList}) {
        this.setState({fileList})
    };
    handleRemove(e){
        const flag=true;
        if(e.response){
            fetch(`/admin/del/crousel/${e.response.id}`,{credentials: 'same-origin'})
                .then((res)=>res.json()).then((data)=>{
                if(data!='ok'){
                    const flag=false;
                }
            })
        }else {
            fetch(`/admin/del/crousel/${e.uid}`,{credentials: 'same-origin'})
                .then((res)=>res.json()).then((data)=>{
                if(data!='ok'){
                    const flag=false;
                }
            })
        }
        return flag;
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={`/admin/upload/crousel/${this.props.id}`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

class MyPicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
        this.handleCancel=this.handleCancel.bind(this);
        this.handlePreview=this.handlePreview.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
    componentDidMount(){
        fetch(`/admin/admin_productList/${this.props.id}/getThumb`,{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            console.log(data[0]);
            console.log(data[0].thumb);
                if(data[0].thumb){
                    console.log(1);
                    this.setState({fileList:data.map((v,i)=>{
                        var obj={
                            uid: v.id,
                            name: v.thumb.split('/')[2],
                            status: 'done',
                            url: v.thumb
                        }
                        return obj;
                    })})
                }
            })
    }

    handleCancel() {
        this.setState({previewVisible: false})
    } ;

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange({fileList}) {
        this.setState({fileList})
    };
    handleRemove(e){
        const flag=true;
        if(e.response){
            fetch(`/admin/del/thumb/${e.response.id}`,{credentials: 'same-origin'})
                .then((res)=>res.json()).then((data)=>{
                if(data!='ok'){
                    const flag=false;
                }
            })
        }else {
            fetch(`/admin/del/thumb/${e.uid}`,{credentials: 'same-origin'})
                .then((res)=>res.json()).then((data)=>{
                if(data!='ok'){
                    const flag=false;
                }
            })
        }
        return flag;
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={`/admin/upload/thumb/${this.props.id}`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

class ProductContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.save=this.save.bind(this);
    }
    componentDidMount(){
        const href=location.href.split('/');
        const id=href[href.length-1];
        fetch(`/admin/admin_productList/${id}/get`,{credentials: 'same-origin'}).then((res)=>res.json())
            .then((data)=>{
                this.setState({data:data});
            })
    }
    save(x){
        var values={
            name:this.name.refs.input.value,
            ename:this.ename.refs.input.value,
            title:this.title.refs.input.value,
            subtitle:this.subtitle.refs.input.value,
            fun:this.fun.refs.input.value,
            fun_content:this.fun_content.refs.input.value,
            fun_e_content:this.fun_e_content.refs.input.value,
            content:x
        };
        const href=location.href.split('/');
        const index=href[href.length-1];
        fetch(`/admin/update_productList/${index}`,{
            credentials: 'same-origin',
            method:'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)
        }).then((res)=>res.json()).then((data)=>{
            if(data=="ok"){
                location.href="/admin/admin_productList";
            }else{
                alert('更新失败');
            }
        })
    }
    render() {
        const div=this.state.data.map((v,i)=>(
            <div key={i}>
                <div className="top">
                    <div className="proID">
                        <span>ID：{v.id}</span>
                    </div>
                    <div className="proName">
                        <span>产品名称：</span>
                        <Input placeholder="产品名称" defaultValue={v.name} name="name" ref={(el)=>{this.name=el}}/>
                    </div>
                    <div className="enTitle">
                        <span>英文名：</span>
                        <Input placeholder="英文名" defaultValue={v.ename} name="ename" ref={(el)=>{this.ename=el}}/>
                    </div>
                </div>
                <div className="proCarouselImg">
                    <span>上传缩略图：</span>
                    <MyPicturesWall id={v.id}/>
                </div>
                <div className="mainTitle">
                    <span>主标题：</span>
                    <Input placeholder="主标题" defaultValue={v.title} name="title" ref={(el)=>{this.title=el}}/>
                </div>
                <div className="subTitle">
                    <span>副标题：</span>
                    <Input placeholder="副标题" defaultValue={v.subtitle} name="subtitle" ref={(el)=>{this.subtitle=el}}/>
                </div>
                <div className="role">
                    <span>功能：</span>
                    <Input placeholder="功能" defaultValue={v.fun} name="fun" ref={(el)=>{this.fun=el}}/>
                </div>
                <div className="chAbstract">
                    <span>中文描述：</span>
                    <Input type="textarea"  defaultValue={v.fun_content} name="fun_content" ref={(el)=>{this.fun_content=el}}/>
                </div>
                <div className="enAbstract">
                    <span>英文描述：</span>
                    <Input type="textarea" defaultValue={v.fun_e_content} name="fun_e_content" ref={(el)=>{this.fun_e_content=el}}/>
                </div>
                <div className="proCarouselImg">
                    <span>上传轮播图：</span>
                    <PicturesWall id={v.id}/>
                </div>
                <div className="proImg">
                    内容：
                    <Editor.Editor style={{height:'300px'}} content={v.content} save={this.save}/>
                </div>
            </div>
        ))
        return (
            <div className="NewsContent">
                {div}
                <div className="newsButton">
                    <a href="/admin/admin_productList"><Button type="danger" style={{position:'relative',left:'40px',top:'-38px'}}>返回</Button></a>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Nav><ProductContent/></Nav>, document.querySelector('#productCon'));