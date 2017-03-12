const React=require('react');
const ReactDOM=require('react-dom');
const common=require('./admin_common.jsx');
const MyHeader=common.Header;
const MySide=common.Side;
const MyFooter=common.Footer;
const MyCrumbs=common.Crumbs;
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Button } from 'antd';

class Admin extends React.Component{
    render(){
        return (
            <div>
                <Layout>
                    <Header style={{height:'80px',background:'#2b3643',padding:'0'}}><MyHeader/></Header>
                    <Layout>
                        <Sider><MySide/></Sider>
                        <Content style={{background:"#fff"}}>
                            <MyCrumbs/>
                            <Button type="primary" style={{margin:'16px auto'}}>添加</Button>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                        </Content>
                    </Layout>
                    <Footer style={{padding:0}}><MyFooter/></Footer>
                </Layout>
            </div>
        )
    }
}

import { Table } from 'antd';

const columns = [{
    title:'编号',
    dataIndex:'key',
}, {
    title: '标题',
    dataIndex: 'caption',
    render: text => <a href="#">{text}</a>,
}, {
    title: '创建日期',
    dataIndex: 'date',
}, {
    title: '浏览次数',
    dataIndex: 'hits',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="/admin/admin_news/1">编辑</a>
      <span className="ant-divider"/>
      <a href="#">删除</a>
    </span>
    ),
}];
const data = [{
    key: '1',
    caption: 'John',
    date: '2017.3.3',
    hits: 300,
}, {
    key: '2',
    caption: 'Jim Green',
    date: '2017.3.4',
    hits: 400,
}, {
    key: '3',
    caption: 'Joe Black',
    date: '2017.3.5',
    hits: 500,
}, {
    key: '4',
    caption: 'Disabled User',
    date: '2017.3.6',
    hits: 400,
}];
// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};
ReactDOM.render(<Admin/>,document.querySelector('#page'));
