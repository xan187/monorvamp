import * as React from 'react';
import { Element as ScrollElement } from 'react-scroll';
import { AnchorTitle } from 'ts/pages/shared/anchor_title';
import { HeaderSizes } from 'ts/types';
import { utils } from 'ts/utils/utils';

interface SectionHeaderProps {
    sectionName: string;
    headerSize?: HeaderSizes;
}

interface SectionHeaderState {
    shouldShowAnchor: boolean;
}

export class SectionHeader extends React.Component<SectionHeaderProps, SectionHeaderState> {
    public static defaultProps: Partial<SectionHeaderProps> = {
        headerSize: HeaderSizes.H2,
    };
    constructor(props: SectionHeaderProps) {
        super(props);
        this.state = {
            shouldShowAnchor: false,
        };
    }
    public render() {
        const sectionName = this.props.sectionName.replace(/-/g, ' ');
        const id = utils.getIdFromName(sectionName);
        return (
            <div
                onMouseOver={this._setAnchorVisibility.bind(this, true)}
                onMouseOut={this._setAnchorVisibility.bind(this, false)}
            >
                <ScrollElement name={id}>
                    <AnchorTitle
                        headerSize={this.props.headerSize}
                        title={<span style={{ textTransform: 'capitalize' }}>{sectionName}</span>}
                        id={id}
                        shouldShowAnchor={this.state.shouldShowAnchor}
                    />
                </ScrollElement>
            </div>
        );
    }
    private _setAnchorVisibility(shouldShowAnchor: boolean) {
        this.setState({
            shouldShowAnchor,
        });
    }
}
