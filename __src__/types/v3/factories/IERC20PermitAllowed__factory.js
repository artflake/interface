/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [{
  inputs: [{
    internalType: "address",
    name: "holder",
    type: "address"
  }, {
    internalType: "address",
    name: "spender",
    type: "address"
  }, {
    internalType: "uint256",
    name: "nonce",
    type: "uint256"
  }, {
    internalType: "uint256",
    name: "expiry",
    type: "uint256"
  }, {
    internalType: "bool",
    name: "allowed",
    type: "bool"
  }, {
    internalType: "uint8",
    name: "v",
    type: "uint8"
  }, {
    internalType: "bytes32",
    name: "r",
    type: "bytes32"
  }, {
    internalType: "bytes32",
    name: "s",
    type: "bytes32"
  }],
  name: "permit",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}];
export class IERC20PermitAllowed__factory {
  static createInterface() {
    return new utils.Interface(_abi);
  }

  static connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  }

}
IERC20PermitAllowed__factory.abi = _abi;