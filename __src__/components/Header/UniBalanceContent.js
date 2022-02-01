import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { useMemo } from 'react';
import { X } from 'react-feather';
import tokenLogo from '../../assets/images/token-logo.png';
import { UNI } from '../../constants/tokens';
import { useMerkleDistributorContract } from '../../hooks/useContract';
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp';
import { useTotalSupply } from '../../hooks/useTotalSupply';
import useUSDCPrice from '../../hooks/useUSDCPrice';
import { useActiveWeb3React } from '../../hooks/web3';
import { useTotalUniEarned } from '../../state/stake/hooks';
import { useAggregateUniBalance, useTokenBalance } from '../../state/wallet/hooks';
import { ExternalLink, StyledInternalLink, ThemedText, UniTokenAnimated } from '../../theme';
import { computeUniCirculation } from '../../utils/computeUniCirculation';
import { AutoColumn } from '../Column';
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "UniBalanceContent__ContentWrapper",
  componentId: "sc-bufqi0-0"
})(["width:100%;"]);

const ModalUpper = _styled(DataCard).withConfig({
  displayName: "UniBalanceContent__ModalUpper",
  componentId: "sc-bufqi0-1"
})(["box-shadow:0px 4px 10px rgba(0,0,0,0.1);background:radial-gradient(76.02% 75.41% at 1.84% 0%,#ff007a 0%,#021d43 100%);padding:0.5rem;"]);

const StyledClose = _styled(X).withConfig({
  displayName: "UniBalanceContent__StyledClose",
  componentId: "sc-bufqi0-2"
})(["position:absolute;right:16px;top:16px;:hover{cursor:pointer;}"]);
/**
 * Content for balance stats modal
 */


export default function UniBalanceContent(_ref) {
  var _useMerkleDistributor, _uniPrice$toFixed;

  let {
    setShowUniBalanceModal
  } = _ref;
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const uni = chainId ? UNI[chainId] : undefined;
  const total = useAggregateUniBalance();
  const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, uni);
  const uniToClaim = useTotalUniEarned();
  const totalSupply = useTotalSupply(uni);
  const uniPrice = useUSDCPrice(uni);
  const blockTimestamp = useCurrentBlockTimestamp();
  const unclaimedUni = useTokenBalance((_useMerkleDistributor = useMerkleDistributorContract()) === null || _useMerkleDistributor === void 0 ? void 0 : _useMerkleDistributor.address, uni);
  const circulation = useMemo(() => blockTimestamp && uni && chainId === 1 ? computeUniCirculation(uni, blockTimestamp, unclaimedUni) : totalSupply, [blockTimestamp, chainId, totalSupply, unclaimedUni, uni]);
  const {
    infoLink
  } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET];
  return /*#__PURE__*/_jsx(ContentWrapper, {
    gap: "lg",
    children: /*#__PURE__*/_jsxs(ModalUpper, {
      children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardSection, {
        gap: "md",
        children: /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.White, {
            color: "white",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Your UNI Breakdown"
            })
          }), /*#__PURE__*/_jsx(StyledClose, {
            stroke: "white",
            onClick: () => setShowUniBalanceModal(false)
          })]
        })
      }), /*#__PURE__*/_jsx(Break, {}), account && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(CardSection, {
          gap: "sm",
          children: [/*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            justify: "center",
            children: [/*#__PURE__*/_jsx(UniTokenAnimated, {
              width: "48px",
              src: tokenLogo
            }), ' ', /*#__PURE__*/_jsx(ThemedText.White, {
              fontSize: 48,
              fontWeight: 600,
              color: "white",
              children: total === null || total === void 0 ? void 0 : total.toFixed(2, {
                groupSeparator: ','
              })
            })]
          }), /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ThemedText.White, {
                color: "white",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Balance:"
                })
              }), /*#__PURE__*/_jsx(ThemedText.White, {
                color: "white",
                children: uniBalance === null || uniBalance === void 0 ? void 0 : uniBalance.toFixed(2, {
                  groupSeparator: ','
                })
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ThemedText.White, {
                color: "white",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Unclaimed:"
                })
              }), /*#__PURE__*/_jsxs(ThemedText.White, {
                color: "white",
                children: [uniToClaim === null || uniToClaim === void 0 ? void 0 : uniToClaim.toFixed(4, {
                  groupSeparator: ','
                }), ' ', uniToClaim && uniToClaim.greaterThan('0') && /*#__PURE__*/_jsx(StyledInternalLink, {
                  onClick: () => setShowUniBalanceModal(false),
                  to: "/uni",
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "(claim)"
                  })
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx(Break, {})]
      }), /*#__PURE__*/_jsx(CardSection, {
        gap: "sm",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.White, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "UNI price:"
              })
            }), /*#__PURE__*/_jsxs(ThemedText.White, {
              color: "white",
              children: ["$", (_uniPrice$toFixed = uniPrice === null || uniPrice === void 0 ? void 0 : uniPrice.toFixed(2)) !== null && _uniPrice$toFixed !== void 0 ? _uniPrice$toFixed : '-']
            })]
          }), /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.White, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "UNI in circulation:"
              })
            }), /*#__PURE__*/_jsx(ThemedText.White, {
              color: "white",
              children: circulation === null || circulation === void 0 ? void 0 : circulation.toFixed(0, {
                groupSeparator: ','
              })
            })]
          }), /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.White, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Total Supply"
              })
            }), /*#__PURE__*/_jsx(ThemedText.White, {
              color: "white",
              children: totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply.toFixed(0, {
                groupSeparator: ','
              })
            })]
          }), uni && uni.chainId === 1 ? /*#__PURE__*/_jsx(ExternalLink, {
            href: `${infoLink}/token/${uni.address}`,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View UNI Analytics"
            })
          }) : null]
        })
      })]
    })
  });
}