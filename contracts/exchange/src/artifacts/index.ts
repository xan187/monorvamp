import { ContractArtifact } from 'ethereum-types';

import * as Exchange from '../../generated-artifacts/Exchange.json';
import * as ExchangeWrapper from '../../generated-artifacts/ExchangeWrapper.json';
import * as IAssetProxyDispatcher from '../../generated-artifacts/IAssetProxyDispatcher.json';
import * as IExchange from '../../generated-artifacts/IExchange.json';
import * as IExchangeCore from '../../generated-artifacts/IExchangeCore.json';
import * as IMatchOrders from '../../generated-artifacts/IMatchOrders.json';
import * as ISignatureValidator from '../../generated-artifacts/ISignatureValidator.json';
import * as ITransactions from '../../generated-artifacts/ITransactions.json';
import * as IValidator from '../../generated-artifacts/IValidator.json';
import * as IWallet from '../../generated-artifacts/IWallet.json';
import * as IWrapperFunctions from '../../generated-artifacts/IWrapperFunctions.json';
import * as TestAssetProxyDispatcher from '../../generated-artifacts/TestAssetProxyDispatcher.json';
import * as TestExchangeInternals from '../../generated-artifacts/TestExchangeInternals.json';
import * as TestSignatureValidator from '../../generated-artifacts/TestSignatureValidator.json';
import * as TestStaticCallReceiver from '../../generated-artifacts/TestStaticCallReceiver.json';
import * as Validator from '../../generated-artifacts/Validator.json';
import * as Wallet from '../../generated-artifacts/Wallet.json';
import * as Whitelist from '../../generated-artifacts/Whitelist.json';

export const artifacts = {
    Exchange: Exchange as ContractArtifact,
    TestAssetProxyDispatcher: TestAssetProxyDispatcher as ContractArtifact,
    TestExchangeInternals: TestExchangeInternals as ContractArtifact,
    TestSignatureValidator: TestSignatureValidator as ContractArtifact,
    TestStaticCallReceiver: TestStaticCallReceiver as ContractArtifact,
    IExchange: IExchange as ContractArtifact,
    IExchangeCore: IExchangeCore as ContractArtifact,
    IMatchOrders: IMatchOrders as ContractArtifact,
    ISignatureValidator: ISignatureValidator as ContractArtifact,
    ITransactions: ITransactions as ContractArtifact,
    IWrapperFunctions: IWrapperFunctions as ContractArtifact,
    IAssetProxyDispatcher: IAssetProxyDispatcher as ContractArtifact,
    IValidator: IValidator as ContractArtifact,
    IWallet: IWallet as ContractArtifact,
    ExchangeWrapper: ExchangeWrapper as ContractArtifact,
    Validator: Validator as ContractArtifact,
    Wallet: Wallet as ContractArtifact,
    Whitelist: Whitelist as ContractArtifact,
};
