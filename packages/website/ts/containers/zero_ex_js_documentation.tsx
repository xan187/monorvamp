import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DocPage as DocPageComponent, DocPageProps } from 'ts/pages/documentation/doc_page';
import { DocsInfo } from 'ts/pages/documentation/docs_info';
import { Dispatcher } from 'ts/redux/dispatcher';
import { State } from 'ts/redux/reducer';
import { DocPackages, DocsInfoConfig, Environments, SupportedDocJson, WebsitePaths } from 'ts/types';
import { configs } from 'ts/utils/configs';
import { constants } from 'ts/utils/constants';
import { Translate } from 'ts/utils/translate';

/* tslint:disable:no-var-requires */
const IntroMarkdown = require('md/docs/0xjs/introduction');
const InstallationMarkdown = require('md/docs/0xjs/installation');
const AsyncMarkdown = require('md/docs/0xjs/async');
const ErrorsMarkdown = require('md/docs/0xjs/errors');
const versioningMarkdown = require('md/docs/0xjs/versioning');
/* tslint:enable:no-var-requires */

const zeroExJsDocSections = {
    introduction: 'introduction',
    installation: 'installation',
    testrpc: 'testrpc',
    async: 'async',
    errors: 'errors',
    versioning: 'versioning',
    zeroEx: 'zeroEx',
    exchange: 'exchange',
    token: 'token',
    tokenRegistry: 'tokenRegistry',
    etherToken: 'etherToken',
    proxy: 'proxy',
    orderWatcher: 'orderWatcher',
    types: constants.TYPES_SECTION_NAME,
};

const docsInfoConfig: DocsInfoConfig = {
    id: DocPackages.ZeroExJs,
    type: SupportedDocJson.TypeDoc,
    displayName: '0x.js',
    packageUrl: 'https://github.com/0xProject/0x.js',
    menu: {
        introduction: [zeroExJsDocSections.introduction],
        install: [zeroExJsDocSections.installation],
        topics: [zeroExJsDocSections.async, zeroExJsDocSections.errors, zeroExJsDocSections.versioning],
        zeroEx: [zeroExJsDocSections.zeroEx],
        contracts: [
            zeroExJsDocSections.exchange,
            zeroExJsDocSections.token,
            zeroExJsDocSections.tokenRegistry,
            zeroExJsDocSections.etherToken,
            zeroExJsDocSections.proxy,
        ],
        orderWatcher: [zeroExJsDocSections.orderWatcher],
        types: [zeroExJsDocSections.types],
    },
    sectionNameToMarkdown: {
        [zeroExJsDocSections.introduction]: IntroMarkdown,
        [zeroExJsDocSections.installation]: InstallationMarkdown,
        [zeroExJsDocSections.async]: AsyncMarkdown,
        [zeroExJsDocSections.errors]: ErrorsMarkdown,
        [zeroExJsDocSections.versioning]: versioningMarkdown,
    },
    // Note: This needs to be kept in sync with the types exported in index.ts. Unfortunately there is
    // currently no way to extract the re-exported types from index.ts via TypeDoc :( Make sure to only
    // ADD types here, DO NOT REMOVE types since they might still be needed for older supported versions
    publicTypes: [
        'Order',
        'SignedOrder',
        'ECSignature',
        'ZeroExError',
        'EventCallback',
        'EventCallbackAsync',
        'EventCallbackSync',
        'ExchangeContractErrs',
        'ContractEvent',
        'Token',
        'ExchangeEvents',
        'IndexedFilterValues',
        'SubscriptionOpts',
        'BlockRange',
        'BlockParam',
        'OrderFillOrKillRequest',
        'OrderCancellationRequest',
        'OrderFillRequest',
        'ContractEventEmitter',
        'Web3Provider',
        'ContractEventArgs',
        'LogCancelArgs',
        'LogFillArgs',
        'LogErrorContractEventArgs',
        'LogFillContractEventArgs',
        'LogCancelContractEventArgs',
        'EtherTokenContractEventArgs',
        'WithdrawalContractEventArgs',
        'DepositContractEventArgs',
        'TokenEvents',
        'ExchangeContractEventArgs',
        'TransferContractEventArgs',
        'ApprovalContractEventArgs',
        'TokenContractEventArgs',
        'ZeroExConfig',
        'TransactionReceiptWithDecodedLogs',
        'LogWithDecodedArgs',
        'EtherTokenEvents',
        'BlockParamLiteral',
        'DecodedLogArgs',
        'MethodOpts',
        'ValidateOrderFillableOpts',
        'OrderTransactionOpts',
        'TransactionOpts',
        'ContractEventArg',
        'LogEvent',
        'LogEntry',
        'DecodedLogEvent',
        'EventWatcherCallback',
        'OnOrderStateChangeCallback',
        'OrderStateValid',
        'OrderStateInvalid',
        'OrderState',
        'OrderStateWatcherConfig',
        'FilterObject',
    ],
    sectionNameToModulePath: {
        [zeroExJsDocSections.zeroEx]: ['"src/0x"'],
        [zeroExJsDocSections.exchange]: ['"src/contract_wrappers/exchange_wrapper"'],
        [zeroExJsDocSections.tokenRegistry]: ['"src/contract_wrappers/token_registry_wrapper"'],
        [zeroExJsDocSections.token]: ['"src/contract_wrappers/token_wrapper"'],
        [zeroExJsDocSections.etherToken]: ['"src/contract_wrappers/ether_token_wrapper"'],
        [zeroExJsDocSections.proxy]: [
            '"src/contract_wrappers/proxy_wrapper"',
            '"src/contract_wrappers/token_transfer_proxy_wrapper"',
        ],
        [zeroExJsDocSections.orderWatcher]: ['"src/order_watcher/order_state_watcher"'],
        [zeroExJsDocSections.types]: ['"src/types"'],
    },
    menuSubsectionToVersionWhenIntroduced: {
        [zeroExJsDocSections.etherToken]: '0.7.1',
        [zeroExJsDocSections.proxy]: '0.8.0',
        [zeroExJsDocSections.orderWatcher]: '0.27.1',
    },
    sections: zeroExJsDocSections,
    visibleConstructors: [zeroExJsDocSections.zeroEx],
};
const docsInfo = new DocsInfo(docsInfoConfig);

interface ConnectedState {
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
}

interface ConnectedDispatch {
    dispatcher: Dispatcher;
}

const mapStateToProps = (state: State, ownProps: DocPageProps): ConnectedState => ({
    docsVersion: state.docsVersion,
    availableDocVersions: state.availableDocVersions,
    docsInfo,
    translate: state.translate,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): ConnectedDispatch => ({
    dispatcher: new Dispatcher(dispatch),
});

export const Documentation: React.ComponentClass<DocPageProps> = connect(mapStateToProps, mapDispatchToProps)(
    DocPageComponent,
);
