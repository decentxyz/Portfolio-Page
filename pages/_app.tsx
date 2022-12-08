import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Navbar from '../components/Navbar/Navbar';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "false"
      ? [chain.goerli]
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
  appName: 'Start Decent',
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
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
