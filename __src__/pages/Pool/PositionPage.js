import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { BigNumber } from '@ethersproject/bignumber';
import { Fraction, Percent } from '@uniswap/sdk-core';
import { NonfungiblePositionManager, Position } from '@uniswap/v3-sdk';
import Badge from "../../components/Badge";
import { ButtonConfirmed, ButtonGray, ButtonPrimary } from "../../components/Button";
import { DarkCard, LightCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import CurrencyLogo from "../../components/CurrencyLogo";
import DoubleCurrencyLogo from "../../components/DoubleLogo";
import Loader from "../../components/Loader";
import { RowBetween, RowFixed } from "../../components/Row";
import { Dots } from "../../components/swap/styleds";
import Toggle from "../../components/Toggle";
import TransactionConfirmationModal, { ConfirmationModalContent } from "../../components/TransactionConfirmationModal";
import { useToken } from "../../hooks/Tokens";
import { useV3NFTPositionManagerContract } from "../../hooks/useContract";
import useIsTickAtLimit from "../../hooks/useIsTickAtLimit";
import { PoolState, usePool } from "../../hooks/usePools";
import useUSDCPrice from "../../hooks/useUSDCPrice";
import { useV3PositionFees } from "../../hooks/useV3PositionFees";
import { useV3PositionFromTokenId } from "../../hooks/useV3Positions";
import { useActiveWeb3React } from "../../hooks/web3";
import { useCallback, useMemo, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { Bound } from "../../state/mint/v3/actions";
import { useSingleCallResult } from "../../state/multicall/hooks";
import { useIsTransactionPending, useTransactionAdder } from "../../state/transactions/hooks";
import { ExternalLink, HideExtraSmall, ThemedText } from "../../theme";
import { currencyId } from "../../utils/currencyId";
import { formatCurrencyAmount } from "../../utils/formatCurrencyAmount";
import { formatTickPrice } from "../../utils/formatTickPrice";
import { unwrappedToken } from "../../utils/unwrappedToken";
import RangeBadge from "../../components/Badge/RangeBadge";
import { getPriceOrderingFromPositionForUI } from "../../components/PositionListItem";
import RateToggle from "../../components/RateToggle";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import { usePositionTokenURI } from "../../hooks/usePositionTokenURI";
import useTheme from "../../hooks/useTheme";
import { TransactionType } from "../../state/transactions/actions";
import { calculateGasMargin } from "../../utils/calculateGasMargin";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { LoadingRows } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled.div.withConfig({
  displayName: "PositionPage__PageWrapper",
  componentId: "sc-z20cv-0"
})(["min-width:800px;max-width:960px;", ";", ";@media only screen and (max-width:620px){min-width:500px;max-width:500px;}", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToMedium`
    min-width: 680px;
    max-width: 680px;
  `;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToSmall`
    min-width: 600px;
    max-width: 600px;
  `;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.mediaWidth.upToExtraSmall`
    min-width: 340px;
    max-width: 340px;
  `;
});

const BadgeText = _styled.div.withConfig({
  displayName: "PositionPage__BadgeText",
  componentId: "sc-z20cv-1"
})(["font-weight:500;font-size:14px;"]); // responsive text
// disable the warning because we don't use the end prop, we just want to filter it out
// eslint-disable-next-line @typescript-eslint/no-unused-vars


const Label = _styled(_ref4 => {
  let {
    end,
    ...props
  } = _ref4;
  return /*#__PURE__*/_jsx(ThemedText.Label, { ...props
  });
}).withConfig({
  displayName: "PositionPage__Label",
  componentId: "sc-z20cv-2"
})(["display:flex;font-size:16px;justify-content:", ";align-items:center;"], _ref5 => {
  let {
    end
  } = _ref5;
  return end ? 'flex-end' : 'flex-start';
});

const ExtentsText = _styled.span.withConfig({
  displayName: "PositionPage__ExtentsText",
  componentId: "sc-z20cv-3"
})(["color:", ";font-size:14px;text-align:center;margin-right:4px;font-weight:500;"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.text2;
});

const HoverText = _styled(ThemedText.Main).withConfig({
  displayName: "PositionPage__HoverText",
  componentId: "sc-z20cv-4"
})(["text-decoration:none;color:", ";:hover{color:", ";text-decoration:none;}"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.text3;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.text1;
});

const DoubleArrow = _styled.span.withConfig({
  displayName: "PositionPage__DoubleArrow",
  componentId: "sc-z20cv-5"
})(["color:", ";margin:0 1rem;"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.text3;
});

const ResponsiveRow = _styled(RowBetween).withConfig({
  displayName: "PositionPage__ResponsiveRow",
  componentId: "sc-z20cv-6"
})(["", ";"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-start;
    row-gap: 16px;
    width: 100%:
  `;
});

const ResponsiveButtonPrimary = _styled(ButtonPrimary).withConfig({
  displayName: "PositionPage__ResponsiveButtonPrimary",
  componentId: "sc-z20cv-7"
})(["border-radius:12px;padding:6px 8px;width:fit-content;", ";"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 49%;
  `;
});

const NFTGrid = _styled.div.withConfig({
  displayName: "PositionPage__NFTGrid",
  componentId: "sc-z20cv-8"
})(["display:grid;grid-template:'overlap';min-height:400px;"]);

const NFTCanvas = _styled.canvas.withConfig({
  displayName: "PositionPage__NFTCanvas",
  componentId: "sc-z20cv-9"
})(["grid-area:overlap;"]);

const NFTImage = _styled.img.withConfig({
  displayName: "PositionPage__NFTImage",
  componentId: "sc-z20cv-10"
})(["grid-area:overlap;height:400px;z-index:1;"]);

function CurrentPriceCard(_ref12) {
  let {
    inverted,
    pool,
    currencyQuote,
    currencyBase
  } = _ref12;

  if (!pool || !currencyQuote || !currencyBase) {
    return null;
  }

  return /*#__PURE__*/_jsx(LightCard, {
    padding: "12px ",
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "8px",
      justify: "center",
      children: [/*#__PURE__*/_jsx(ExtentsText, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Current price"
        })
      }), /*#__PURE__*/_jsxs(ThemedText.MediumHeader, {
        textAlign: "center",
        children: [(inverted ? pool.token1Price : pool.token0Price).toSignificant(6), ' ']
      }), /*#__PURE__*/_jsx(ExtentsText, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0} per {1}",
          values: {
            0: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol,
            1: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
          }
        })
      })]
    })
  });
}

function LinkedCurrency(_ref13) {
  let {
    chainId,
    currency
  } = _ref13;
  const address = currency === null || currency === void 0 ? void 0 : currency.address;

  if (typeof chainId === 'number' && address) {
    return /*#__PURE__*/_jsx(ExternalLink, {
      href: getExplorerLink(chainId, address, ExplorerDataType.TOKEN),
      children: /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          currency: currency,
          size: '20px',
          style: {
            marginRight: '0.5rem'
          }
        }), /*#__PURE__*/_jsxs(ThemedText.Main, {
          children: [currency === null || currency === void 0 ? void 0 : currency.symbol, " \u2197"]
        })]
      })
    });
  }

  return /*#__PURE__*/_jsxs(RowFixed, {
    children: [/*#__PURE__*/_jsx(CurrencyLogo, {
      currency: currency,
      size: '20px',
      style: {
        marginRight: '0.5rem'
      }
    }), /*#__PURE__*/_jsx(ThemedText.Main, {
      children: currency === null || currency === void 0 ? void 0 : currency.symbol
    })]
  });
}

function getRatio(lower, current, upper) {
  try {
    if (!current.greaterThan(lower)) {
      return 100;
    } else if (!current.lessThan(upper)) {
      return 0;
    }

    const a = Number.parseFloat(lower.toSignificant(15));
    const b = Number.parseFloat(upper.toSignificant(15));
    const c = Number.parseFloat(current.toSignificant(15));
    const ratio = Math.floor(1 / ((Math.sqrt(a * b) - Math.sqrt(b * c)) / (c - Math.sqrt(b * c)) + 1) * 100);

    if (ratio < 0 || ratio > 100) {
      throw Error('Out of range');
    }

    return ratio;
  } catch {
    return undefined;
  }
} // snapshots a src img into a canvas


function getSnapshot(src, canvas, targetHeight) {
  const context = canvas.getContext('2d');

  if (context) {
    let {
      width,
      height
    } = src; // src may be hidden and not have the target dimensions

    const ratio = width / height;
    height = targetHeight;
    width = Math.round(ratio * targetHeight); // Ensure crispness at high DPIs

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(devicePixelRatio, devicePixelRatio);
    context.clearRect(0, 0, width, height);
    context.drawImage(src, 0, 0, width, height);
  }
}

function NFT(_ref14) {
  let {
    image,
    height: targetHeight
  } = _ref14;
  const [animate, setAnimate] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  return /*#__PURE__*/_jsxs(NFTGrid, {
    onMouseEnter: () => {
      setAnimate(true);
    },
    onMouseLeave: () => {
      // snapshot the current frame so the transition to the canvas is smooth
      if (imageRef.current && canvasRef.current) {
        getSnapshot(imageRef.current, canvasRef.current, targetHeight);
      }

      setAnimate(false);
    },
    children: [/*#__PURE__*/_jsx(NFTCanvas, {
      ref: canvasRef
    }), /*#__PURE__*/_jsx(NFTImage, {
      ref: imageRef,
      src: image,
      hidden: !animate,
      onLoad: () => {
        // snapshot for the canvas
        if (imageRef.current && canvasRef.current) {
          getSnapshot(imageRef.current, canvasRef.current, targetHeight);
        }
      }
    })]
  });
}

const useInverter = _ref15 => {
  let {
    priceLower,
    priceUpper,
    quote,
    base,
    invert
  } = _ref15;
  return {
    priceUpper: invert ? priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert() : priceUpper,
    priceLower: invert ? priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert() : priceLower,
    quote: invert ? base : quote,
    base: invert ? quote : base
  };
};

export function PositionPage(_ref16) {
  var _useSingleCallResult$, _feeValueUpper$curren2, _feeValueLower$curren2;

  let {
    match: {
      params: {
        tokenId: tokenIdFromUrl
      }
    }
  } = _ref16;
  const {
    chainId,
    account,
    library
  } = useActiveWeb3React();
  const theme = useTheme();
  const parsedTokenId = tokenIdFromUrl ? BigNumber.from(tokenIdFromUrl) : undefined;
  const {
    loading,
    position: positionDetails
  } = useV3PositionFromTokenId(parsedTokenId);
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId
  } = positionDetails || {};
  const removed = liquidity === null || liquidity === void 0 ? void 0 : liquidity.eq(0);
  const token0 = useToken(token0Address);
  const token1 = useToken(token1Address);
  const metadata = usePositionTokenURI(parsedTokenId);
  const currency0 = token0 ? unwrappedToken(token0) : undefined;
  const currency1 = token1 ? unwrappedToken(token1) : undefined; // flag for receiving WETH

  const [receiveWETH, setReceiveWETH] = useState(false); // construct Position from details returned

  const [poolState, pool] = usePool(token0 !== null && token0 !== void 0 ? token0 : undefined, token1 !== null && token1 !== void 0 ? token1 : undefined, feeAmount);
  const position = useMemo(() => {
    if (pool && liquidity && typeof tickLower === 'number' && typeof tickUpper === 'number') {
      return new Position({
        pool,
        liquidity: liquidity.toString(),
        tickLower,
        tickUpper
      });
    }

    return undefined;
  }, [liquidity, pool, tickLower, tickUpper]);
  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper);
  const pricesFromPosition = getPriceOrderingFromPositionForUI(position);
  const [manuallyInverted, setManuallyInverted] = useState(false); // handle manual inversion

  const {
    priceLower,
    priceUpper,
    base
  } = useInverter({
    priceLower: pricesFromPosition.priceLower,
    priceUpper: pricesFromPosition.priceUpper,
    quote: pricesFromPosition.quote,
    base: pricesFromPosition.base,
    invert: manuallyInverted
  });
  const inverted = token1 ? base === null || base === void 0 ? void 0 : base.equals(token1) : undefined;
  const currencyQuote = inverted ? currency0 : currency1;
  const currencyBase = inverted ? currency1 : currency0;
  const ratio = useMemo(() => {
    return priceLower && pool && priceUpper ? getRatio(inverted ? priceUpper.invert() : priceLower, pool.token0Price, inverted ? priceLower.invert() : priceUpper) : undefined;
  }, [inverted, pool, priceLower, priceUpper]); // fees

  const [feeValue0, feeValue1] = useV3PositionFees(pool !== null && pool !== void 0 ? pool : undefined, positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.tokenId, receiveWETH);
  const [collecting, setCollecting] = useState(false);
  const [collectMigrationHash, setCollectMigrationHash] = useState(null);
  const isCollectPending = useIsTransactionPending(collectMigrationHash !== null && collectMigrationHash !== void 0 ? collectMigrationHash : undefined);
  const [showConfirm, setShowConfirm] = useState(false); // usdc prices always in terms of tokens

  const price0 = useUSDCPrice(token0 !== null && token0 !== void 0 ? token0 : undefined);
  const price1 = useUSDCPrice(token1 !== null && token1 !== void 0 ? token1 : undefined);
  const fiatValueOfFees = useMemo(() => {
    if (!price0 || !price1 || !feeValue0 || !feeValue1) return null; // we wrap because it doesn't matter, the quote returns a USDC amount

    const feeValue0Wrapped = feeValue0 === null || feeValue0 === void 0 ? void 0 : feeValue0.wrapped;
    const feeValue1Wrapped = feeValue1 === null || feeValue1 === void 0 ? void 0 : feeValue1.wrapped;
    if (!feeValue0Wrapped || !feeValue1Wrapped) return null;
    const amount0 = price0.quote(feeValue0Wrapped);
    const amount1 = price1.quote(feeValue1Wrapped);
    return amount0.add(amount1);
  }, [price0, price1, feeValue0, feeValue1]);
  const fiatValueOfLiquidity = useMemo(() => {
    if (!price0 || !price1 || !position) return null;
    const amount0 = price0.quote(position.amount0);
    const amount1 = price1.quote(position.amount1);
    return amount0.add(amount1);
  }, [price0, price1, position]);
  const addTransaction = useTransactionAdder();
  const positionManager = useV3NFTPositionManagerContract();
  const collect = useCallback(() => {
    if (!chainId || !feeValue0 || !feeValue1 || !positionManager || !account || !tokenId || !library) return;
    setCollecting(true);
    const {
      calldata,
      value
    } = NonfungiblePositionManager.collectCallParameters({
      tokenId: tokenId.toString(),
      expectedCurrencyOwed0: feeValue0,
      expectedCurrencyOwed1: feeValue1,
      recipient: account
    });
    const txn = {
      to: positionManager.address,
      data: calldata,
      value
    };
    library.getSigner().estimateGas(txn).then(estimate => {
      const newTxn = { ...txn,
        gasLimit: calculateGasMargin(estimate)
      };
      return library.getSigner().sendTransaction(newTxn).then(response => {
        setCollectMigrationHash(response.hash);
        setCollecting(false);
        ReactGA.event({
          category: 'Liquidity',
          action: 'CollectV3',
          label: [feeValue0.currency.symbol, feeValue1.currency.symbol].join('/')
        });
        addTransaction(response, {
          type: TransactionType.COLLECT_FEES,
          currencyId0: currencyId(feeValue0.currency),
          currencyId1: currencyId(feeValue1.currency)
        });
      });
    }).catch(error => {
      setCollecting(false);
      console.error(error);
    });
  }, [chainId, feeValue0, feeValue1, positionManager, account, tokenId, addTransaction, library]);
  const owner = (_useSingleCallResult$ = useSingleCallResult(!!tokenId ? positionManager : null, 'ownerOf', [tokenId]).result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
  const ownsNFT = owner === account || (positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.operator) === account;
  const feeValueUpper = inverted ? feeValue0 : feeValue1;
  const feeValueLower = inverted ? feeValue1 : feeValue0; // check if price is within range

  const below = pool && typeof tickLower === 'number' ? pool.tickCurrent < tickLower : undefined;
  const above = pool && typeof tickUpper === 'number' ? pool.tickCurrent >= tickUpper : undefined;
  const inRange = typeof below === 'boolean' && typeof above === 'boolean' ? !below && !above : false;

  function modalHeader() {
    var _feeValueUpper$curren, _feeValueLower$curren;

    return /*#__PURE__*/_jsxs(AutoColumn, {
      gap: 'md',
      style: {
        marginTop: '20px'
      },
      children: [/*#__PURE__*/_jsx(LightCard, {
        padding: "12px 16px",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                currency: feeValueUpper === null || feeValueUpper === void 0 ? void 0 : feeValueUpper.currency,
                size: '20px',
                style: {
                  marginRight: '0.5rem'
                }
              }), /*#__PURE__*/_jsx(ThemedText.Main, {
                children: feeValueUpper ? formatCurrencyAmount(feeValueUpper, 4) : '-'
              })]
            }), /*#__PURE__*/_jsx(ThemedText.Main, {
              children: feeValueUpper === null || feeValueUpper === void 0 ? void 0 : (_feeValueUpper$curren = feeValueUpper.currency) === null || _feeValueUpper$curren === void 0 ? void 0 : _feeValueUpper$curren.symbol
            })]
          }), /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                currency: feeValueLower === null || feeValueLower === void 0 ? void 0 : feeValueLower.currency,
                size: '20px',
                style: {
                  marginRight: '0.5rem'
                }
              }), /*#__PURE__*/_jsx(ThemedText.Main, {
                children: feeValueLower ? formatCurrencyAmount(feeValueLower, 4) : '-'
              })]
            }), /*#__PURE__*/_jsx(ThemedText.Main, {
              children: feeValueLower === null || feeValueLower === void 0 ? void 0 : (_feeValueLower$curren = feeValueLower.currency) === null || _feeValueLower$curren === void 0 ? void 0 : _feeValueLower$curren.symbol
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(ThemedText.Italic, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Collecting fees will withdraw currently available fees for you."
        })
      }), /*#__PURE__*/_jsx(ButtonPrimary, {
        onClick: collect,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Collect"
        })
      })]
    });
  }

  const showCollectAsWeth = Boolean(ownsNFT && ((feeValue0 === null || feeValue0 === void 0 ? void 0 : feeValue0.greaterThan(0)) || (feeValue1 === null || feeValue1 === void 0 ? void 0 : feeValue1.greaterThan(0))) && currency0 && currency1 && (currency0.isNative || currency1.isNative) && !collectMigrationHash);
  return loading || poolState === PoolState.LOADING || !feeAmount ? /*#__PURE__*/_jsxs(LoadingRows, {
    children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {})]
  }) : /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(PageWrapper, {
      children: [/*#__PURE__*/_jsx(TransactionConfirmationModal, {
        isOpen: showConfirm,
        onDismiss: () => setShowConfirm(false),
        attemptingTxn: collecting,
        hash: collectMigrationHash !== null && collectMigrationHash !== void 0 ? collectMigrationHash : '',
        content: () => /*#__PURE__*/_jsx(ConfirmationModalContent, {
          title: /*#__PURE__*/_jsx(Trans, {
            id: "Claim fees"
          }),
          onDismiss: () => setShowConfirm(false),
          topContent: modalHeader
        }),
        pendingText: /*#__PURE__*/_jsx(Trans, {
          id: "Collecting fees"
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "md",
        children: [/*#__PURE__*/_jsxs(AutoColumn, {
          gap: "sm",
          children: [/*#__PURE__*/_jsx(Link, {
            style: {
              textDecoration: 'none',
              width: 'fit-content',
              marginBottom: '0.5rem'
            },
            to: "/pool",
            children: /*#__PURE__*/_jsx(HoverText, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "\u2190 Back to Pools Overview"
              })
            })
          }), /*#__PURE__*/_jsxs(ResponsiveRow, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
                currency0: currencyBase,
                currency1: currencyQuote,
                size: 24,
                margin: true
              }), /*#__PURE__*/_jsxs(ThemedText.Label, {
                fontSize: '24px',
                mr: "10px",
                children: ["\xA0", currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol, "\xA0/\xA0", currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol]
              }), /*#__PURE__*/_jsx(Badge, {
                style: {
                  marginRight: '8px'
                },
                children: /*#__PURE__*/_jsx(BadgeText, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "{0}%",
                    values: {
                      0: new Percent(feeAmount, 1000000).toSignificant()
                    }
                  })
                })
              }), /*#__PURE__*/_jsx(RangeBadge, {
                removed: removed,
                inRange: inRange
              })]
            }), ownsNFT && /*#__PURE__*/_jsxs(RowFixed, {
              children: [currency0 && currency1 && feeAmount && tokenId ? /*#__PURE__*/_jsx(ButtonGray, {
                as: Link,
                to: `/increase/${currencyId(currency0)}/${currencyId(currency1)}/${feeAmount}/${tokenId}`,
                width: "fit-content",
                padding: "6px 8px",
                $borderRadius: "12px",
                style: {
                  marginRight: '8px'
                },
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Increase Liquidity"
                })
              }) : null, tokenId && !removed ? /*#__PURE__*/_jsx(ResponsiveButtonPrimary, {
                as: Link,
                to: `/remove/${tokenId}`,
                width: "fit-content",
                padding: "6px 8px",
                $borderRadius: "12px",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Remove Liquidity"
                })
              }) : null]
            })]
          }), /*#__PURE__*/_jsx(RowBetween, {})]
        }), /*#__PURE__*/_jsxs(ResponsiveRow, {
          align: "flex-start",
          children: ['result' in metadata ? /*#__PURE__*/_jsxs(DarkCard, {
            width: "100%",
            height: "100%",
            style: {
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '12px'
            },
            children: [/*#__PURE__*/_jsx("div", {
              style: {
                marginRight: 12
              },
              children: /*#__PURE__*/_jsx(NFT, {
                image: metadata.result.image,
                height: 400
              })
            }), typeof chainId === 'number' && owner && !ownsNFT ? /*#__PURE__*/_jsx(ExternalLink, {
              href: getExplorerLink(chainId, owner, ExplorerDataType.ADDRESS),
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Owner"
              })
            }) : null]
          }) : /*#__PURE__*/_jsx(DarkCard, {
            width: "100%",
            height: "100%",
            style: {
              marginRight: '12px',
              minWidth: '340px'
            },
            children: /*#__PURE__*/_jsx(Loader, {})
          }), /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "sm",
            style: {
              width: '100%',
              height: '100%'
            },
            children: [/*#__PURE__*/_jsx(DarkCard, {
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "md",
                style: {
                  width: '100%'
                },
                children: [/*#__PURE__*/_jsxs(AutoColumn, {
                  gap: "md",
                  children: [/*#__PURE__*/_jsx(Label, {
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Liquidity"
                    })
                  }), fiatValueOfLiquidity !== null && fiatValueOfLiquidity !== void 0 && fiatValueOfLiquidity.greaterThan(new Fraction(1, 100)) ? /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
                    fontSize: "36px",
                    fontWeight: 500,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "${0}",
                      values: {
                        0: fiatValueOfLiquidity.toFixed(2, {
                          groupSeparator: ','
                        })
                      }
                    })
                  }) : /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
                    color: theme.text1,
                    fontSize: "36px",
                    fontWeight: 500,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "$-"
                    })
                  })]
                }), /*#__PURE__*/_jsx(LightCard, {
                  padding: "12px 16px",
                  children: /*#__PURE__*/_jsxs(AutoColumn, {
                    gap: "md",
                    children: [/*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsx(LinkedCurrency, {
                        chainId: chainId,
                        currency: currencyQuote
                      }), /*#__PURE__*/_jsxs(RowFixed, {
                        children: [/*#__PURE__*/_jsx(ThemedText.Main, {
                          children: inverted ? position === null || position === void 0 ? void 0 : position.amount0.toSignificant(4) : position === null || position === void 0 ? void 0 : position.amount1.toSignificant(4)
                        }), typeof ratio === 'number' && !removed ? /*#__PURE__*/_jsx(Badge, {
                          style: {
                            marginLeft: '10px'
                          },
                          children: /*#__PURE__*/_jsx(ThemedText.Main, {
                            fontSize: 11,
                            children: /*#__PURE__*/_jsx(Trans, {
                              id: "{0}%",
                              values: {
                                0: inverted ? ratio : 100 - ratio
                              }
                            })
                          })
                        }) : null]
                      })]
                    }), /*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsx(LinkedCurrency, {
                        chainId: chainId,
                        currency: currencyBase
                      }), /*#__PURE__*/_jsxs(RowFixed, {
                        children: [/*#__PURE__*/_jsx(ThemedText.Main, {
                          children: inverted ? position === null || position === void 0 ? void 0 : position.amount1.toSignificant(4) : position === null || position === void 0 ? void 0 : position.amount0.toSignificant(4)
                        }), typeof ratio === 'number' && !removed ? /*#__PURE__*/_jsx(Badge, {
                          style: {
                            marginLeft: '10px'
                          },
                          children: /*#__PURE__*/_jsx(ThemedText.Main, {
                            color: theme.text2,
                            fontSize: 11,
                            children: /*#__PURE__*/_jsx(Trans, {
                              id: "{0}%",
                              values: {
                                0: inverted ? 100 - ratio : ratio
                              }
                            })
                          })
                        }) : null]
                      })]
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/_jsx(DarkCard, {
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "md",
                style: {
                  width: '100%'
                },
                children: [/*#__PURE__*/_jsx(AutoColumn, {
                  gap: "md",
                  children: /*#__PURE__*/_jsxs(RowBetween, {
                    style: {
                      alignItems: 'flex-start'
                    },
                    children: [/*#__PURE__*/_jsxs(AutoColumn, {
                      gap: "md",
                      children: [/*#__PURE__*/_jsx(Label, {
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Unclaimed fees"
                        })
                      }), fiatValueOfFees !== null && fiatValueOfFees !== void 0 && fiatValueOfFees.greaterThan(new Fraction(1, 100)) ? /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
                        color: theme.green1,
                        fontSize: "36px",
                        fontWeight: 500,
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "${0}",
                          values: {
                            0: fiatValueOfFees.toFixed(2, {
                              groupSeparator: ','
                            })
                          }
                        })
                      }) : /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
                        color: theme.text1,
                        fontSize: "36px",
                        fontWeight: 500,
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "$-"
                        })
                      })]
                    }), ownsNFT && (feeValue0 !== null && feeValue0 !== void 0 && feeValue0.greaterThan(0) || feeValue1 !== null && feeValue1 !== void 0 && feeValue1.greaterThan(0) || !!collectMigrationHash) ? /*#__PURE__*/_jsx(ButtonConfirmed, {
                      disabled: collecting || !!collectMigrationHash,
                      confirmed: !!collectMigrationHash && !isCollectPending,
                      width: "fit-content",
                      style: {
                        borderRadius: '12px'
                      },
                      padding: "4px 8px",
                      onClick: () => setShowConfirm(true),
                      children: !!collectMigrationHash && !isCollectPending ? /*#__PURE__*/_jsx(ThemedText.Main, {
                        color: theme.text1,
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Collected"
                        })
                      }) : isCollectPending || collecting ? /*#__PURE__*/_jsxs(ThemedText.Main, {
                        color: theme.text1,
                        children: [' ', /*#__PURE__*/_jsx(Dots, {
                          children: /*#__PURE__*/_jsx(Trans, {
                            id: "Collecting"
                          })
                        })]
                      }) : /*#__PURE__*/_jsx(_Fragment, {
                        children: /*#__PURE__*/_jsx(ThemedText.Main, {
                          color: theme.white,
                          children: /*#__PURE__*/_jsx(Trans, {
                            id: "Collect fees"
                          })
                        })
                      })
                    }) : null]
                  })
                }), /*#__PURE__*/_jsx(LightCard, {
                  padding: "12px 16px",
                  children: /*#__PURE__*/_jsxs(AutoColumn, {
                    gap: "md",
                    children: [/*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsxs(RowFixed, {
                        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                          currency: feeValueUpper === null || feeValueUpper === void 0 ? void 0 : feeValueUpper.currency,
                          size: '20px',
                          style: {
                            marginRight: '0.5rem'
                          }
                        }), /*#__PURE__*/_jsx(ThemedText.Main, {
                          children: feeValueUpper === null || feeValueUpper === void 0 ? void 0 : (_feeValueUpper$curren2 = feeValueUpper.currency) === null || _feeValueUpper$curren2 === void 0 ? void 0 : _feeValueUpper$curren2.symbol
                        })]
                      }), /*#__PURE__*/_jsx(RowFixed, {
                        children: /*#__PURE__*/_jsx(ThemedText.Main, {
                          children: feeValueUpper ? formatCurrencyAmount(feeValueUpper, 4) : '-'
                        })
                      })]
                    }), /*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsxs(RowFixed, {
                        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                          currency: feeValueLower === null || feeValueLower === void 0 ? void 0 : feeValueLower.currency,
                          size: '20px',
                          style: {
                            marginRight: '0.5rem'
                          }
                        }), /*#__PURE__*/_jsx(ThemedText.Main, {
                          children: feeValueLower === null || feeValueLower === void 0 ? void 0 : (_feeValueLower$curren2 = feeValueLower.currency) === null || _feeValueLower$curren2 === void 0 ? void 0 : _feeValueLower$curren2.symbol
                        })]
                      }), /*#__PURE__*/_jsx(RowFixed, {
                        children: /*#__PURE__*/_jsx(ThemedText.Main, {
                          children: feeValueLower ? formatCurrencyAmount(feeValueLower, 4) : '-'
                        })
                      })]
                    })]
                  })
                }), showCollectAsWeth && /*#__PURE__*/_jsx(AutoColumn, {
                  gap: "md",
                  children: /*#__PURE__*/_jsxs(RowBetween, {
                    children: [/*#__PURE__*/_jsx(ThemedText.Main, {
                      children: /*#__PURE__*/_jsx(Trans, {
                        id: "Collect as WETH"
                      })
                    }), /*#__PURE__*/_jsx(Toggle, {
                      id: "receive-as-weth",
                      isActive: receiveWETH,
                      toggle: () => setReceiveWETH(receiveWETH => !receiveWETH)
                    })]
                  })
                })]
              })
            })]
          })]
        }), /*#__PURE__*/_jsx(DarkCard, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsxs(RowFixed, {
                children: [/*#__PURE__*/_jsx(Label, {
                  display: "flex",
                  style: {
                    marginRight: '12px'
                  },
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Price range"
                  })
                }), /*#__PURE__*/_jsx(HideExtraSmall, {
                  children: /*#__PURE__*/_jsxs(_Fragment, {
                    children: [/*#__PURE__*/_jsx(RangeBadge, {
                      removed: removed,
                      inRange: inRange
                    }), /*#__PURE__*/_jsx("span", {
                      style: {
                        width: '8px'
                      }
                    })]
                  })
                })]
              }), /*#__PURE__*/_jsx(RowFixed, {
                children: currencyBase && currencyQuote && /*#__PURE__*/_jsx(RateToggle, {
                  currencyA: currencyBase,
                  currencyB: currencyQuote,
                  handleRateToggle: () => setManuallyInverted(!manuallyInverted)
                })
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(LightCard, {
                padding: "12px",
                width: "100%",
                children: /*#__PURE__*/_jsxs(AutoColumn, {
                  gap: "8px",
                  justify: "center",
                  children: [/*#__PURE__*/_jsx(ExtentsText, {
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Min price"
                    })
                  }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
                    textAlign: "center",
                    children: formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)
                  }), /*#__PURE__*/_jsxs(ExtentsText, {
                    children: [' ', /*#__PURE__*/_jsx(Trans, {
                      id: "{0} per {1}",
                      values: {
                        0: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol,
                        1: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
                      }
                    })]
                  }), inRange && /*#__PURE__*/_jsx(ThemedText.Small, {
                    color: theme.text3,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Your position will be 100% {0} at this price.",
                      values: {
                        0: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
                      }
                    })
                  })]
                })
              }), /*#__PURE__*/_jsx(DoubleArrow, {
                children: "\u27F7"
              }), /*#__PURE__*/_jsx(LightCard, {
                padding: "12px",
                width: "100%",
                children: /*#__PURE__*/_jsxs(AutoColumn, {
                  gap: "8px",
                  justify: "center",
                  children: [/*#__PURE__*/_jsx(ExtentsText, {
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Max price"
                    })
                  }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
                    textAlign: "center",
                    children: formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)
                  }), /*#__PURE__*/_jsxs(ExtentsText, {
                    children: [' ', /*#__PURE__*/_jsx(Trans, {
                      id: "{0} per {1}",
                      values: {
                        0: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol,
                        1: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
                      }
                    })]
                  }), inRange && /*#__PURE__*/_jsx(ThemedText.Small, {
                    color: theme.text3,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Your position will be 100% {0} at this price.",
                      values: {
                        0: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
                      }
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/_jsx(CurrentPriceCard, {
              inverted: inverted,
              pool: pool,
              currencyQuote: currencyQuote,
              currencyBase: currencyBase
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}