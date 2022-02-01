/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [{
  constant: true,
  inputs: [],
  name: "name",
  outputs: [{
    name: "",
    type: "bytes32"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "symbol",
  outputs: [{
    name: "",
    type: "bytes32"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}];
export class Erc20Bytes32__factory {
  static createInterface() {
    return new utils.Interface(_abi);
  }

  static connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  }

}
Erc20Bytes32__factory.abi = _abi;