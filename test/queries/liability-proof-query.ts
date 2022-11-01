export const liabilityProofQuery = `
      query liabilityProof($accountId: String!, $roothash: String!) {
        liabilityProof(accountId: $accountId, roothash: $roothash) {
          accountId
          totalBalance
          nonce
          partialLiabilityProofs {
            idx
            balance
            merklePath {
              node {
                sum
                hash
              }
              index
            }
          }
        }
      }
    `
