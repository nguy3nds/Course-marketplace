import { handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork } from "./useNetwork";
import { handler as createOwnedCoursesHook } from "./useOwnedCourses"

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createUseNetwork(web3, provider),
    useOwnedCourses: createOwnedCoursesHook(web3, contract)
  }
}