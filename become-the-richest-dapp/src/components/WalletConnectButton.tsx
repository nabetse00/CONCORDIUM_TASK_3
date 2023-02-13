import { useConnect, useConnection, WalletConnectionProps, withJsonRpcClient } from '@concordium/react-components';
import { Alert, Button, Layout, Menu, Spin, theme } from 'antd';
import { useEffect, useState, } from 'react'
import { BROWSER_WALLET, WALLET_CONNECT } from '../config/wallet';
import { errorString } from '../utils/errors';

export function WalleConnectButton(props: WalletConnectionProps) {
    const { activeConnectorType, activeConnector, activeConnectorError, network, connectedAccounts, genesisHashes } =
        props;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);
    const [rpcGenesisHash, setRpcGenesisHash] = useState<string>();
    const [rpcError, setRpcError] = useState('');
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
    }, [connection, genesisHash, network]);

    return (
        <>
            <div>
                <div>
                    account:
                {account}
                </div>
                {activeConnectorError && <Alert message="activeConnectorError " description={activeConnectorError} type="error"
                    showIcon />}
            </div>
            {!activeConnectorError && activeConnectorType && !activeConnector && <Spin />}
            {
                connectError && <Alert message="connectError " description={connectError} type="error"
                    showIcon />
            }
            {
                activeConnector && !account && (
                    <Button onClick={connect} disabled={isConnecting}>
                        {isConnecting && 'Connecting...'}
                        {!isConnecting && activeConnectorType === BROWSER_WALLET && 'Connect Browser Wallet'}
                        {!isConnecting && activeConnectorType === WALLET_CONNECT && 'Connect Mobile Wallet'}
                    </Button>
                )
            }
        </>
    );
}