import findVersions = require('find-versions');
import * as _ from 'lodash';
import * as React from 'react';
import DocumentTitle = require('react-document-title');
import semverSort = require('semver-sort');
import { TopBar } from 'ts/components/top_bar/top_bar';
import { DocsInfo } from 'ts/pages/documentation/docs_info';
import { Documentation } from 'ts/pages/documentation/documentation';
import { Dispatcher } from 'ts/redux/dispatcher';
import { DocAgnosticFormat, DocPackages, DoxityDocObj, Environments, MenuSubsectionsBySection } from 'ts/types';
import { configs } from 'ts/utils/configs';
import { constants } from 'ts/utils/constants';
import { docUtils } from 'ts/utils/doc_utils';
import { Translate } from 'ts/utils/translate';

const docIdToS3BucketName: { [id: string]: string } = {
    [DocPackages.ZeroExJs]: '0xjs-docs-jsons',
    [DocPackages.SmartContracts]: 'smart-contracts-docs-json',
    [DocPackages.Connect]:
        configs.ENVIRONMENT === Environments.DEVELOPMENT ? 'staging-connect-docs-jsons' : 'connect-docs-jsons',
};

const docIdToSubpackageName: { [id: string]: string } = {
    [DocPackages.ZeroExJs]: '0x.js',
    [DocPackages.Connect]: 'connect',
    [DocPackages.SmartContracts]: 'contracts',
};

export interface DocPageProps {
    location: Location;
    dispatcher: Dispatcher;
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
}

interface DocPageState {
    docAgnosticFormat?: DocAgnosticFormat;
}

export class DocPage extends React.Component<DocPageProps, DocPageState> {
    private _isUnmounted: boolean;
    constructor(props: DocPageProps) {
        super(props);
        this._isUnmounted = false;
        this.state = {
            docAgnosticFormat: undefined,
        };
    }
    public componentWillMount() {
        const pathName = this.props.location.pathname;
        const lastSegment = pathName.substr(pathName.lastIndexOf('/') + 1);
        const versions = findVersions(lastSegment);
        const preferredVersionIfExists = versions.length > 0 ? versions[0] : undefined;
        // tslint:disable-next-line:no-floating-promises
        this._fetchJSONDocsFireAndForgetAsync(preferredVersionIfExists);
    }
    public componentWillUnmount() {
        this._isUnmounted = true;
    }

    public render() {
        const menuSubsectionsBySection = _.isUndefined(this.state.docAgnosticFormat)
            ? {}
            : this.props.docsInfo.getMenuSubsectionsBySection(this.state.docAgnosticFormat);
        const sourceUrl = this._getSourceUrl();
        return (
            <div>
                <DocumentTitle title={`${this.props.docsInfo.displayName} Documentation`} />
                <TopBar
                    blockchainIsLoaded={false}
                    location={this.props.location}
                    docsVersion={this.props.docsVersion}
                    availableDocVersions={this.props.availableDocVersions}
                    menu={this.props.docsInfo.getMenu(this.props.docsVersion)}
                    menuSubsectionsBySection={menuSubsectionsBySection}
                    docsInfo={this.props.docsInfo}
                    translate={this.props.translate}
                />
                <Documentation
                    location={this.props.location}
                    docsVersion={this.props.docsVersion}
                    availableDocVersions={this.props.availableDocVersions}
                    docsInfo={this.props.docsInfo}
                    docAgnosticFormat={this.state.docAgnosticFormat}
                    menuSubsectionsBySection={menuSubsectionsBySection}
                    sourceUrl={sourceUrl}
                />
            </div>
        );
    }
    private async _fetchJSONDocsFireAndForgetAsync(preferredVersionIfExists?: string): Promise<void> {
        const s3BucketName = docIdToS3BucketName[this.props.docsInfo.id];
        const docsJsonRoot = `${constants.S3_BUCKET_ROOT}/${s3BucketName}`;
        const versionToFileName = await docUtils.getVersionToFileNameAsync(docsJsonRoot);
        const versions = _.keys(versionToFileName);
        this.props.dispatcher.updateAvailableDocVersions(versions);
        const sortedVersions = semverSort.desc(versions);
        const latestVersion = sortedVersions[0];

        let versionToFetch = latestVersion;
        if (!_.isUndefined(preferredVersionIfExists)) {
            const preferredVersionFileNameIfExists = versionToFileName[preferredVersionIfExists];
            if (!_.isUndefined(preferredVersionFileNameIfExists)) {
                versionToFetch = preferredVersionIfExists;
            }
        }
        this.props.dispatcher.updateCurrentDocsVersion(versionToFetch);

        const versionFileNameToFetch = versionToFileName[versionToFetch];
        const versionDocObj = await docUtils.getJSONDocFileAsync(versionFileNameToFetch, docsJsonRoot);
        const docAgnosticFormat = this.props.docsInfo.convertToDocAgnosticFormat(versionDocObj as DoxityDocObj);

        if (!this._isUnmounted) {
            this.setState({
                docAgnosticFormat,
            });
        }
    }
    private _getSourceUrl() {
        const url = this.props.docsInfo.packageUrl;
        const pkg = docIdToSubpackageName[this.props.docsInfo.id];
        let tagPrefix = pkg;
        const packagesWithNamespace = ['connect'];
        if (_.includes(packagesWithNamespace, pkg)) {
            tagPrefix = `@0xproject/${pkg}`;
        }
        const sourceUrl = `${url}/blob/${tagPrefix}%40${this.props.docsVersion}/packages/${pkg}`;
        return sourceUrl;
    }
}
