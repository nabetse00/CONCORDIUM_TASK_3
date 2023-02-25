import { SignClientTypes } from '@walletconnect/types';
import {
    BrowserWalletConnector,
    ephemeralConnectorType,
    WalletConnectConnector,
} from '@concordium/react-components';

const WALLET_CONNECT_PROJECT_ID = "e5ca1eda26924c0c56f63cf8b5c55c32"
const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'become_the_richest Contract Update',
        description: 'Become the Richest dApp demo',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = ephemeralConnectorType(WalletConnectConnector.create.bind(this, WALLET_CONNECT_OPTS));