const React=require('react');
const ReactDOM=require('react-dom');
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
        this.editor.create();
        if(this.props.content){
            this.editor.$txt.html(this.props.content);
        }
    }
    render(){
        return (
            <div>
            <div ref={(el)=>{this.e=el}} style={this.props.style}></div>
                <a onClick={()=>{this.props.save(this.editor.$txt.html())}}>提交</a>
            </div>

        )
    }
}
exports.Editor=Editor;