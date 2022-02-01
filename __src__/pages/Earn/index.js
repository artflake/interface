import _styled from "styled-components";
import { Trans } from "@lingui/react";
import JSBI from 'jsbi';
import { OutlineCard } from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import PoolCard from '../../components/earn/PoolCard';
import { CardBGImage, CardNoise, CardSection, DataCard } from '../../components/earn/styled';
import Loader from '../../components/Loader';
import { RowBetween } from '../../components/Row';
import { BIG_INT_ZERO } from '../../constants/misc';
import { useActiveWeb3React } from '../../hooks/web3';
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks';
import { ExternalLink, ThemedText } from '../../theme';
import { Countdown } from './Countdown';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "Earn__PageWrapper",
  componentId: "sc-kddrr9-0"
})(["max-width:640px;width:100%;"]);

const TopSection = _styled(AutoColumn).withConfig({
  displayName: "Earn__TopSection",
  componentId: "sc-kddrr9-1"
})(["max-width:720px;width:100%;"]);

const PoolSection = _styled.div.withConfig({
  displayName: "Earn__PoolSection",
  componentId: "sc-kddrr9-2"
})(["display:grid;grid-template-columns:1fr;column-gap:10px;row-gap:15px;width:100%;justify-self:center;"]);

const DataRow = _styled(RowBetween).withConfig({
  displayName: "Earn__DataRow",
  componentId: "sc-kddrr9-3"
})(["", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
flex-direction: column;
`;
});

export default function Earn() {
  var _STAKING_REWARDS_INFO, _STAKING_REWARDS_INFO2, _stakingInfos$;

  const {
    chainId
  } = useActiveWeb3React(); // staking info for connected account

  const stakingInfos = useStakingInfo();
  /**
   * only show staking cards with balance
   * @todo only account for this if rewards are inactive
   */

  const stakingInfosWithBalance = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.filter(s => JSBI.greaterThan(s.stakedAmount.quotient, BIG_INT_ZERO)); // toggle copy if rewards are inactive

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && ((_STAKING_REWARDS_INFO = (_STAKING_REWARDS_INFO2 = STAKING_REWARDS_INFO[chainId]) === null || _STAKING_REWARDS_INFO2 === void 0 ? void 0 : _STAKING_REWARDS_INFO2.length) !== null && _STAKING_REWARDS_INFO !== void 0 ? _STAKING_REWARDS_INFO : 0) > 0);
  return /*#__PURE__*/_jsxs(PageWrapper, {
    gap: "lg",
    justify: "center",
    children: [/*#__PURE__*/_jsx(TopSection, {
      gap: "md",
      children: /*#__PURE__*/_jsxs(DataCard, {
        children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardSection, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            children: [/*#__PURE__*/_jsx(RowBetween, {
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontWeight: 600,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Uniswap liquidity mining"
                })
              })
            }), /*#__PURE__*/_jsx(RowBetween, {
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token."
                })
              })
            }), ' ', /*#__PURE__*/_jsx(ExternalLink, {
              style: {
                color: 'white',
                textDecoration: 'underline'
              },
              href: "https://uniswap.org/blog/uni/",
              target: "_blank",
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Read more about UNI"
                })
              })
            })]
          })
        }), /*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {})]
      })
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "lg",
      style: {
        width: '100%',
        maxWidth: '720px'
      },
      children: [/*#__PURE__*/_jsxs(DataRow, {
        style: {
          alignItems: 'baseline'
        },
        children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          style: {
            marginTop: '0.5rem'
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Participating pools"
          })
        }), /*#__PURE__*/_jsx(Countdown, {
          exactEnd: stakingInfos === null || stakingInfos === void 0 ? void 0 : (_stakingInfos$ = stakingInfos[0]) === null || _stakingInfos$ === void 0 ? void 0 : _stakingInfos$.periodFinish
        })]
      }), /*#__PURE__*/_jsx(PoolSection, {
        children: stakingRewardsExist && (stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.length) === 0 ? /*#__PURE__*/_jsx(Loader, {
          style: {
            margin: 'auto'
          }
        }) : !stakingRewardsExist ? /*#__PURE__*/_jsx(OutlineCard, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "No active pools"
          })
        }) : (stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.length) !== 0 && stakingInfosWithBalance.length === 0 ? /*#__PURE__*/_jsx(OutlineCard, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "No active pools"
          })
        }) : stakingInfosWithBalance === null || stakingInfosWithBalance === void 0 ? void 0 : stakingInfosWithBalance.map(stakingInfo => {
          // need to sort by added liquidity here
          return /*#__PURE__*/_jsx(PoolCard, {
            stakingInfo: stakingInfo
          }, stakingInfo.stakingRewardAddress);
        })
      })]
    })]
  });
}