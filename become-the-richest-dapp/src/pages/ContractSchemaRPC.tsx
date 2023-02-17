import { err, ok, Result, ResultAsync } from 'neverthrow';
import { errorString } from '../utils/errors';
import { ModuleReference } from '@concordium/web-sdk';
import { WalletConnection, withJsonRpcClient } from '@concordium/wallet-connectors';
import { useEffect } from 'react';
import { useState } from "react";
import { InstanceInfo } from '@concordium/web-sdk';
import { Buffer } from 'buffer/';

export interface SchemaRpcResult {
    sectionName: string;
    schema: string;
}

function findCustomSection(m: WebAssembly.Module) {
    function getCustomSection(name: string): [string, ArrayBuffer[]] | undefined {
        const s = WebAssembly.Module.customSections(m, name);
        return s.length === 0 ? undefined : [name, s];
    }
    return (
        getCustomSection('concordium-schema-v1') ||
        getCustomSection('concordium-schema-v2') ||
        getCustomSection('concordium-schema')
    );
}

function findSchema(m: WebAssembly.Module): Result<SchemaRpcResult | undefined, string> {
    const section = findCustomSection(m);
    if (!section) {
        return ok(undefined);
    }
    const [name, schema] = section;
    if (schema.length !== 1) {
        return err(`unexpected size of custom section "${name}"`);
    }
    return ok({ sectionName: name, schema: Buffer.from(schema[0]).toString('base64') });
}

export function useContractSchemaRpc(connection: WalletConnection | undefined, contract: InstanceInfo | undefined) {
    const [result, setResult] = useState<Result<SchemaRpcResult | undefined, string>>();
    useEffect(() => {
        if (connection && contract) {
            ResultAsync.fromPromise(
                withJsonRpcClient(connection, (rpc) => rpc.getModuleSource(new ModuleReference(contract.sourceModule.moduleRef))),
                errorString
            )
                .andThen((r) => {
                    if (!r || r.length < 12) {
                        return err('module source is empty');
                    }
                    if (r.length < 12) {
                        return err('module source is too short');
                    }
                    return ResultAsync.fromPromise(WebAssembly.compile(r.slice(12)), errorString);
                })
                .andThen(findSchema)
                .then(setResult);
        }
    }, [contract, connection]);
    return result?.unwrapOr(undefined);
}