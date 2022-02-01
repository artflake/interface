import { isAddress } from "../../utils";

/**
 * Token instances created from token info on a token list.
 */
export class WrappedTokenInfo {
  constructor(tokenInfo, list) {
    this.isNative = false;
    this.isToken = true;
    this.list = void 0;
    this.tokenInfo = void 0;
    this._checksummedAddress = null;
    this._tags = null;
    this.tokenInfo = tokenInfo;
    this.list = list;
  }

  get address() {
    if (this._checksummedAddress) return this._checksummedAddress;
    const checksummedAddress = isAddress(this.tokenInfo.address);
    if (!checksummedAddress) throw new Error(`Invalid token address: ${this.tokenInfo.address}`);
    return this._checksummedAddress = checksummedAddress;
  }

  get chainId() {
    return this.tokenInfo.chainId;
  }

  get decimals() {
    return this.tokenInfo.decimals;
  }

  get name() {
    return this.tokenInfo.name;
  }

  get symbol() {
    return this.tokenInfo.symbol;
  }

  get logoURI() {
    return this.tokenInfo.logoURI;
  }

  get tags() {
    if (this._tags !== null) return this._tags;
    if (!this.tokenInfo.tags) return this._tags = [];
    const listTags = this.list.tags;
    if (!listTags) return this._tags = [];
    return this._tags = this.tokenInfo.tags.map(tagId => {
      return { ...listTags[tagId],
        id: tagId
      };
    });
  }

  equals(other) {
    return other.chainId === this.chainId && other.isToken && other.address.toLowerCase() === this.address.toLowerCase();
  }

  sortsBefore(other) {
    if (this.equals(other)) throw new Error('Addresses should not be equal');
    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  get wrapped() {
    return this;
  }

}