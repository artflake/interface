import { Trans } from "@lingui/react";
import { Fraction, TradeType } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useCurrency, useToken } from "../../hooks/Tokens";
import useENSName from "../../hooks/useENSName";
import { VoteOption } from "../../state/governance/types";
import { TransactionType } from "../../state/transactions/actions";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function formatAmount(amountRaw, decimals, sigFigs) {
  return new Fraction(amountRaw, JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))).toSignificant(sigFigs);
}

function FormattedCurrencyAmount(_ref) {
  let {
    rawAmount,
    symbol,
    decimals,
    sigFigs
  } = _ref;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [formatAmount(rawAmount, decimals, sigFigs), " ", symbol]
  });
}

function FormattedCurrencyAmountManaged(_ref2) {
  var _currency$symbol;

  let {
    rawAmount,
    currencyId,
    sigFigs = 6
  } = _ref2;
  const currency = useCurrency(currencyId);
  return currency ? /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
    rawAmount: rawAmount,
    decimals: currency.decimals,
    sigFigs: sigFigs,
    symbol: (_currency$symbol = currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : '???'
  }) : null;
}

function ClaimSummary(_ref3) {
  let {
    info: {
      recipient,
      uniAmountRaw
    }
  } = _ref3;
  const {
    ENSName
  } = useENSName();
  return typeof uniAmountRaw === 'string' ? /*#__PURE__*/_jsx(Trans, {
    id: "Claim <0/> for {0}",
    values: {
      0: ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    },
    components: {
      0: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
        rawAmount: uniAmountRaw,
        symbol: 'UNI',
        decimals: 18,
        sigFigs: 4
      })
    }
  }) : /*#__PURE__*/_jsx(Trans, {
    id: "Claim UNI reward for {0}",
    values: {
      0: ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    }
  });
}

function SubmitProposalTransactionSummary(_) {
  return /*#__PURE__*/_jsx(Trans, {
    id: "Submit new proposal"
  });
}

function ApprovalSummary(_ref4) {
  let {
    info
  } = _ref4;
  const token = useToken(info.tokenAddress);
  return /*#__PURE__*/_jsx(Trans, {
    id: "Approve {0}",
    values: {
      0: token === null || token === void 0 ? void 0 : token.symbol
    }
  });
}

function VoteSummary(_ref5) {
  let {
    info
  } = _ref5;
  const proposalKey = `${info.governorAddress}/${info.proposalId}`;

  if (info.reason && info.reason.trim().length > 0) {
    switch (info.decision) {
      case VoteOption.For:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote for proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });

      case VoteOption.Abstain:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote to abstain on proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });

      case VoteOption.Against:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote against proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
    }
  } else {
    switch (info.decision) {
      case VoteOption.For:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote for proposal {proposalKey} with reason \"{0}\"",
          values: {
            0: info.reason,
            proposalKey: proposalKey
          }
        });

      case VoteOption.Abstain:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote to abstain on proposal {proposalKey} with reason \"{0}\"",
          values: {
            0: info.reason,
            proposalKey: proposalKey
          }
        });

      case VoteOption.Against:
        return /*#__PURE__*/_jsx(Trans, {
          id: "Vote against proposal {proposalKey} with reason \"{0}\"",
          values: {
            0: info.reason,
            proposalKey: proposalKey
          }
        });
    }
  }
}

function DelegateSummary(_ref6) {
  let {
    info: {
      delegatee
    }
  } = _ref6;
  const {
    ENSName
  } = useENSName(delegatee);
  return /*#__PURE__*/_jsx(Trans, {
    id: "Delegate voting power to {0}",
    values: {
      0: ENSName !== null && ENSName !== void 0 ? ENSName : delegatee
    }
  });
}

function WrapSummary(_ref7) {
  let {
    info: {
      currencyAmountRaw,
      unwrapped
    }
  } = _ref7;

  if (unwrapped) {
    return /*#__PURE__*/_jsx(Trans, {
      id: "Unwrap <0/> to ETH",
      components: {
        0: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
          rawAmount: currencyAmountRaw,
          symbol: 'WETH',
          decimals: 18,
          sigFigs: 6
        })
      }
    });
  } else {
    return /*#__PURE__*/_jsx(Trans, {
      id: "Wrap <0/> to WETH",
      components: {
        0: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
          rawAmount: currencyAmountRaw,
          symbol: 'ETH',
          decimals: 18,
          sigFigs: 6
        })
      }
    });
  }
}

function DepositLiquidityStakingSummary(_) {
  // not worth rendering the tokens since you can should no longer deposit liquidity in the staking contracts
  // todo: deprecate and delete the code paths that allow this, show user more information
  return /*#__PURE__*/_jsx(Trans, {
    id: "Deposit liquidity"
  });
}

function WithdrawLiquidityStakingSummary(_) {
  return /*#__PURE__*/_jsx(Trans, {
    id: "Withdraw deposited liquidity"
  });
}

function MigrateLiquidityToV3Summary(_ref8) {
  let {
    info: {
      baseCurrencyId,
      quoteCurrencyId
    }
  } = _ref8;
  const baseCurrency = useCurrency(baseCurrencyId);
  const quoteCurrency = useCurrency(quoteCurrencyId);
  return /*#__PURE__*/_jsx(Trans, {
    id: "Migrate {0}/{1} liquidity to V3",
    values: {
      0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      1: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}

function CreateV3PoolSummary(_ref9) {
  let {
    info: {
      quoteCurrencyId,
      baseCurrencyId
    }
  } = _ref9;
  const baseCurrency = useCurrency(baseCurrencyId);
  const quoteCurrency = useCurrency(quoteCurrencyId);
  return /*#__PURE__*/_jsx(Trans, {
    id: "Create {0}/{1} V3 pool",
    values: {
      0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      1: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}

function CollectFeesSummary(_ref10) {
  let {
    info: {
      currencyId0,
      currencyId1
    }
  } = _ref10;
  const currency0 = useCurrency(currencyId0);
  const currency1 = useCurrency(currencyId1);
  return /*#__PURE__*/_jsx(Trans, {
    id: "Collect {0}/{1} fees",
    values: {
      0: currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol,
      1: currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol
    }
  });
}

function RemoveLiquidityV3Summary(_ref11) {
  let {
    info: {
      baseCurrencyId,
      quoteCurrencyId,
      expectedAmountBaseRaw,
      expectedAmountQuoteRaw
    }
  } = _ref11;
  return /*#__PURE__*/_jsx(Trans, {
    id: "Remove <0/> and <1/>",
    components: {
      0: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      1: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountQuoteRaw,
        currencyId: quoteCurrencyId,
        sigFigs: 3
      })
    }
  });
}

function AddLiquidityV3PoolSummary(_ref12) {
  let {
    info: {
      createPool,
      quoteCurrencyId,
      baseCurrencyId
    }
  } = _ref12;
  const baseCurrency = useCurrency(baseCurrencyId);
  const quoteCurrency = useCurrency(quoteCurrencyId);
  return createPool ? /*#__PURE__*/_jsx(Trans, {
    id: "Create pool and add {0}/{1} V3 liquidity",
    values: {
      0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      1: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  }) : /*#__PURE__*/_jsx(Trans, {
    id: "Add {0}/{1} V3 liquidity",
    values: {
      0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      1: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}

function AddLiquidityV2PoolSummary(_ref13) {
  let {
    info: {
      quoteCurrencyId,
      expectedAmountBaseRaw,
      expectedAmountQuoteRaw,
      baseCurrencyId
    }
  } = _ref13;
  return /*#__PURE__*/_jsx(Trans, {
    id: "Add <0/> and <1/> to Uniswap V2",
    components: {
      0: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      1: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountQuoteRaw,
        currencyId: quoteCurrencyId,
        sigFigs: 3
      })
    }
  });
}

function SwapSummary(_ref14) {
  let {
    info
  } = _ref14;

  if (info.tradeType === TradeType.EXACT_INPUT) {
    return /*#__PURE__*/_jsx(Trans, {
      id: "Swap exactly <0/> for <1/>",
      components: {
        0: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
          rawAmount: info.inputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        1: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
          rawAmount: info.expectedOutputCurrencyAmountRaw,
          currencyId: info.outputCurrencyId,
          sigFigs: 6
        })
      }
    });
  } else {
    return /*#__PURE__*/_jsx(Trans, {
      id: "Swap <0/> for exactly <1/>",
      components: {
        0: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
          rawAmount: info.expectedInputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        1: /*#__PURE__*/_jsx(FormattedCurrencyAmountManaged, {
          rawAmount: info.outputCurrencyAmountRaw,
          currencyId: info.outputCurrencyId,
          sigFigs: 6
        })
      }
    });
  }
}

export function TransactionSummary(_ref15) {
  let {
    info
  } = _ref15;

  switch (info.type) {
    case TransactionType.ADD_LIQUIDITY_V3_POOL:
      return /*#__PURE__*/_jsx(AddLiquidityV3PoolSummary, {
        info: info
      });

    case TransactionType.ADD_LIQUIDITY_V2_POOL:
      return /*#__PURE__*/_jsx(AddLiquidityV2PoolSummary, {
        info: info
      });

    case TransactionType.CLAIM:
      return /*#__PURE__*/_jsx(ClaimSummary, {
        info: info
      });

    case TransactionType.DEPOSIT_LIQUIDITY_STAKING:
      return /*#__PURE__*/_jsx(DepositLiquidityStakingSummary, {
        info: info
      });

    case TransactionType.WITHDRAW_LIQUIDITY_STAKING:
      return /*#__PURE__*/_jsx(WithdrawLiquidityStakingSummary, {
        info: info
      });

    case TransactionType.SWAP:
      return /*#__PURE__*/_jsx(SwapSummary, {
        info: info
      });

    case TransactionType.APPROVAL:
      return /*#__PURE__*/_jsx(ApprovalSummary, {
        info: info
      });

    case TransactionType.VOTE:
      return /*#__PURE__*/_jsx(VoteSummary, {
        info: info
      });

    case TransactionType.DELEGATE:
      return /*#__PURE__*/_jsx(DelegateSummary, {
        info: info
      });

    case TransactionType.WRAP:
      return /*#__PURE__*/_jsx(WrapSummary, {
        info: info
      });

    case TransactionType.CREATE_V3_POOL:
      return /*#__PURE__*/_jsx(CreateV3PoolSummary, {
        info: info
      });

    case TransactionType.MIGRATE_LIQUIDITY_V3:
      return /*#__PURE__*/_jsx(MigrateLiquidityToV3Summary, {
        info: info
      });

    case TransactionType.COLLECT_FEES:
      return /*#__PURE__*/_jsx(CollectFeesSummary, {
        info: info
      });

    case TransactionType.REMOVE_LIQUIDITY_V3:
      return /*#__PURE__*/_jsx(RemoveLiquidityV3Summary, {
        info: info
      });

    case TransactionType.SUBMIT_PROPOSAL:
      return /*#__PURE__*/_jsx(SubmitProposalTransactionSummary, {
        info: info
      });
  }
}