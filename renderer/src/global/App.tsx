import React from 'react';
import { Layout, Menu, Breadcrumb, Skeleton } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import RouterComponent from './Router';
import { remote } from 'electron';
import { useHistory, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function AppLayout(): JSX.Element {
  const history = useHistory();

  const onSelect = ({ key }) => {
    history.push(key);
  };
  return (
    <>
      {/* <Layout style={{ minHeight: 'calc(100vh - 30px)' }}> */}
      <Layout style={{ minHeight: 'calc(100vh - 0px)' }}>
        <Header className="header">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Skeleton.Input
              active
              className="logo"
              style={{ width: 200, height: '50%', margin: '16px 0' }}
            />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              onSelect={onSelect}
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item icon={<UserOutlined />} key="/casher">
                Casher
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />} key="/storage">
                Storage
              </Menu.Item>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="My Profile">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 6px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <RouterComponent />
            </Content>
            <Footer style={{ textAlign: 'center', padding: '12px 50px' }}>
              {`sadenSL v${remote.app.getVersion()} © Qatara`}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default withRouter(AppLayout);
