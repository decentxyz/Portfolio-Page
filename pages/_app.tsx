import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";

//make sure you are including the correct chain for your contract here in the rainbowkit config
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "false"
      ? []
      : []),
  ],
  [
    alchemyProvider({
      apiKey: '0jEGdrOL9bPX8YEcylQIuYm6cgObvmHo',
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Decent Minting Page',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme({
            accentColor: '#9969FF',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })} chains={chains} showRecentTransactions={true}>
        <ToastContainer />
        <Analytics />
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
