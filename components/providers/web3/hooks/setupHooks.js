import { handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork } from "./useNetwork";


export const setupHooks = (...decs) => {
  return {
    useAccount: createUseAccount(...decs),
    useNetwork: createUseNetwork(...decs),
  }
}