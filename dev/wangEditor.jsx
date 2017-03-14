const React=require('react');
const ReactDOM=require('react-dom');
import { Button } from 'antd';
class Editor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.editor=new wangEditor(this.e);
        this.editor.config.uploadImgUrl='/admin/upload';
        this.editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
            if (item === 'location') {
                return null;
            }
            return item;
        });
        this.editor.config.uploadHeaders = {
            'Accept' : 'text/x-json'
        };
        this.editor.create();
        if(this.props.content){
            this.editor.$txt.html(this.props.content);
        }
    }
    render(){
        return (
            <div>
            <div ref={(el)=>{this.e=el}} style={this.props.style}></div>
                <Button type="primary" onClick={()=>{this.props.save(this.editor.$txt.html())}} style={{display:'block',margin:'10px auto'}}>保存</Button>
            </div>
        )
    }
}
exports.Editor=Editor;