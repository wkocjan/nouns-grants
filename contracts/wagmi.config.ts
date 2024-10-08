import { defineConfig, loadEnv } from "@wagmi/cli"
import { etherscan } from "@wagmi/cli/plugins"
import { base, mainnet } from "./addresses"

const mainnetContracts = [{ name: "nounsToken", address: mainnet.NounsToken }]

const baseContracts = [
  { name: "nounsFlowImpl", address: base.NounsFlowImpl },
  { name: "nounsFlow", address: base.NounsFlow },

  { name: "flowTcrImpl", address: base.FlowTCRImpl },
  { name: "flowTcr", address: base.FlowTCR },

  { name: "erc20VotesArbitratorImpl", address: base.ERC20VotesArbitratorImpl },
  { name: "erc20VotesArbitrator", address: base.ERC20VotesArbitrator },

  { name: "erc20VotesMintableImpl", address: base.ERC20VotesMintableImpl },
  { name: "erc20VotesMintable", address: base.ERC20VotesMintable },

  { name: "tcrFactoryImpl", address: base.TCRFactoryImpl },
  { name: "tcrFactory", address: base.TCRFactory },

  { name: "tokenEmitterImpl", address: base.TokenEmitterImpl },
  { name: "tokenEmitter", address: base.TokenEmitter },

  { name: "rewardPoolImpl", address: base.RewardPoolImpl },
  { name: "rewardPool", address: base.RewardPool },

  { name: "superToken", address: "0xeb796bdb90ffa0f28255275e16936d25d3418603" as `0x${string}` },

  {
    name: "gdav1Forwarder",
    address: "0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08" as `0x${string}`,
  },
]

export default defineConfig(() => {
  const env = loadEnv({ mode: process.env.NODE_ENV, envDir: process.cwd() })

  return {
    out: "src/generated.ts",
    contracts: [],
    plugins: [
      etherscan({ apiKey: env.ETHERSCAN_API_KEY, chainId: 1, contracts: mainnetContracts }),
      etherscan({ apiKey: env.BASESCAN_API_KEY, chainId: 8453, contracts: baseContracts }),
    ],
  }
})
