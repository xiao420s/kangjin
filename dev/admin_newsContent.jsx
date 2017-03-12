const React = require('react');
const ReactDOM = require('react-dom');

const common = require('./admin_common.jsx');
const MyHeader = common.Header;
const MySide = common.Side;
const MyFooter = common.Footer;
const MyCrumbs = common.Crumbs;


import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
import {Input} from 'antd';
import {Upload, Icon, Modal} from 'antd';
import { Button } from 'antd';

class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        };
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
                    action="/upload.do"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

class NewsContent extends React.Component {
    render() {
        return (
            <div className="NewsContent">
                <div className="number">
                    <span>编号：</span>
                </div>
                <div className="mainTitle">
                    <span>主标题：</span>
                    <Input placeholder="Basic usage"/>
                </div>
                <div className="subTitle">
                    <span>副标题：</span>
                    <Input placeholder="Basic usage"/>
                </div>
                <div className="abstract">
                    <span>内容简介：</span>
                    <Input type="textarea"/>
                </div>
                <div className="content">
                    <span>新闻内容：</span>
                    <Input type="textarea"/>
                </div>
                <div className="newsImg">
                    <span>图片：</span>
                    <PicturesWall />
                </div>
                <div className="newsButton">
                    <Button type="primary">保存</Button>
                    <Button type="danger">返回</Button>
                </div>

            </div>
        );
    }
}
class Admin extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header style={{height: '80px', background: '#2b3643', padding: '0'}}><MyHeader/></Header>
                    <Layout>
                        <Sider><MySide/></Sider>
                        <Content style={{background: "#fff"}}>
                            <MyCrumbs/>
                            <NewsContent/>
                        </Content>
                    </Layout>
                    <Footer style={{padding: 0}}><MyFooter/></Footer>
                </Layout>
            </div>
        )
    }
}
ReactDOM.render(<Admin/>, document.querySelector('#NewsContent'));