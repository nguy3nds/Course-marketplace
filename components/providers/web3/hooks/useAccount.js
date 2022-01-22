import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0x70c3670731446bf49350e6db9f3183e02d1d1c70466b33f5504ca6ad3a277b23": true
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
    const mutator = accounts => mutate(accounts[0] ?? null)

    provider && provider.on("accountsChanged", mutator)

    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }

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