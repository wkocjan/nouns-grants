import { getChain } from "@/lib/viem/client"
import { createWalletClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { base, mainnet } from "viem/chains"

export function getRevealVotesWalletClient(chainId: number) {
  if (!process.env.REVEAL_VOTES_PK) {
    throw new Error("REVEAL_VOTES_PK is not set in the environment variables")
  }

  const account = privateKeyToAccount(process.env.REVEAL_VOTES_PK as `0x${string}`)

  const client = createWalletClient({
    account,
    chain: getChain(chainId),
    transport: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
  })

  return client
}
