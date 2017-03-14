const React = require('react');
const ReactDOM = require('react-dom');

const Nav = require('./admin_nav.jsx');

const Editor=require('./wangEditor.jsx');



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
        fetch(`/admin/admin_healthcontent/${this.props.id}/getThumb`,{credentials: 'same-origin'})
            .then((res)=>res.json()).then((data)=>{
            console.log(data[0]);
            console.log(data[0].img_url);
            if(data[0].img_url){
                console.log(1);
                this.setState({fileList:data.map((v,i)=>{
                    var obj={
                        uid: v.c_id,
                        name: v.img_url.split('/')[2],
                        status: 'done',
                        url: v.img_url
                    };
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
            fetch(`/admin/admin_healthcontent/del/thumb/${e.response.id}`,{credentials: 'same-origin'})
                .then((res)=>res.json()).then((data)=>{
                if(data!='ok'){
                    const flag=false;
                }
            })
        }else {
            fetch(`/admin/admin_healthcontent/del/thumb/${e.uid}`,{credentials: 'same-origin'})
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
                    action={`/admin/admin_healthcontent/upload/thumb/${this.props.id}`}
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

class HealthContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
        this._submit = this._submit.bind(this);
    }

    componentDidMount() {
        var arr = location.pathname.split('/');
        var id = arr[arr.length - 1];
        fetch(`/admin/admin_health/getcontentlist/${id}`, {
            method:'post',
            credentials: 'same-origin'
        }).then((res) => res.json()).then((result) => {
            console.log(111);
            console.log(result);
            this.setState({
                data:result
            });
        });
        console.log(this.state.data)
    }
    _submit(content) {
        var data = {title: this.title.refs.input.value, author:this.author.refs.input.value,subtitle: this.subtitle.refs.input.value, content:content};
        var arr = location.pathname.split('/');
        var id = arr[arr.length - 1];
        fetch(`/admin/admin_health/updatecontent/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        }).then((res)=>res.json()).then((data)=> {
            if (data !== 'err') {
                location.href='/admin/admin_health'
            }else{
                console.log("err");
            }
        })
    }


    render() {
        const form=this.state.data.map((v,i)=>(
            <form className="NewsContent" method="post" key={i}>
                <div className="number">
                    <span>编号：</span>
                    <span>{v.c_id}</span>
                </div>
                <div className="mainTitle">
                    <span>主标题：</span>
                    <Input placeholder="Basic usage" ref={(el)=>{this.title=el}} defaultValue={v.title}   name="title"/>
                </div>
                <div className="subTitle">
                    <span>副标题：</span>
                    <Input placeholder="Basic usage" ref={(el)=>{this.subtitle=el}} defaultValue={v.subtitle}  name="subtitle"/>
                </div>
                <div className="abstract">
                    <span>作者：</span>
                    <Input placeholder="Basic usage" type="text" ref={(el)=>{this.author=el}} defaultValue={v.author} name="author"/>
                </div>
                <div className="newsImg">
                    <span>图片：</span>
                    <PicturesWall id={v.c_id} />
                </div>
                <div className="content">
                    <span>内容：</span>
                    <Editor.Editor style={{height:'300px'}} content={v.content} save={this._submit}/>
                </div>
            </form>

        ));
        return (
            <div>
                {form}
                <div style={{textAlign:'center'}}>
                    <a href="/admin/admin_health"><Button type="danger" style={{position:'relative',left:'100px',top:'-38px'}}>返回</Button></a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Nav><HealthContent/></Nav>, document.querySelector('#NewsContent'));