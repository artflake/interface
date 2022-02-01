/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [{
  inputs: [],
  name: "refundETH",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "token",
    type: "address"
  }, {
    internalType: "uint256",
    name: "amountMinimum",
    type: "uint256"
  }, {
    internalType: "address",
    name: "recipient",
    type: "address"
  }],
  name: "sweepToken",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "token",
    type: "address"
  }, {
    internalType: "uint256",
    name: "amountMinimum",
    type: "uint256"
  }, {
    internalType: "address",
    name: "recipient",
    type: "address"
  }, {
    internalType: "uint256",
    name: "feeBips",
    type: "uint256"
  }, {
    internalType: "address",
    name: "feeRecipient",
    type: "address"
  }],
  name: "sweepTokenWithFee",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "amountMinimum",
    type: "uint256"
  }, {
    internalType: "address",
    name: "recipient",
    type: "address"
  }],
  name: "unwrapWETH9",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "amountMinimum",
    type: "uint256"
  }, {
    internalType: "address",
    name: "recipient",
    type: "address"
  }, {
    internalType: "uint256",
    name: "feeBips",
    type: "uint256"
  }, {
    internalType: "address",
    name: "feeRecipient",
    type: "address"
  }],
  name: "unwrapWETH9WithFee",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}];
export class IPeripheryPaymentsWithFee__factory {
  static createInterface() {
    return new utils.Interface(_abi);
  }

  static connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  }

}
IPeripheryPaymentsWithFee__factory.abi = _abi;