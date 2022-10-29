import axios from "axios"

import { liabilityProofQuery, metadataQuery } from "../queries"

describe("graphql", () => {
  describe("treemetadata query", () => {
    it("should return a tree metadata", async () => {
      const {
        data: {
          data: { treeMetadata },
        },
      } = await axios.post("http://localhost:4004", { query: metadataQuery })

      expect(treeMetadata.roothash).toBeTruthy()
      expect(treeMetadata.totalBalance).toBeTruthy()
      expect(treeMetadata.dateCreated).toBeTruthy()
    })
  })
  describe("liabilityProof query", () => {
    it("should return a valid liability proof", async () => {
      const accountId = "123456789012"
      const {
        data: {
          data: {
            treeMetadata: { roothash },
          },
        },
      } = await axios.post("http://localhost:4004/", { query: metadataQuery })
      const {
        data: {
          data: { liabilityProof },
        },
      } = await axios.post("http://localhost:4004/", {
        query: liabilityProofQuery,
        variables: { accountId, roothash },
      })

      expect(liabilityProof.accountId).toBeTruthy()
      expect(liabilityProof.totalBalance).toBeTruthy()
      expect(liabilityProof.nonce).toBeTruthy()
      expect(liabilityProof.partialLiabilityProofs).toBeTruthy()
    })
  })
})
