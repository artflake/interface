import { BlockUpdater } from 'lib/hooks/useBlockNumber'
import { MulticallUpdater } from 'lib/state/multicall'
import ApplicationUpdater from '../state/application/updater'
import ListsUpdater from '../state/lists/updater'
import LogsUpdater from '../state/logs/updater'
import TransactionUpdater from '../state/transactions/updater'
import UserUpdater from '../state/user/updater'
import RadialGradientByChainUpdater from '../theme/RadialGradientByChainUpdater'

export function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <BlockUpdater />
      <MulticallUpdater />
      <LogsUpdater />
    </>
  )
}
