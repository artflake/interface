import { useActiveWeb3React } from "../../hooks/web3";
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { getCLS, getFCP, getFID, getLCP } from 'web-vitals';

function reportWebVitals(_ref) {
  let {
    name,
    delta,
    id
  } = _ref;
  ReactGA.timing({
    category: 'Web Vitals',
    variable: name,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    label: id
  });
} // tracks web vitals and pageviews


export default function GoogleAnalyticsReporter(_ref2) {
  let {
    location: {
      pathname,
      search
    }
  } = _ref2;
  useEffect(() => {
    getFCP(reportWebVitals);
    getFID(reportWebVitals);
    getLCP(reportWebVitals);
    getCLS(reportWebVitals);
  }, []);
  const {
    chainId
  } = useActiveWeb3React();
  useEffect(() => {
    // cd1 - custom dimension 1 - chainId
    ReactGA.set({
      cd1: chainId !== null && chainId !== void 0 ? chainId : 0
    });
  }, [chainId]);
  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`);
  }, [pathname, search]);
  return null;
}