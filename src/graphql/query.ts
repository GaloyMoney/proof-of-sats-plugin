import { createProof } from "proof-of-liabilities"
import { tree } from "./helper"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"

// import { readFileSync } from "fs"
// const tree = JSON.parse(readFileSync("/home/vaibhav/Desktop/tree.json", "utf8"))

// Also tested it using a tree.json file. Works the same way as expected.

// const typeDefs = gql`
//   type LiabilityProof {
//     accountId: String!
//     partialLiabilityProofs: String!
//     totalBalance: Int!
//   }

//   type Query {
//     liabilityProof(accountId: ID!): LiabilityProof!
//   }
// `

const Proof = GT.Field({
  type: LiabilityProof,
  args: {
    accountId: { type: GT.NonNull(GT.String) },
  },
  resolve: async (parent, args, context, info) => {
    const { accountId } = args
    const proof = await createProof(accountId, tree)
    return {
      accountId,
      partialLiabilityProofs: JSON.stringify(proof),
      totalBalance: proof.totalBalance,
    }
  },
})

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: Proof,
  }),
})

// For now I serialized the partialLiabilityProofs cause it looked a much better alternative.
// We can deserialize it on the frontend and serve it to the user in the expected format.
// Also for now the proof-of-liability library is not published on npm. So to test this out we need to use the library locally.
// Some accountId's to test it. ("659b8ec0-89af-40c7-9c4f-2749ff84b6a6","dc0cd8b9-af79-421e-839f-c73c6c019f1e","b962796c-0a28-4429-8498-2cabee182130", "ac9871fa-9868-4765-be02-8a754ad5ca5a")
// The accountId refers to the walletIds of the user's.
//  This was done since initially I developed the library keeping in mind that the balance are linked to the accountId
// instead of the walletIds.

// const resolvers = {
//   Query: {
//     liabilityProof: async (_, args: any) => {
//       const liabilityProof = await createProof(args.accountId, tree)
//       return {
//         accountId: liabilityProof.accountId,
//         partialLiabilityProofs: JSON.stringify(liabilityProof.partialLiabilityProofs),
//         totalBalance: liabilityProof.totalBalance,
//       }
//     },
//   },
// }

// type PartialLiabilityProof {
//   merklePath: [MerklePath]!
//   idx: Int!
//   balance: Int!
// }
// type MerklePath {
//   node: TreeNode!
//   index: Int!
// }
// type TreeNode {
//   hash: String!
//   sum: Int!
// }
