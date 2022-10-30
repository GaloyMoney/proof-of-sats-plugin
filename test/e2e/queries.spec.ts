import fetch from "node-fetch"
import { liabilityProofQuery, metadataQuery } from "../queries"

const ServerUrl = "http://localhost:4004/"
let roothash: string
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
}

describe("graphql", () => {
  describe("treemetadata query", () => {
    it("should return a tree metadata", async () => {
      const metadataResponse = await fetch(ServerUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ query: metadataQuery }),
      })
      const {
        data: { treeMetadata },
      } = await metadataResponse.json()
      expect(treeMetadata.roothash).toBeTruthy()
      expect(treeMetadata.totalBalance).toBeTruthy()
      expect(treeMetadata.dateCreated).toBeTruthy()
      if (treeMetadata.roothash) roothash = treeMetadata.roothash
    })
  })

  describe("liabilityProof query", () => {
    it("should return a valid liability proof", async () => {
      const accountId = "123456789012"
      const liabilityProofResponse = await fetch(ServerUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: liabilityProofQuery,
          variables: { accountId, roothash },
        }),
      })
      const {
        data: { liabilityProof },
      } = await liabilityProofResponse.json()
      expect(liabilityProof.accountId).toBeTruthy()
      expect(liabilityProof.totalBalance).toBeTruthy()
      expect(liabilityProof.nonce).toBeTruthy()
      expect(liabilityProof.partialLiabilityProofs).toBeTruthy()
    })
  })
})
