import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Badge from 'components/Badge';
import { CHAIN_INFO, L2_CHAIN_IDS } from 'constants/chains';
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask';
import { useContext } from 'react';
import { AlertCircle, AlertTriangle, ArrowUpCircle, CheckCircle } from 'react-feather';
import { Text } from 'rebass';
import { useIsTransactionConfirmed, useTransaction } from 'state/transactions/hooks';
import Circle from '../../assets/images/blue-loader.svg';
import MetaMaskLogo from '../../assets/images/metamask.png';
import { useActiveWeb3React } from '../../hooks/web3';
import { ExternalLink } from '../../theme';
import { CloseIcon, CustomLightSpinner } from '../../theme';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { TransactionSummary } from '../AccountDetails/TransactionSummary';
import { ButtonLight, ButtonPrimary } from '../Button';
import { AutoColumn, ColumnCenter } from '../Column';
import Modal from '../Modal';
import { RowBetween, RowFixed } from '../Row';
import AnimatedConfirmation from './AnimatedConfirmation';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "TransactionConfirmationModal__Wrapper",
  componentId: "sc-12bigbw-0"
})(["width:100%;padding:1rem;"]);

const Section = _styled(AutoColumn).withConfig({
  displayName: "TransactionConfirmationModal__Section",
  componentId: "sc-12bigbw-1"
})(["padding:", ";"], _ref => {
  let {
    inline
  } = _ref;
  return inline ? '0' : '0';
});

const BottomSection = _styled(Section).withConfig({
  displayName: "TransactionConfirmationModal__BottomSection",
  componentId: "sc-12bigbw-2"
})(["border-bottom-left-radius:20px;border-bottom-right-radius:20px;"]);

const ConfirmedIcon = _styled(ColumnCenter).withConfig({
  displayName: "TransactionConfirmationModal__ConfirmedIcon",
  componentId: "sc-12bigbw-3"
})(["padding:", ";"], _ref2 => {
  let {
    inline
  } = _ref2;
  return inline ? '20px 0' : '32px 0;';
});

const StyledLogo = _styled.img.withConfig({
  displayName: "TransactionConfirmationModal__StyledLogo",
  componentId: "sc-12bigbw-4"
})(["height:16px;width:16px;margin-left:6px;"]);

function ConfirmationPendingContent(_ref3) {
  let {
    onDismiss,
    pendingText,
    inline
  } = _ref3;
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "md",
      children: [!inline && /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        inline: inline,
        children: /*#__PURE__*/_jsx(CustomLightSpinner, {
          src: Circle,
          alt: "loader",
          size: inline ? '40px' : '90px'
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          textAlign: "center",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Waiting For Confirmation"
          })
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 400,
          fontSize: 16,
          textAlign: "center",
          children: pendingText
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 14,
          color: "#565A69",
          textAlign: "center",
          marginBottom: "12px",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm this transaction in your wallet"
          })
        })]
      })]
    })
  });
}

function TransactionSubmittedContent(_ref4) {
  var _library$provider;

  let {
    onDismiss,
    chainId,
    hash,
    currencyToAdd,
    inline
  } = _ref4;
  const theme = useContext(_ThemeContext);
  const {
    library
  } = useActiveWeb3React();
  const {
    addToken,
    success
  } = useAddTokenToMetamask(currencyToAdd);
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsxs(Section, {
      inline: inline,
      children: [!inline && /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        inline: inline,
        children: /*#__PURE__*/_jsx(ArrowUpCircle, {
          strokeWidth: 0.5,
          size: inline ? '40px' : '90px',
          color: theme.primary1
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          textAlign: "center",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Transaction Submitted"
          })
        }), chainId && hash && /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 14,
            color: theme.primary1,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View on Explorer"
            })
          })
        }), currencyToAdd && (library === null || library === void 0 ? void 0 : (_library$provider = library.provider) === null || _library$provider === void 0 ? void 0 : _library$provider.isMetaMask) && /*#__PURE__*/_jsx(ButtonLight, {
          mt: "12px",
          padding: "6px 12px",
          width: "fit-content",
          onClick: addToken,
          children: !success ? /*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Add {0} to Metamask <0/>",
              values: {
                0: currencyToAdd.symbol
              },
              components: {
                0: /*#__PURE__*/_jsx(StyledLogo, {
                  src: MetaMaskLogo
                })
              }
            })
          }) : /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(Trans, {
              id: "Added {0}",
              values: {
                0: currencyToAdd.symbol
              }
            }), /*#__PURE__*/_jsx(CheckCircle, {
              size: '16px',
              stroke: theme.green1,
              style: {
                marginLeft: '6px'
              }
            })]
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: onDismiss,
          style: {
            margin: '20px 0 0 0'
          },
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            children: inline ? /*#__PURE__*/_jsx(Trans, {
              id: "Return"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Close"
            })
          })
        })]
      })]
    })
  });
}

export function ConfirmationModalContent(_ref5) {
  let {
    title,
    bottomContent,
    onDismiss,
    topContent
  } = _ref5;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(Section, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 16,
          children: title
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), topContent()]
    }), bottomContent && /*#__PURE__*/_jsx(BottomSection, {
      gap: "12px",
      children: bottomContent()
    })]
  });
}
export function TransactionErrorContent(_ref6) {
  let {
    message,
    onDismiss
  } = _ref6;
  const theme = useContext(_ThemeContext);
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(Section, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Error"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        style: {
          marginTop: 20,
          padding: '2rem 0'
        },
        gap: "24px",
        justify: "center",
        children: [/*#__PURE__*/_jsx(AlertTriangle, {
          color: theme.red1,
          style: {
            strokeWidth: 1.5
          },
          size: 64
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 16,
          color: theme.red1,
          style: {
            textAlign: 'center',
            width: '85%',
            wordBreak: 'break-word'
          },
          children: message
        })]
      })]
    }), /*#__PURE__*/_jsx(BottomSection, {
      gap: "12px",
      children: /*#__PURE__*/_jsx(ButtonPrimary, {
        onClick: onDismiss,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Dismiss"
        })
      })
    })]
  });
}

function L2Content(_ref7) {
  var _transaction$receipt;

  let {
    onDismiss,
    chainId,
    hash,
    pendingText,
    inline
  } = _ref7;
  const theme = useContext(_ThemeContext);
  const transaction = useTransaction(hash);
  const confirmed = useIsTransactionConfirmed(hash);
  const transactionSuccess = (transaction === null || transaction === void 0 ? void 0 : (_transaction$receipt = transaction.receipt) === null || _transaction$receipt === void 0 ? void 0 : _transaction$receipt.status) === 1; // convert unix time difference to seconds

  const secondsToConfirm = transaction !== null && transaction !== void 0 && transaction.confirmedTime ? (transaction.confirmedTime - transaction.addedTime) / 1000 : undefined;
  const info = CHAIN_INFO[chainId];
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsxs(Section, {
      inline: inline,
      children: [!inline && /*#__PURE__*/_jsxs(RowBetween, {
        mb: "16px",
        children: [/*#__PURE__*/_jsx(Badge, {
          children: /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(StyledLogo, {
              src: info.logoUrl,
              style: {
                margin: '0 8px 0 0'
              }
            }), info.label]
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        inline: inline,
        children: confirmed ? transactionSuccess ?
        /*#__PURE__*/
        // <CheckCircle strokeWidth={1} size={inline ? '40px' : '90px'} color={theme.green1} />
        _jsx(AnimatedConfirmation, {}) : /*#__PURE__*/_jsx(AlertCircle, {
          strokeWidth: 1,
          size: inline ? '40px' : '90px',
          color: theme.red1
        }) : /*#__PURE__*/_jsx(CustomLightSpinner, {
          src: Circle,
          alt: "loader",
          size: inline ? '40px' : '90px'
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          textAlign: "center",
          children: !hash ? /*#__PURE__*/_jsx(Trans, {
            id: "Confirm transaction in wallet"
          }) : !confirmed ? /*#__PURE__*/_jsx(Trans, {
            id: "Transaction Submitted"
          }) : transactionSuccess ? /*#__PURE__*/_jsx(Trans, {
            id: "Success"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Error"
          })
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 400,
          fontSize: 16,
          textAlign: "center",
          children: transaction ? /*#__PURE__*/_jsx(TransactionSummary, {
            info: transaction.info
          }) : pendingText
        }), chainId && hash ? /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 14,
            color: theme.primary1,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View on Explorer"
            })
          })
        }) : /*#__PURE__*/_jsx("div", {
          style: {
            height: '17px'
          }
        }), /*#__PURE__*/_jsx(Text, {
          color: theme.text3,
          style: {
            margin: '20px 0 0 0'
          },
          fontSize: '14px',
          children: !secondsToConfirm ? /*#__PURE__*/_jsx("div", {
            style: {
              height: '24px'
            }
          }) : /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Trans, {
              id: "Transaction completed in"
            }), /*#__PURE__*/_jsxs("span", {
              style: {
                fontWeight: 500,
                marginLeft: '4px',
                color: theme.text1
              },
              children: [secondsToConfirm, " seconds \uD83C\uDF89"]
            })]
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: onDismiss,
          style: {
            margin: '4px 0 0 0'
          },
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            children: inline ? /*#__PURE__*/_jsx(Trans, {
              id: "Return"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Close"
            })
          })
        })]
      })]
    })
  });
}

export default function TransactionConfirmationModal(_ref8) {
  let {
    isOpen,
    onDismiss,
    attemptingTxn,
    hash,
    pendingText,
    content,
    currencyToAdd
  } = _ref8;
  const {
    chainId
  } = useActiveWeb3React();
  const isL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
  if (!chainId) return null; // confirmation screen

  return /*#__PURE__*/_jsx(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    maxHeight: 90,
    children: isL2 && (hash || attemptingTxn) ? /*#__PURE__*/_jsx(L2Content, {
      chainId: chainId,
      hash: hash,
      onDismiss: onDismiss,
      pendingText: pendingText
    }) : attemptingTxn ? /*#__PURE__*/_jsx(ConfirmationPendingContent, {
      onDismiss: onDismiss,
      pendingText: pendingText
    }) : hash ? /*#__PURE__*/_jsx(TransactionSubmittedContent, {
      chainId: chainId,
      hash: hash,
      onDismiss: onDismiss,
      currencyToAdd: currencyToAdd
    }) : content()
  });
}