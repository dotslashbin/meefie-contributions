export const formatBalance = (rawBalance: string) => (parseInt(rawBalance) / 1000000000000000000).toFixed(2)

export const formatChainAsNum = (chainIdHex: string) => parseInt(chainIdHex)

export const formatAddress = (addr: string | undefined) => `${addr?.substring(0, 8)}...${addr?.substring(addr?.length-5)}`