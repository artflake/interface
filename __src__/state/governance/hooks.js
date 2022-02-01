import { i18n } from "@lingui/core";
import { defaultAbiCoder, Interface } from '@ethersproject/abi';
import { isAddress } from '@ethersproject/address';
import { toUtf8String, Utf8ErrorFuncs, Utf8ErrorReason } from '@ethersproject/strings';
import { formatUnits } from '@ethersproject/units'; // eslint-disable-next-line no-restricted-imports

import { abi as GOV_ABI } from '@uniswap/governance/build/GovernorAlpha.json';
import { CurrencyAmount } from '@uniswap/sdk-core';
import { POLYGON_PROPOSAL_TITLE } from 'constants/proposals/polygon_proposal_title';
import { UNISWAP_GRANTS_PROPOSAL_DESCRIPTION } from 'constants/proposals/uniswap_grants_proposal_description';
import { useGovernanceBravoContract, useGovernanceV0Contract, useGovernanceV1Contract, useLatestGovernanceContract, useUniContract } from 'hooks/useContract';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useMemo } from 'react';
import { calculateGasMargin } from 'utils/calculateGasMargin';
import { SupportedChainId } from '../../constants/chains';
import { BRAVO_START_BLOCK, ONE_BIP_START_BLOCK, POLYGON_START_BLOCK, UNISWAP_GRANTS_START_BLOCK } from '../../constants/proposals';
import { UNI } from '../../constants/tokens';
import { useLogs } from '../logs/hooks';
import { useSingleCallResult, useSingleContractMultipleData } from '../multicall/hooks';
import { TransactionType } from '../transactions/actions';
import { useTransactionAdder } from '../transactions/hooks';
import { VoteOption } from './types';
export let ProposalState;

(function (ProposalState) {
  ProposalState[ProposalState["UNDETERMINED"] = -1] = "UNDETERMINED";
  ProposalState[ProposalState["PENDING"] = 0] = "PENDING";
  ProposalState[ProposalState["ACTIVE"] = 1] = "ACTIVE";
  ProposalState[ProposalState["CANCELED"] = 2] = "CANCELED";
  ProposalState[ProposalState["DEFEATED"] = 3] = "DEFEATED";
  ProposalState[ProposalState["SUCCEEDED"] = 4] = "SUCCEEDED";
  ProposalState[ProposalState["QUEUED"] = 5] = "QUEUED";
  ProposalState[ProposalState["EXPIRED"] = 6] = "EXPIRED";
  ProposalState[ProposalState["EXECUTED"] = 7] = "EXECUTED";
})(ProposalState || (ProposalState = {}));

const GovernanceInterface = new Interface(GOV_ABI); // get count of all proposals made in the latest governor contract

function useProposalCount(contract) {
  var _result$;

  const {
    result
  } = useSingleCallResult(contract, 'proposalCount');
  return result === null || result === void 0 ? void 0 : (_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.toNumber();
}

/**
 * Need proposal events to get description data emitted from
 * new proposal event.
 */
function useFormattedProposalCreatedLogs(contract, indices) {
  // create filters for ProposalCreated events
  const filter = useMemo(() => {
    var _contract$filters;

    return contract === null || contract === void 0 ? void 0 : (_contract$filters = contract.filters) === null || _contract$filters === void 0 ? void 0 : _contract$filters.ProposalCreated();
  }, [contract]);
  const useLogsResult = useLogs(filter);
  return useMemo(() => {
    var _useLogsResult$logs, _useLogsResult$logs$m, _useLogsResult$logs$m2;

    return useLogsResult === null || useLogsResult === void 0 ? void 0 : (_useLogsResult$logs = useLogsResult.logs) === null || _useLogsResult$logs === void 0 ? void 0 : (_useLogsResult$logs$m = _useLogsResult$logs.map(log => {
      const parsed = GovernanceInterface.parseLog(log).args;
      return parsed;
    })) === null || _useLogsResult$logs$m === void 0 ? void 0 : (_useLogsResult$logs$m2 = _useLogsResult$logs$m.filter(parsed => indices.flat().some(i => i === parsed.id.toNumber()))) === null || _useLogsResult$logs$m2 === void 0 ? void 0 : _useLogsResult$logs$m2.map(parsed => {
      var _parsed$startBlock;

      let description;
      const startBlock = parseInt((_parsed$startBlock = parsed.startBlock) === null || _parsed$startBlock === void 0 ? void 0 : _parsed$startBlock.toString());

      try {
        description = parsed.description;
      } catch (error) {
        // replace invalid UTF-8 in the description with replacement characters
        let onError = Utf8ErrorFuncs.replace; // Bravo proposal reverses the codepoints for U+2018 (‘) and U+2026 (…)

        if (startBlock === BRAVO_START_BLOCK) {
          const U2018 = [0xe2, 0x80, 0x98].toString();
          const U2026 = [0xe2, 0x80, 0xa6].toString();

          onError = (reason, offset, bytes, output) => {
            if (reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
              const charCode = [bytes[offset], bytes[offset + 1], bytes[offset + 2]].reverse().toString();

              if (charCode === U2018) {
                output.push(0x2018);
                return 2;
              } else if (charCode === U2026) {
                output.push(0x2026);
                return 2;
              }
            }

            return Utf8ErrorFuncs.replace(reason, offset, bytes, output);
          };
        }

        description = JSON.parse(toUtf8String(error.error.value, onError)) || '';
      } // Bravo and one bip proposals omit newlines


      if (startBlock === BRAVO_START_BLOCK || startBlock === ONE_BIP_START_BLOCK) {
        description = description.replace(/ {2}/g, '\n').replace(/\d\. /g, '\n$&');
      }

      return {
        description,
        details: parsed.targets.map((target, i) => {
          const signature = parsed.signatures[i];
          const [name, types] = signature.substr(0, signature.length - 1).split('(');
          const calldata = parsed.calldatas[i];
          const decoded = defaultAbiCoder.decode(types.split(','), calldata);
          return {
            target,
            functionSig: name,
            callData: decoded.join(', ')
          };
        })
      };
    });
  }, [indices, useLogsResult]);
}

const V0_PROPOSAL_IDS = [[1], [2], [3], [4]];
const V1_PROPOSAL_IDS = [[1], [2], [3]];

function countToIndices(count) {
  let skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return typeof count === 'number' ? new Array(count - skip).fill(0).map((_, i) => [i + 1 + skip]) : [];
} // get data for all past and active proposals


export function useAllProposalData() {
  const {
    chainId
  } = useActiveWeb3React();
  const gov0 = useGovernanceV0Contract();
  const gov1 = useGovernanceV1Contract();
  const gov2 = useGovernanceBravoContract();
  const proposalCount0 = useProposalCount(gov0);
  const proposalCount1 = useProposalCount(gov1);
  const proposalCount2 = useProposalCount(gov2);
  const gov0ProposalIndexes = useMemo(() => {
    return chainId === SupportedChainId.MAINNET ? V0_PROPOSAL_IDS : countToIndices(proposalCount0);
  }, [chainId, proposalCount0]);
  const gov1ProposalIndexes = useMemo(() => {
    return chainId === SupportedChainId.MAINNET ? V1_PROPOSAL_IDS : countToIndices(proposalCount1);
  }, [chainId, proposalCount1]);
  const gov2ProposalIndexes = useMemo(() => {
    return countToIndices(proposalCount2, 8);
  }, [proposalCount2]);
  const proposalsV0 = useSingleContractMultipleData(gov0, 'proposals', gov0ProposalIndexes);
  const proposalsV1 = useSingleContractMultipleData(gov1, 'proposals', gov1ProposalIndexes);
  const proposalsV2 = useSingleContractMultipleData(gov2, 'proposals', gov2ProposalIndexes); // get all proposal states

  const proposalStatesV0 = useSingleContractMultipleData(gov0, 'state', gov0ProposalIndexes);
  const proposalStatesV1 = useSingleContractMultipleData(gov1, 'state', gov1ProposalIndexes);
  const proposalStatesV2 = useSingleContractMultipleData(gov2, 'state', gov2ProposalIndexes); // get metadata from past events

  const formattedLogsV0 = useFormattedProposalCreatedLogs(gov0, gov0ProposalIndexes);
  const formattedLogsV1 = useFormattedProposalCreatedLogs(gov1, gov1ProposalIndexes);
  const formattedLogsV2 = useFormattedProposalCreatedLogs(gov2, gov2ProposalIndexes); // early return until events are fetched

  return useMemo(() => {
    const proposalsCallData = [...proposalsV0, ...proposalsV1, ...proposalsV2];
    const proposalStatesCallData = [...proposalStatesV0, ...proposalStatesV1, ...proposalStatesV2];
    const formattedLogs = [...(formattedLogsV0 !== null && formattedLogsV0 !== void 0 ? formattedLogsV0 : []), ...(formattedLogsV1 !== null && formattedLogsV1 !== void 0 ? formattedLogsV1 : []), ...(formattedLogsV2 !== null && formattedLogsV2 !== void 0 ? formattedLogsV2 : [])];

    if (proposalsCallData.some(p => p.loading) || proposalStatesCallData.some(p => p.loading) || gov0 && !formattedLogsV0 || gov1 && !formattedLogsV1 || gov2 && !formattedLogsV2) {
      return {
        data: [],
        loading: true
      };
    }

    return {
      data: proposalsCallData.map((proposal, i) => {
        var _proposal$result, _proposal$result$star, _formattedLogs$i, _description, _proposal$result2, _title, _description2, _proposal$result3, _proposalStatesCallDa, _proposalStatesCallDa2, _proposalStatesCallDa3, _proposal$result$forV, _proposal$result4, _proposal$result4$for, _proposal$result$agai, _proposal$result5, _proposal$result5$aga, _proposal$result$abst, _proposal$result6, _proposal$result6$abs, _proposal$result7, _proposal$result7$end, _formattedLogs$i2;

        const startBlock = parseInt(proposal === null || proposal === void 0 ? void 0 : (_proposal$result = proposal.result) === null || _proposal$result === void 0 ? void 0 : (_proposal$result$star = _proposal$result.startBlock) === null || _proposal$result$star === void 0 ? void 0 : _proposal$result$star.toString());
        let description = (_formattedLogs$i = formattedLogs[i]) === null || _formattedLogs$i === void 0 ? void 0 : _formattedLogs$i.description;

        if (startBlock === UNISWAP_GRANTS_START_BLOCK) {
          description = UNISWAP_GRANTS_PROPOSAL_DESCRIPTION;
        }

        let title = (_description = description) === null || _description === void 0 ? void 0 : _description.split(/#+\s|\n/g)[1];

        if (startBlock === POLYGON_START_BLOCK) {
          title = POLYGON_PROPOSAL_TITLE;
        }

        return {
          id: proposal === null || proposal === void 0 ? void 0 : (_proposal$result2 = proposal.result) === null || _proposal$result2 === void 0 ? void 0 : _proposal$result2.id.toString(),
          title: (_title = title) !== null && _title !== void 0 ? _title :
          /*i18n*/
          i18n._("Untitled"),
          description: (_description2 = description) !== null && _description2 !== void 0 ? _description2 :
          /*i18n*/
          i18n._("No description."),
          proposer: proposal === null || proposal === void 0 ? void 0 : (_proposal$result3 = proposal.result) === null || _proposal$result3 === void 0 ? void 0 : _proposal$result3.proposer,
          status: (_proposalStatesCallDa = (_proposalStatesCallDa2 = proposalStatesCallData[i]) === null || _proposalStatesCallDa2 === void 0 ? void 0 : (_proposalStatesCallDa3 = _proposalStatesCallDa2.result) === null || _proposalStatesCallDa3 === void 0 ? void 0 : _proposalStatesCallDa3[0]) !== null && _proposalStatesCallDa !== void 0 ? _proposalStatesCallDa : ProposalState.UNDETERMINED,
          forCount: parseFloat(formatUnits((_proposal$result$forV = proposal === null || proposal === void 0 ? void 0 : (_proposal$result4 = proposal.result) === null || _proposal$result4 === void 0 ? void 0 : (_proposal$result4$for = _proposal$result4.forVotes) === null || _proposal$result4$for === void 0 ? void 0 : _proposal$result4$for.toString()) !== null && _proposal$result$forV !== void 0 ? _proposal$result$forV : 0, 18)),
          againstCount: parseFloat(formatUnits((_proposal$result$agai = proposal === null || proposal === void 0 ? void 0 : (_proposal$result5 = proposal.result) === null || _proposal$result5 === void 0 ? void 0 : (_proposal$result5$aga = _proposal$result5.againstVotes) === null || _proposal$result5$aga === void 0 ? void 0 : _proposal$result5$aga.toString()) !== null && _proposal$result$agai !== void 0 ? _proposal$result$agai : 0, 18)),
          abstainCount: parseFloat(formatUnits((_proposal$result$abst = proposal === null || proposal === void 0 ? void 0 : (_proposal$result6 = proposal.result) === null || _proposal$result6 === void 0 ? void 0 : (_proposal$result6$abs = _proposal$result6.abstainVotes) === null || _proposal$result6$abs === void 0 ? void 0 : _proposal$result6$abs.toString()) !== null && _proposal$result$abst !== void 0 ? _proposal$result$abst : 0, 18)),
          startBlock,
          endBlock: parseInt(proposal === null || proposal === void 0 ? void 0 : (_proposal$result7 = proposal.result) === null || _proposal$result7 === void 0 ? void 0 : (_proposal$result7$end = _proposal$result7.endBlock) === null || _proposal$result7$end === void 0 ? void 0 : _proposal$result7$end.toString()),
          details: (_formattedLogs$i2 = formattedLogs[i]) === null || _formattedLogs$i2 === void 0 ? void 0 : _formattedLogs$i2.details,
          governorIndex: i >= proposalsV0.length + proposalsV1.length ? 2 : i >= proposalsV0.length ? 1 : 0
        };
      }),
      loading: false
    };
  }, [formattedLogsV0, formattedLogsV1, formattedLogsV2, gov0, gov1, gov2, proposalStatesV0, proposalStatesV1, proposalStatesV2, proposalsV0, proposalsV1, proposalsV2]);
}
export function useProposalData(governorIndex, id) {
  var _data$filter;

  const {
    data
  } = useAllProposalData();
  return (_data$filter = data.filter(p => p.governorIndex === governorIndex)) === null || _data$filter === void 0 ? void 0 : _data$filter.find(p => p.id === id);
} // get the users delegatee if it exists

export function useUserDelegatee() {
  var _result$2;

  const {
    account
  } = useActiveWeb3React();
  const uniContract = useUniContract();
  const {
    result
  } = useSingleCallResult(uniContract, 'delegates', [account !== null && account !== void 0 ? account : undefined]);
  return (_result$2 = result === null || result === void 0 ? void 0 : result[0]) !== null && _result$2 !== void 0 ? _result$2 : undefined;
} // gets the users current votes

export function useUserVotes() {
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const uniContract = useUniContract(); // check for available votes

  const {
    result,
    loading
  } = useSingleCallResult(uniContract, 'getCurrentVotes', [account !== null && account !== void 0 ? account : undefined]);
  return useMemo(() => {
    const uni = chainId ? UNI[chainId] : undefined;
    return {
      loading,
      votes: uni && result ? CurrencyAmount.fromRawAmount(uni, result === null || result === void 0 ? void 0 : result[0]) : undefined
    };
  }, [chainId, loading, result]);
} // fetch available votes as of block (usually proposal start block)

export function useUserVotesAsOfBlock(block) {
  var _useSingleCallResult, _useSingleCallResult$;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const uniContract = useUniContract(); // check for available votes

  const uni = chainId ? UNI[chainId] : undefined;
  const votes = (_useSingleCallResult = useSingleCallResult(uniContract, 'getPriorVotes', [account !== null && account !== void 0 ? account : undefined, block !== null && block !== void 0 ? block : undefined])) === null || _useSingleCallResult === void 0 ? void 0 : (_useSingleCallResult$ = _useSingleCallResult.result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
  return votes && uni ? CurrencyAmount.fromRawAmount(uni, votes) : undefined;
}
export function useDelegateCallback() {
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const uniContract = useUniContract();
  return useCallback(delegatee => {
    if (!library || !chainId || !account || !delegatee || !isAddress(delegatee !== null && delegatee !== void 0 ? delegatee : '')) return undefined;
    const args = [delegatee];
    if (!uniContract) throw new Error('No UNI Contract!');
    return uniContract.estimateGas.delegate(...args, {}).then(estimatedGasLimit => {
      return uniContract.delegate(...args, {
        value: null,
        gasLimit: calculateGasMargin(estimatedGasLimit)
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.DELEGATE,
          delegatee
        });
        return response.hash;
      });
    });
  }, [account, addTransaction, chainId, library, uniContract]);
}
export function useVoteCallback() {
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const latestGovernanceContract = useLatestGovernanceContract();
  const addTransaction = useTransactionAdder();
  const voteCallback = useCallback((proposalId, voteOption) => {
    if (!account || !latestGovernanceContract || !proposalId || !chainId) return;
    const args = [proposalId, voteOption === VoteOption.Against ? 0 : voteOption === VoteOption.For ? 1 : 2];
    return latestGovernanceContract.estimateGas.castVote(...args, {}).then(estimatedGasLimit => {
      return latestGovernanceContract.castVote(...args, {
        value: null,
        gasLimit: calculateGasMargin(estimatedGasLimit)
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.VOTE,
          decision: voteOption,
          governorAddress: latestGovernanceContract.address,
          proposalId: parseInt(proposalId),
          reason: ''
        });
        return response.hash;
      });
    });
  }, [account, addTransaction, latestGovernanceContract, chainId]);
  return {
    voteCallback
  };
}
export function useCreateProposalCallback() {
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const latestGovernanceContract = useLatestGovernanceContract();
  const addTransaction = useTransactionAdder();
  return useCallback(createProposalData => {
    if (!account || !latestGovernanceContract || !createProposalData || !chainId) return undefined;
    const args = [createProposalData.targets, createProposalData.values, createProposalData.signatures, createProposalData.calldatas, createProposalData.description];
    return latestGovernanceContract.estimateGas.propose(...args).then(estimatedGasLimit => {
      return latestGovernanceContract.propose(...args, {
        gasLimit: calculateGasMargin(estimatedGasLimit)
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.SUBMIT_PROPOSAL
        });
        return response.hash;
      });
    });
  }, [account, addTransaction, latestGovernanceContract, chainId]);
}
export function useLatestProposalId(address) {
  var _res$result, _res$result$;

  const latestGovernanceContract = useLatestGovernanceContract();
  const res = useSingleCallResult(latestGovernanceContract, 'latestProposalIds', [address]);
  return res === null || res === void 0 ? void 0 : (_res$result = res.result) === null || _res$result === void 0 ? void 0 : (_res$result$ = _res$result[0]) === null || _res$result$ === void 0 ? void 0 : _res$result$.toString();
}
export function useProposalThreshold() {
  var _res$result2;

  const {
    chainId
  } = useActiveWeb3React();
  const latestGovernanceContract = useLatestGovernanceContract();
  const res = useSingleCallResult(latestGovernanceContract, 'proposalThreshold');
  const uni = chainId ? UNI[chainId] : undefined;

  if (res !== null && res !== void 0 && (_res$result2 = res.result) !== null && _res$result2 !== void 0 && _res$result2[0] && uni) {
    return CurrencyAmount.fromRawAmount(uni, res.result[0]);
  }

  return undefined;
}