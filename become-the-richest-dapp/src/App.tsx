import { createContext, createElement, useContext, useEffect, useState, } from 'react'
import './App.css'
import { NetworkSelector } from './components/NetworkSelector'
import { Network, useConnect, useConnection, WalletConnectionProps, withJsonRpcClient, WithWalletConnector } from '@concordium/react-components';
import { MAINNET, TESTNET } from './config/networks'

import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { Alert, Button, Layout, Menu, Space, Spin, theme } from 'antd';
import { Col, Row } from 'antd';
import { WalleSelectorButton } from './components/WalletSelectorButton';
import { BROWSER_WALLET, WALLET_CONNECT } from './config/wallet';
import { errorString } from './utils/errors';
import { ConnectedAccount } from './components/ConnectedAccount';
import { Link, Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;

export const NetworkContext = createContext({ network: TESTNET, setNetwork: (n: Network) => { } });
export const WalletContext = createContext({ network: TESTNET, setNetwork: (n: Network) => { } });

export function Root(): JSX.Element {
  const [network, setNetwork] = useState(TESTNET);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <WithWalletConnector network={network}>{(props) => <App {...props} />}</WithWalletConnector>
    </NetworkContext.Provider>
  );
}

export function App(props: WalletConnectionProps) {
  const { activeConnectorType, activeConnector, activeConnectorError, network, connectedAccounts, genesisHashes } =
    props;
  const networkCtx = useContext(NetworkContext);
  const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
  const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);
  const [rpcGenesisHash, setRpcGenesisHash] = useState<string>();
  const [rpcError, setRpcError] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const [outletProps, setOutletProps] = useState({ connection, account, network })

  const footerText = "Nabetse ©2023 Created by Nabetse"

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (connection) {
      setRpcGenesisHash(undefined);
      withJsonRpcClient(connection, async (rpc) => {
        const status = await rpc.getConsensusStatus();
        return status.genesisBlock;
      })
        .then((hash) => {
          setRpcGenesisHash(hash);
          setRpcError('');
        })
        .catch((err) => {
          setRpcGenesisHash(undefined);
          setRpcError(errorString(err));
        });
    }

    if (connection && account) {
      setOutletProps({ connection, account, network })
    }

    if (connection && !account) {
      setOutletProps({ connection, account, network })
    }

    //console.log("APP useeffedt => " + JSON.stringify(outletProps))
  }, [connection, genesisHash, network, account]);

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: (
                  <Link to="/account">
                    Account
                  </Link>),
              },
              {
                key: '2',
                icon: <ContactsOutlined />,
                label: (<Link to="/contract">
                  Contract
                </Link>),
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },

            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row>
              <Col span={3}>
                {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
              </Col>
              <Col flex="auto" />
              <Col span={12}>
                <Space size="small">
                  <ConnectedAccount connection={connection} account={account} network={network} />
                  <WalleSelectorButton
                    connectorName={'Browser wallet'}
                    connectorType={BROWSER_WALLET}
                    connection={connection}
                    {...props} />
                  <WalleSelectorButton
                    connectorType={WALLET_CONNECT}
                    connectorName="WalletConnect"
                    connection={connection}
                    {...props}
                  />
                  <>
                    {
                      activeConnector && !account && (
                        <Button size='large' onClick={connect} disabled={isConnecting}>
                          {isConnecting && 'Connecting...'}
                          {!isConnecting && activeConnectorType === BROWSER_WALLET && 'Connect Browser Wallet'}
                          {!isConnecting && activeConnectorType === WALLET_CONNECT && 'Connect Mobile Wallet'}
                        </Button>
                      )
                    }
                  </>
                  <NetworkSelector selected={networkCtx.network} options={[TESTNET, MAINNET]} select={networkCtx.setNetwork} />
                </Space>

              </Col>
            </Row>


          </Header>
          <Content
            style={{
              margin: '48px 48px',
              padding: 48,
              minHeight: "100vh",
              background: colorBgContainer,
            }} >

            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
              <Outlet context={outletProps} />

              <hr />
              {activeConnectorError && <Alert message="activeConnectorError " description={activeConnectorError} type="error"
                showIcon />}

              {!activeConnectorError && activeConnectorType && !activeConnector && <Spin />}
              {
                connectError && <Alert message="connectError " description={connectError} type="error"
                  showIcon />
              }
            </Space>

          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {footerText}
          </Footer>
        </Layout>

      </Layout>
    </>
  );
}


export default Root
