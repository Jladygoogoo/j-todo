import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Divider } from 'antd';
import {
  CalendarOutlined,
  BarsOutlined,
  HistoryOutlined
} from '@ant-design/icons';

const { Footer, Sider } = Layout;

class BaseLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <div className='logo'/>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme={'light'}>
          <div className='sidebar-text'><h2>J-ToDo</h2></div>
          <Divider />
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<BarsOutlined />}>
              <Link to='/'> 待办事项</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
            <Link to='/calendar'>日历</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined />}>
            <Link to='/calendar'>历史记录</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          {this.props.children}
          <Footer style={{ textAlign: 'center' }}>by Jladygoogoo💗</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;