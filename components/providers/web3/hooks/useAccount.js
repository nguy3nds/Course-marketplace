import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0x563a803a0991e8b4593ead7fe0332a62fd55fdf59eb2668dd61e6effb84fb9cc": true
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