// import { Dropdown } from 'react-bootstrap';
import type { MenuProps } from 'antd';
import { Dropdown, Space, message } from 'antd';
import { Network } from '@concordium/react-components';
import { useCallback, useState } from 'react';
import { DesktopOutlined, DownOutlined, ClusterOutlined } from '@ant-design/icons';

interface Props {
    selected: Network;
    options: Array<Network>;
    select: (n: Network) => void;
}

export function NetworkSelector({ selected, options, select }: Props) {
    //const onSelect = useCallback((key: any) => select(options[key as number]), [options, select]);
    const [loadings, setLoadings] = useState<boolean[]>([]);

    let items: MenuProps['items'] = [];
    let i = 1

    const change = (n: Network) => {
        console.log("changed to " + n.name)

    }

    const isDanger = (n: Network) => {
        if (n.name == "mainnet") {
            return true
        }
        return false
    }

    for (let n of options) {

        items.push(
            {
                label: n.name,
                key: i,
                onClick: () => select(n),
                danger: isDanger(n),
                icon: (!isDanger(n))? <DesktopOutlined />:<ClusterOutlined />,
            },
        )
        i++;
    }

    const handleMenuClick = (e: any) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };


    const enterLoading = (index: number) => {
        setLoadings((state) => {
            const newLoadings = [...state];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((state) => {
                const newLoadings = [...state];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    return (
        <Space direction="vertical">
            <Dropdown.Button size='large' menu={{ items }} onClick={handleMenuClick} icon={<DownOutlined />} arrow danger={isDanger(selected)}>
                {selected.name}
            </Dropdown.Button>
        </Space>
    );
};