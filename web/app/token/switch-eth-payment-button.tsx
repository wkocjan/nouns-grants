import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { BaseEthLogo } from "./base-eth-logo"
import { CurrencyDisplay } from "./currency-display"
import Image from "next/image"
import { TokenLogo } from "./token-logo"
import Caret from "@/public/caret-down.svg"
import { TokenBalance } from "./token-balance"
import { useAccount, useBalance } from "wagmi"
import { base, mainnet } from "viem/chains"

export const SwitchEthChainButton = ({
  switchChain,
}: {
  switchChain: (chainId: number) => void
}) => {
  const { address } = useAccount()

  const { data: baseEthBalance } = useBalance({
    chainId: base.id,
    address,
  })
  const { data: ethBalance } = useBalance({
    chainId: mainnet.id,
    address,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex-shrink-0">
          <CurrencyDisplay className="cursor-pointer py-0.5">
            <BaseEthLogo />
            <span className="pr-1">ETH</span>
            <Image
              src={Caret}
              alt="Caret"
              className="mt-0.5 h-2 w-auto pr-1 text-black dark:text-white"
            />
          </CurrencyDisplay>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <ChainMenuItem
          onClick={() => switchChain(mainnet.id)}
          logoChild={<TokenLogo className="mr-4" width={30} height={30} src="/eth.png" alt="ETH" />}
          chainName="Ethereum"
          balance={ethBalance?.value || BigInt(0)}
        />
        <ChainMenuItem
          onClick={() => switchChain(base.id)}
          logoChild={<BaseEthLogo className="mr-2" width={30} height={30} />}
          chainName="Base"
          balance={baseEthBalance?.value || BigInt(0)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ChainMenuItemProps {
  logoChild: React.ReactNode
  chainName: string
  balance: bigint
  onClick: () => void
}

const ChainMenuItem: React.FC<ChainMenuItemProps> = ({
  logoChild,
  chainName,
  balance,
  onClick,
}) => (
  <DropdownMenuItem asChild onClick={onClick}>
    <div className="flex cursor-pointer items-center px-4 py-3">
      {logoChild}
      <div className="flex flex-col">
        <span className="font-medium">{chainName}</span>
        <TokenBalance balance={balance} />
      </div>
    </div>
  </DropdownMenuItem>
)
