declare module 'dirty-chai';
declare module 'es6-promisify';

// tslint:disable:max-classes-per-file
// tslint:disable:class-name
// tslint:disable:async-suffix
// tslint:disable:completed-docs

// Ethereumjs-tx declarations
declare module 'ethereumjs-tx' {
    class EthereumTx {
        public raw: Buffer[];
        public r: Buffer;
        public s: Buffer;
        public v: Buffer;
        public nonce: Buffer;
        public serialize(): Buffer;
        public getSenderAddress(): Buffer;
        constructor(txParams: any);
    }
    export = EthereumTx;
}

// Ledgerco declarations
interface ECSignatureString {
    v: string;
    r: string;
    s: string;
}
interface ECSignature {
    v: number;
    r: string;
    s: string;
}
declare module 'ledgerco' {
    interface comm {
        close_async(): Promise<void>;
    }
    export class comm_node implements comm {
        public static create_async(timeoutMilliseconds?: number): Promise<comm_node>;
        public close_async(): Promise<void>;
    }
    export class comm_u2f implements comm {
        public static create_async(): Promise<comm_u2f>;
        public close_async(): Promise<void>;
    }
    export class eth {
        public comm: comm;
        constructor(comm: comm);
        public getAddress_async(
            path: string,
            display?: boolean,
            chaincode?: boolean,
        ): Promise<{ publicKey: string; address: string; chainCode: string }>;
        public signTransaction_async(path: string, rawTxHex: string): Promise<ECSignatureString>;
        public getAppConfiguration_async(): Promise<{
            arbitraryDataEnabled: number;
            version: string;
        }>;
        public signPersonalMessage_async(path: string, messageHex: string): Promise<ECSignature>;
    }
}

// Semaphore-async-await declarations
declare module 'semaphore-async-await' {
    class Semaphore {
        constructor(permits: number);
        public wait(): Promise<void>;
        public signal(): void;
    }
    export default Semaphore;
}

// web3-provider-engine declarations
declare module 'web3-provider-engine/subproviders/subprovider' {
    class Subprovider {}
    export = Subprovider;
}
declare module 'web3-provider-engine/subproviders/rpc' {
    import * as Web3 from 'web3';
    class RpcSubprovider {
        constructor(options: { rpcUrl: string });
        public handleRequest(
            payload: Web3.JSONRPCRequestPayload,
            next: () => void,
            end: (err: Error | null, data?: any) => void,
        ): void;
    }
    export = RpcSubprovider;
}
declare module 'web3-provider-engine' {
    class Web3ProviderEngine {
        public on(event: string, handler: () => void): void;
        public send(payload: any): void;
        public sendAsync(payload: any, callback: (error: any, response: any) => void): void;
        public addProvider(provider: any): void;
        public start(): void;
        public stop(): void;
    }
    export = Web3ProviderEngine;
}
declare module 'web3-provider-engine/util/rpc-cache-utils' {
    class ProviderEngineRpcUtils {
        public static blockTagForPayload(payload: any): string | null;
    }
    export = ProviderEngineRpcUtils;
}
declare module 'web3-provider-engine/subproviders/fixture' {
    import * as Web3 from 'web3';
    class FixtureSubprovider {
        constructor(staticResponses: any);
        public handleRequest(
            payload: Web3.JSONRPCRequestPayload,
            next: () => void,
            end: (err: Error | null, data?: any) => void,
        ): void;
    }
    export = FixtureSubprovider;
}

// hdkey declarations
declare module 'hdkey' {
    class HDNode {
        public publicKey: Buffer;
        public chainCode: Buffer;
        public constructor();
        public derive(path: string): HDNode;
    }
    export = HDNode;
}
