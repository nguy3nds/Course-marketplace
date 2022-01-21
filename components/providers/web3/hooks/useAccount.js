import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0xf8f0976c669a3cd7cfe1a67c9a93ab68296d5da81caf28f511e5b1ed14bfaf2d": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()

      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retrieve an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    provider && provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [provider])

  return {
    data,
    isAdmin: (
      data &&
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}