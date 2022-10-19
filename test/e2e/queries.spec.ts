import { gql } from "apollo-server-core"
import { startServer, killServer, PID } from "../helpers/integration-server"
import axios from "axios"

jest.setTimeout(30000)

let serverPid: PID
beforeAll(async () => {
    const serverPid = await startServer("start")
    console.log(serverPid)
})

afterAll(async () => {
    await killServer(serverPid)
})

describe("graphql", () => {
    describe("treemetadata query", () => {
        it("should return a tree metadata", async () => {
            const query = gql`
            query treeMetadata{
                treeMetadata{
                    roothash
                    totalBalance
                    dateCreated
                }
            }`
            const { data } = await axios.post('http://localhost:4004/', { query })
            expect(data.roothash).toBeTruthy()
            expect(data.totalBalance).toBeTruthy()
            expect(data.dateCreated).toBeTruthy()
        })
    })
})
