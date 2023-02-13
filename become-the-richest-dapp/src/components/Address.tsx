import { Avatar, Button, Skeleton, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React, { useContext } from "react";
import Blockies from "react-blockies";
import { NetworkContext } from "../App";

// changed value={address} to address={address}

const { Text } = Typography;


/** 
  ~ What it does? ~
  Displays an address with a blockie image and option to copy address
  ~ How can I use? ~
  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />
  ~ Features ~
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
**/



export default function Address(props: { address?: string; minimized?: boolean; fontSize?: number; onChange?: any; }): JSX.Element {
    const networkCtx = useContext(NetworkContext);
    const address = props.address;
    let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
    // const etherscanLink = 'https://'+ networkCtx.network.name + '.ccdscan.io/?dcount=1&dentity=account&daddress=' + address
    const scanLink = networkCtx.network.ccdScanBaseUrl + '/?dcount=1&dentity=account&daddress=' + address
    return (
        <>
            {address &&
                <Button type="dashed" size="large">
                    <Space direction="horizontal">
                        <Avatar size="small" icon={<Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4} />} />
                        <Link copyable={{ text: address }} href={scanLink} target="_blank" rel="noopener noreferrer">
                            {displayAddress}
                        </Link>
                    </Space>
                </Button>
            }
        </>
    );
}