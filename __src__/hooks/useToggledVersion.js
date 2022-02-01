import useParsedQueryString from "./useParsedQueryString";
export let Version;

(function (Version) {
  Version["v2"] = "V2";
  Version["v3"] = "V3";
})(Version || (Version = {}));

export default function useToggledVersion() {
  const {
    use
  } = useParsedQueryString();

  if (typeof use !== 'string') {
    return undefined;
  }

  switch (use.toLowerCase()) {
    case 'v2':
      return Version.v2;

    case 'v3':
      return Version.v3;

    default:
      return undefined;
  }
}