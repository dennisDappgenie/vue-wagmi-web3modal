import { UseWagmiPlugin, configureChains, createConfig } from 'use-wagmi'
import { avalanche, goerli, mainnet, optimism } from 'use-wagmi/chains'

import { createWeb3Modal } from '@web3modal/wagmi/vue'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { publicProvider } from 'use-wagmi/providers/public'
import { InjectedConnector } from 'use-wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'use-wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'use-wagmi/connectors/walletConnect'

export default defineNuxtPlugin((nuxtApp) => {
  const projectId = 'cdbd18f9f96172be74c3e351ce99b908'

  const { chains, publicClient } = configureChains(
    [avalanche, goerli, mainnet, optimism],
    [walletConnectProvider({ projectId }), publicProvider()]
  )

  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
      new EIP6963Connector({ chains }),
      new InjectedConnector({ chains, options: { shimDisconnect: true } }),
      new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
    ],
    publicClient
  })

  // 3. Create modal
  createWeb3Modal({ wagmiConfig, projectId, chains })

  nuxtApp.vueApp.use(UseWagmiPlugin, wagmiConfig)
})