const React = require('react');
const ReactDOM = require('react-dom');
const common=require('./common.jsx');
const Header=common.Header;
const Footer=common.Footer;
const Crumbs=common.Crumbs;
class ZKY_banner extends React.Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.unmove = this.unmove.bind(this);
        this.move = this.move.bind(this);
        this.state = {
            index: 0,
            flag: true,
            t:null
        }
    }

    next() {
        var h = this.props.data.imgPath.length;
        var v = this.state.index + 1 < h ? this.state.index + 1 : 0;
        this.setState({
            index: v,
        })
    }

    unmove() {
        this.setState({
            flag: false
        });
    }
    move() {
        this.setState({
            flag: true
        });

    }
    componentWillUpdate(){
        if (this.state.flag){
        }else {
            clearInterval(this.state.t);
        }
    }
    componentDidMount() {
        this.setState({t:setInterval(() => {
            var h = this.props.data.imgPath.length;
            var v = this.state.index + 1 < h ? this.state.index + 1 : 0;
            this.setState({
                index: v,
            })
        }, 1000)})

    }

    render() {
        var btns = this.props.data.imgPath.map((v, i) => <ZKY_btn key={i} index={i} active={i === this.state.index}/>);
        var imgs = this.props.data.imgPath.map((v, i) => <ZKY_imgs key={i} data={v.img}
                                                                   active={i === this.state.index}/>)
        return (
            <div className="zky_big">
                <div className="zky_container">
                    <ZKY_direction data={data}/>
                    <div className="zky_pic">
                        <div className="zky_data">
                            <span>0{this.state.index + 1}</span>
                            <span>&nbsp;/&nbsp;04</span>
                        </div>
                        <div className="zky_ba" onMouseOver={this.unmove} onMouseOut={this.move}>
                            <div className="zky_move">
                                {imgs}
                            </div>
                            <div  onClick={this.next}>
                            <div className="zky_border1"></div>
                            <div className="zky_border2"></div>
                            <div className="zky_border3"></div>
                            </div>
                            <div className="zky_btns">
                                {btns}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
class ZKY_imgs extends React.Component {

    render() {
        return (
            <div>
                <img src={this.props.data} className={`${this.props.active ? 'active' : ''}`} alt=""/>
            </div>
        )
    }
}

class ZKY_direction extends React.Component {
    render() {
        return (
            <div className="zky_tit">
                <h3>{this.props.data.h3}</h3>
                <h1>{this.props.data.h1}</h1>
                <h4 className="zky_title">{this.props.title}</h4>
                <p className="zky_text1">
                    {this.props.data.content}
                </p>
                <p className="zky_text2">
                    {this.props.data.text}
                </p>
            </div>
        )
    }
}
class ZKY_btn extends React.Component {
    render() {
        var imgs = <img src={`${this.props.active ? '/index/images/zky_btn1' : '/index/images/zky_btn2'}.png`}
                        alt=""/>;
        return (
            <div className="zky_btn">
                {imgs}
            </div>
        )
    }
}
//内容
class ZKY_title extends React.Component {
    render() {
        return (
            <div className="zky_titles">
                <div className="zky_bell">
                    <img src="/index/images/zky_tit1.png" alt=""/>
                </div>
                <p className="zky_word_e">{this.props.data.tit1}
                    <strong> {this.props.data.tit2}</strong> {this.props.data.tit3}</p>
                <p className="zky_word_c">{this.props.data.tit4}</p>

            </div>
        )
    }
}


class ZKY_content extends React.Component {
    render() {
        return (
            <div >
                <img src={this.props.data.pic} alt=""/>
                <div className="zky_context">
                    <p>{this.props.data.des1}</p>
                    <p>{this.props.data.des2}</p>
                    <p>{this.props.data.des3}</p>

                </div>
            </div>
        )
    }
}
class ZKY_contents extends React.Component {
    render() {
        var contents = this.props.data.map((v, i) => <ZKY_content key={i} data={v}/>);
        return (
            <div className="zky_display">
                {contents}
            </div>
        )
    }
}
class ZKY_App extends React.Component {
    render() {
        return (
            <div>
                <Header data={nav}/>
                <Crumbs data={cru}/>
                <ZKY_banner data={data}/>
                <ZKY_title data={display}/>
                <ZKY_contents data={products}/>
                <Footer />

            </div>
        )
    }
}

const nav=[{name:"公司首页",href:"/"},
    {name:"产品展示",href:"/product",child:[{name:"豆浆",href:"/product/1"},{name:"传统豆制品",href:"/product/2"},{name:"卤制品",href:"/product/3"},{name:"豆芽菜",href:"/product/4"}]},
    {name:"新闻中心",href:"/news",child:[{name:"最新公告",href:"/news/1"},{name:"公司新闻",href:"/news/2"},{name:"行业动态",href:"/news/3"}]},
    {name:"关于我们",href:"/summary",child:[{name:"公司简介",href:"/summary"},{name:"企业文化",href:"/culture"},{name:"荣誉资质",href:"#"},{name:"绿色产业链",href:"/green"}]},
    {name:"营养保健",href:"/health"},
    {name:"联系我们",href:"/contact"},
    {name:"招贤纳士",href:"/recruit"},
    {name:"购买",href:"#"}];
var products = [
    {
        pic: ' /index/images/zky_dis.png',
        des1: '1.准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高',
        des2: '速搅打两分钟，使之成浓浆，在小锅上放好',
        des3: '过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开'
    },
    {
        pic: '/index/images/zky_dis1.png',
        des1: '2准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高',
        des2: '速搅打两分钟，使之成浓浆，在小锅上放好',
        des3: '过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开'
    },
    {
        pic: '/index/images/zky_dis2.png',
        des1: '3准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高',
        des2: '速搅打两分钟，使之成浓浆，在小锅上放好',
        des3: '过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开'
    }
];
const cru=[{title:'全部商品',href:'/product/1'},{title:'油泼豆腐',href:'/product/1/1'}];
var display =
    {
        tit1: 'DISPLAY  OF  SOME',
        tit2: 'PRODUCTS',
        tit3: 'OF THE COMPANY',
        tit4: '制 / 作 / 步 / 骤'
    };
var data =
    {
        h3: 'EVERY FAMILY HAS ITS OWN ',
        h1: '4SPECIAL FOOD.',
        title: '营养功效',
        content: ' 油泼豆腐特点是颜色洁白、原汁原味，咸鲜适口、香滑味美，营养丰富。',
        text: 'Youpo tofu is characterized by white color, flavor, salty                           taste, delicious fragrance, rich nutrition.',
        imgPath: [{
            img: '/index/images/zky_banner1.png',
            data: '01'
        },
            {
                img: '/index/images/zky_banner1.png',
                data: '02'
            },
            {
                img: '/index/images/zky_banner1.png',
                data: '03'
            },
            {
                img: '/index/images/zky_banner1.png',
                data: '04'
            }
        ]


    };

ReactDOM.render(<ZKY_App/>, document.getElementById('page'));
