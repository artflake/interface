export let VoteOption;

(function (VoteOption) {
  VoteOption[VoteOption["Against"] = 0] = "Against";
  VoteOption[VoteOption["For"] = 1] = "For";
  VoteOption[VoteOption["Abstain"] = 2] = "Abstain";
})(VoteOption || (VoteOption = {}));