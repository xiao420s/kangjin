const React=require('react');
const ReactDOM=require('react-dom');
class Header extends React.Component{
    render(){
        return (
            <div className="header">
                <img className="icon" src="/index/images/icon.png"/>
                <img className="logo" src="/index/images/logo.png"/>
                <ul className="nav">
                    {this.props.data.map((v,i)=><HeaderNav data={v} key={i}/>)}
                </ul>
            </div>
        )
    }
}
class HeaderNav extends React.Component{
    render(){
        return (
            <li className="items">
                <a className="item" href={this.props.data.href}>{this.props.data.name}</a>
                {this.props.data.child?<HeaderNavList data={this.props.data.child}/>:''}
            </li>
        )
    }
}
class HeaderNavList extends React.Component{
    render(){
        return (
            <ul className="items-ul">
                {this.props.data.map(
                    (v,i)=><li key={i}><a href={v.href}>{v.name}</a></li>
                )}
            </ul>
        )
    }
}
exports.Header=Header;
class Banner extends React.Component{
    render(){
        return (
            <div className="banner">
                <div className="bg"></div>
                <div className="items">
                    <img className="left" src="/index/images/s_shopsticks.png"/>
                    <img className="center" src="/index/images/s_banner.png"/>
                    <img className="right" src="/index/images/s_cloth.png"/>
                </div>
            </div>
        )
    }
}
exports.Banner=Banner;
class sTitle extends React.Component{
    change(name){
        var str='';
        const length=name.length;
        for(var i=0;i<length;i++){
            str+=name.charAt(i)+' / ';
        }
        str=str.slice(0,-3);
        return str;
    }
    render(){
        return (
            <div className="stitle">
                <p>
                    {this.props.data.titleleft.toUpperCase()}
                    <span>{this.props.data.titlecenter.toUpperCase()}</span>
                    {this.props.data.titleright.toUpperCase()}
                </p>
                <p className="stitle_name">{this.change(this.props.data.name)}</p>
                <div className="stitle_bottom"></div>
            </div>
        )
    }
}
exports.Title=sTitle;
//底部组件
class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.preventDefault();
        var data = {name: this.name.value,mail:this.mail.value, phone: this.phone.value, message: this.message.value};
        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        }).then((res)=>res.json()).then((data)=> {
            if (data !== 'err') {
                alert('插入成功');

            }
        })
    }
    render(){
        return(
            <div className="zh_footer">
                <div className="zh_shade"></div>
                <div className="zh_table">
                    <form method="post">
                        <div className="zh_table-l">
                            <input type="text" placeholder="姓名" name="userName" ref={(el)=>{this.name=el}} />
                            <input type="text" placeholder="邮箱" name="mail" ref={(el)=>{this.mail=el}}/>
                            <input type="text" placeholder="电话" name="phone" ref={(el)=>{this.phone=el}}/>
                        </div>
                        <div className="zh_table-r">
                            <textarea name="message" id="" ref={(el)=>{this.message=el}}></textarea>
                        </div>
                        {/*<div className="btn" onClick={this.submit}>提交留言</div>*/}
                        <input type="submit" className="btn" value="提交留言" onClick={this.submit} />
                    </form>
                </div>
                <div className="zh_contact">
                    <div className="zh_contactbox">
                    <ul>
                        <li>版权所有：晋中市康晋食品有限公司</li>
                        <li>网 址：www.kangjinsp.com</li>
                    </ul>
                    <ul>
                        <li>咨询电话：0354-3264402</li>
                        <li>地址：晋中市榆次区工业园区（张庆乡东贾村）</li>
                    </ul>
                    <ul>
                        <li>备案号：晋ICP备14006078号</li>
                        <li>邮 箱：wjswjx@foxmail.com</li>
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}
exports.Footer=Footer;

//面包屑组件
class Crumbs extends React.Component{
    render(){
        var length=this.props.data.length;
        return(
            <div className="zh_crumbs">
                <ul>
                    <li>
                        <a href="/">首页 <span>&gt;</span></a>
                    </li>
                        {this.props.data.map((v,i)=><li key={i} className={i+1===length?'active':''}><a href={v.href} className={i+1===length?'zh_color':''}>{v.title}
                            {i+1===length?'':<span>></span>}</a></li>)}
                </ul>
            </div>
        )
    }
}
exports.Crumbs=Crumbs;
//翻页组件
class Page extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var pages=[];
        for(var i=0;i<this.props.data;i++){
            pages.push(<a href="javascript:void(0);" className="zh_pages">0{i+1}</a>);
        }
        return(
            <div className="zh_page">
                <div className="zh_pagebox">
                    <a href="javascript:void(0);" className="zh_all">上一页</a>
                    {pages}
                    <a href="javascript:void(0);" className="zh_all">下一页</a>
                </div>
            </div>
        )
    }
}
exports.Page=Page;
//选项卡
class TabsTitle extends React.Component{
    constructor(props){
        super(props);
        this.state={index:0}
    }
    render(){
        return(
            <li className={this.props.active?"titleItem active":"titleItem"} onClick={()=>(this.props.click(this.props.index))}>
                <a href={this.props.href}>
                    <h1>{this.props.titleCh}</h1>
                    <h2>{this.props.titleEn}</h2>
                    <span className="left"></span>
                    <span className="right"></span>
                </a>
            </li>
        );
    }
}

class TabsControl extends React.Component {
    setIndex(i){
        this.setState({
            index:i
        })
    }

    constructor(props) {
        super(props);
        this.setIndex = this.setIndex.bind(this);
        this.state = {
            index:0
        }
    }
    render() {
        var titles = this.props.data.map((v,i)=>(<TabsTitle key={i} titleEn={v.titleEn} titleCh={v.titleCh} href={v.href} index={i} active={i===this.state.index} click={this.setIndex}/>));
        return (
            <div>
                <ul className="tabTitle">
                    {titles}
                </ul>
                <div className="tabLine"></div>
            </div>
        );
    }
}

class TabComponent extends React.Component{
    render(){
        return(
            <div id="tab">
                <TabsControl data={this.props.data}/>
            </div>
        );
    }
}
exports.TabComponent=TabComponent;

