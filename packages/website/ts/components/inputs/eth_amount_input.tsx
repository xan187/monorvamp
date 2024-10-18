import { ZeroEx } from '0x.js';
import { BigNumber } from '@0xproject/utils';
import * as _ from 'lodash';
import * as React from 'react';
import { BalanceBoundedInput } from 'ts/components/inputs/balance_bounded_input';
import { ValidatedBigNumberCallback } from 'ts/types';
import { constants } from 'ts/utils/constants';

interface EthAmountInputProps {
    label?: string;
    balance: BigNumber;
    amount?: BigNumber;
    onChange: ValidatedBigNumberCallback;
    shouldShowIncompleteErrs: boolean;
    onVisitBalancesPageClick?: () => void;
    shouldCheckBalance: boolean;
    shouldHideVisitBalancesLink?: boolean;
}

interface EthAmountInputState {}

export class EthAmountInput extends React.Component<EthAmountInputProps, EthAmountInputState> {
    public render() {
        const amount = this.props.amount
            ? ZeroEx.toUnitAmount(this.props.amount, constants.DECIMAL_PLACES_ETH)
            : undefined;
        return (
            <div className="flex overflow-hidden" style={{ height: 63 }}>
                <BalanceBoundedInput
                    label={this.props.label}
                    balance={this.props.balance}
                    amount={amount}
                    onChange={this._onChange.bind(this)}
                    shouldCheckBalance={this.props.shouldCheckBalance}
                    shouldShowIncompleteErrs={this.props.shouldShowIncompleteErrs}
                    onVisitBalancesPageClick={this.props.onVisitBalancesPageClick}
                    shouldHideVisitBalancesLink={this.props.shouldHideVisitBalancesLink}
                />
                <div style={{ paddingTop: _.isUndefined(this.props.label) ? 15 : 40 }}>ETH</div>
            </div>
        );
    }
    private _onChange(isValid: boolean, amount?: BigNumber) {
        const baseUnitAmountIfExists = _.isUndefined(amount)
            ? undefined
            : ZeroEx.toBaseUnitAmount(amount, constants.DECIMAL_PLACES_ETH);
        this.props.onChange(isValid, baseUnitAmountIfExists);
    }
}
