import { blockchainTests } from '@0x/contracts-test-utils';

import { Actor } from '../framework/actors/base';
import { PoolOperator } from '../framework/actors/pool_operator';
import { filterActorsByRole } from '../framework/actors/utils';
import { AssertionResult } from '../framework/assertions/function_assertion';
import { BlockchainBalanceStore } from '../framework/balances/blockchain_balance_store';
import { DeploymentManager } from '../framework/deployment_manager';
import { Simulation, SimulationEnvironment } from '../framework/simulation';
import { Pseudorandom } from '../framework/utils/pseudorandom';

export class PoolManagementSimulation extends Simulation {
    protected async *_assertionGenerator(): AsyncIterableIterator<AssertionResult | void> {
        const { actors } = this.environment;
        const operators = filterActorsByRole(actors, PoolOperator);

        const actions = [
            ...operators.map(operator => operator.simulationActions.validCreateStakingPool),
            ...operators.map(operator => operator.simulationActions.validDecreaseStakingPoolOperatorShare),
        ];
        while (true) {
            const action = Pseudorandom.sample(actions);
            yield (await action!.next()).value; // tslint:disable-line:no-non-null-assertion
        }
    }
}

blockchainTests('Pool management fuzz test', env => {
    before(function(): void {
        if (process.env.FUZZ_TEST !== 'pool_management') {
            this.skip();
        }
    });
    after(async () => {
        Actor.reset();
    });

    it('fuzz', async () => {
        const deployment = await DeploymentManager.deployAsync(env, {
            numErc20TokensToDeploy: 0,
            numErc721TokensToDeploy: 0,
            numErc1155TokensToDeploy: 0,
        });
        const balanceStore = new BlockchainBalanceStore({}, {});

        const simulationEnvironment = new SimulationEnvironment(deployment, balanceStore, [
            new PoolOperator({ deployment, name: 'Operator 1' }),
            new PoolOperator({ deployment, name: 'Operator 2' }),
        ]);

        const simulation = new PoolManagementSimulation(simulationEnvironment);
        return simulation.fuzzAsync();
    });
});
