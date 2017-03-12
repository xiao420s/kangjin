const common=require('./common.jsx');
const React=require('react');
const ReactDOM=require('react-dom');
const Header=common.Header;
const nav=[{name:"公司首页",href:"/"},
    {name:"产品展示",href:"/product",child:[{name:"豆浆",href:"/product/1"},{name:"传统豆制品",href:"/product/2"},{name:"卤制品",href:"/product/3"},{name:"豆芽菜",href:"/product/4"}]},
    {name:"新闻中心",href:"/news",child:[{name:"最新公告",href:"/news/1"},{name:"公司新闻",href:"/news/2"},{name:"行业动态",href:"/news/3"}]},
    {name:"关于我们",href:"/summary",child:[{name:"公司简介",href:"/summary"},{name:"企业文化",href:"/culture"},{name:"荣誉资质",href:"#"},{name:"绿色产业链",href:"/green"}]},
    {name:"营养保健",href:"/health"},
    {name:"联系我们",href:"/contact"},
    {name:"招贤纳士",href:"/recruit"},
    {name:"购买",href:"#"}];

const product_title={titleleft:'display of some',titlecenter:'products',titleright:'of the company',name:'产品展示'};
const about_title={titleleft:'THE',titlecenter:'informations',titleright:'about the company',name:'关于我们'};
const mien_title={titleleft:'THE Elegant',titlecenter:'demeanour',titleright:'of the company',name:'企业风采'};
const Banner=common.Banner;
const Title=common.Title;
const Footer=common.Footer;
const tab=[{id:'1',name:'豆浆',list:[{id:9,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
    {id:1,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
    {id:2,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
    {id:3,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
    {id:4,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
    {id:5,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
    {id:6,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
    {id:7,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
    {id:8,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'}]},
    {id:'2',name:'传统豆制品',list:[{id:9,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:1,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:2,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:3,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:4,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:5,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:6,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:7,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:8,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'}]},
    {id:'3',name:'卤制品',list:[{id:9,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:1,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:2,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:3,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:4,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:5,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:6,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:7,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:8,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'}]},
    {id:'4',name:'豆芽菜',list:[{id:9,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:1,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:2,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:3,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:4,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:5,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'},
        {id:6,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab1.png'},
        {id:7,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab2.png'},
        {id:8,engname:'Bean curd',pinyin:'tofu',name:'豆腐',img:'/index/images/s_tab3.png'}]}]
class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        };
        this.set=this.set.bind(this);
    }
    set(i){
        this.setState({index:i});
    }
    render(){
        return (
            <div className="tab">
                <List index={this.state.index} data={this.props.data.map((v,i)=>({id:v.id,name:v.name}))} click={this.set}/>
                <div className="items">
                    {this.props.data.map((v,i)=><Seamless key={i} cateid={v.id} data={v.list} isActive={this.state.index===i}/>)}
                </div>
            </div>
        )
    }
}
class List extends React.Component{
    render(){
        return (
            <ul className="list">
                {this.props.data.map((v,i)=><li key={i} cateid={v.id} className={this.props.index===i?'active':''} onClick={()=>this.props.click(i)}>{v.name}<div></div></li>)}
            </ul>
        )
    }
}
class Seamless extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        };
        this.seamless=this.seamless.bind(this);
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
    }
    seamless(i){
        return (function () {
            this.setState({
                index:i
            })
        }).bind(this);
    }
    prev(){
        this.setState((ps)=>({index:(ps.index-1<0?0:ps.index-1)}))
    }
    next(){
        this.setState((ps)=>({index:(ps.index+1>2?2:ps.index+1)}))
    }
    render(){
        return (
            <div className="seam_items" style={{display:`${this.props.isActive?'block':'none'}`}}>
                <img className="prev" src="/index/images/s_prev.png" onClick={this.prev}/>
                <img className="next" src="/index/images/s_next.png" onClick={this.next}/>
                <div className="content">
                    <ul className="item_box" style={{transform:`translate3d(${-696*this.state.index}px,0,0)`}}>
                        {this.props.data.map((v,i)=>
                            <li key={i}>
                                <a href={`/product/${this.props.cateid}/${v.id}`}>
                                    <div className="img_box">
                                        <img src={v.img} title={v.name}/>
                                    </div>
                                    <div className="bar">
                                        <p className="eng">{v.engname.toUpperCase()}</p>
                                        <p className="eng pinyin">{v.pinyin.toUpperCase()}</p>
                                        <p className="name">{v.name}</p>
                                    </div>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
                <ul className="indicator">
                    {[1,2,3].map((v,i)=><li key={i} className={i===this.state.index?'active':''} onClick={this.seamless(i)}><div/></li>)}
                </ul>
                <div className="text-center">
                    <a href={`/product/${this.props.cateid}`} className="all">查看全部<span>&gt;</span></a>
                </div>
            </div>
        )
    }
}
class About extends React.Component{
    render(){
        return (
            <div className="about container">
                <div className="left">
                    <p className="about_eng">{'kangjin tofu'.toUpperCase()}</p>
                    <img src="/index/images/s_about_left.jpg"/>
                </div>
                <div className="right">
                    <p>
                        晋中市康晋食品有限公司是集产品研发、生产、仓储、销售、配送于一体的大型农业<br/>
                        产业化品牌企业，自公司成立以来，始终秉承“关爱百姓健康、造福和谐三晋”的企业愿景，致力于生产...
                    </p>
                    <p className="about_eng">Jinzhong Kang Jin Food Co., Ltd. is a product development, production, warehousing, sales, distribution in one<br/> of the large-scale agriculture...</p>
                    <img src="/index/images/s_about_right.png"/>
                    <div className="decorate"></div>
                    <div className="decorate_"></div>
                    <div className="all_box">
                        <a href="/summary" className="all">查看全部<span>&gt;</span></a>
                    </div>
                </div>
            </div>
        )
    }
}
class Greensafe extends React.Component{
    render(){
        return (
            <div className="green">
                <img className="bg" src="/index/images/s_green.png"/>
                <div className="content">
                    <p className="green_sm green_title">绿色安全生产链</p>
                    <p className="green_sm green_stitle">选取健康材料</p>
                    <p className="green_sm green_content" style={{right:'110px'}}>康晋公司在原料的选用上 ， 全部采用</p>
                    <p className="green_sm green_content" style={{right:'130px'}}>国产优质非转基因大豆 ， 绝不采用任何转基因原料 ， </p>
                    <p className="green_sm green_content" style={{right:'150px'}}>绿豆定点采购于内蒙古栅栏特旗 、 </p>
                    <p className="green_sm green_content" style={{right:'170px'}}>黄豆采购于黑龙江绥化地区 ，其豆种含人体所需的营养</p>
                    <p className="green_sm green_content" style={{right:'190px'}}>成分高 、 发芽率达<span>98%</span>以上 。 目前公司已</p>
                    <p className="green_sm green_content" style={{right:'210px'}}>与栅栏特旗 、 绥化两地的农业合作社达成长期</p>
                    <p className="green_sm green_content" style={{right:'230px'}}>合作种植协议 ， 确保 <span>...</span></p>
                    <p className="green_eng">Began in the classic<br/>Rather than solely on a classic</p>
                </div>
            </div>
        )
    }
}
class Mien extends React.Component{
    render(){
        return (
            <div className="mien">
                <div className="mien_left">
                    <img src="/index/images/s_mien1.jpg" className="mien_top"/>
                    <img src="/index/images/s_mien2.jpg"/>
                </div>
                <div className="mien_right">
                    <div className="mien_top" style={{backgroundImage:'url(/index/images/s_mien3.jpg)',height:'364px'}}>
                        <div className="mien_top_box">
                            <div className="decorate"></div>
                            <p className="mien_eng">{'SAFEty feel health'.toUpperCase()}</p>
                            <p className="mien_title">安全/放心/营养/健康</p>
                            <p className="mien_content">康晋公司全力打造精英团队，用一流人品，生产一流产品。</p>
                        </div>
                    </div>
                    <img src="/index/images/s_mien4.jpg"/>
                </div>
            </div>
        )
    }
}
class Record extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="record">
                {this.props.data.map((v,i)=><Srecord data={v} key={i}/>)}
            </div>
        )
    }
}
class Srecord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:0,
            flag:true
        };
    }
    componentDidMount(){
        var that=this;
        $(window).on("scroll",function() {
            var top = $(window).scrollTop();
            if(that.state.flag){
                if(top>=3400){
                    var obj={index:0};
                    $(obj).animate({index:that.props.data.num},{
                        duration:2000,
                        step:(val)=>{
                            var bb=Math.round(val);
                            that.setState({index:bb})
                        },
                        complete:()=>{
                            that.setState({flag:false})
                        }
                    })
                }
            }
        });
    }
    render(){
        return (
            <div className="srecord">
                <p className="record_eng">{this.props.data.eng}</p>
                <p className="record_name">{this.props.data.name}</p>
                <p className="record_num">{this.state.index}</p>
                <div></div>
            </div>
        )
    }
}
const recorddata=[{eng:'Investment amount',name:'投资金额（千万）',num:20},
    {eng:'Number of employees',name:'员工人数',num:150},
    {eng:'Area covered',name:'占地面积（亩）',num:60},
    {eng:'Annual output',name:'年产豆制品（吨）',num:30000}];
class Index extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div ref={'box'} >
                <Header data={this.props.header}/>
                <Banner/>
                <div style={{height:'100px'}}/>
                <Title data={this.props.producttitle}/>
                <Tab data={this.props.tab}/>
                <div style={{height:'148px'}}/>
                <Title data={this.props.abouttitle}/>
                <About/>
                <div style={{height:'116px'}}/>
                <Greensafe/>
                <div style={{height:'190px'}}/>
                <Title data={this.props.mientitle}/>
                <Mien/>
                <div style={{height:'136px'}}/>
                <div ref={'myrecord'}>
                    <Record data={this.props.record}/>
                </div>
                <div style={{height:'194px'}}/>
                <Footer/>
            </div>
        )
    }
}
ReactDOM.render(<Index header={nav} producttitle={product_title} tab={tab} abouttitle={about_title} mientitle={mien_title} record={recorddata}/>,document.getElementById('page'));