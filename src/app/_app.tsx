import React from 'react';
import { AppProps } from 'next/app';

// NOTE : This is a temporary fix for the issue described here: https://github.com/TanStack/table/issues/3830#issuecomment-1101012448
//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;