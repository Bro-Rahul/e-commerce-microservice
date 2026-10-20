const gateWayURL = undefined

export const baseURL = {
    userBaseURL: gateWayURL ?? "http://localhost:8080/user",
    catalogBaseUrl: gateWayURL ?? "http://localhost:8081/catalog",
    inventoryBaseURL: gateWayURL ?? "http://localhost:8082/inventory",
    searchBaseUrl: gateWayURL ?? "http://localhost:8083/search",
    assetsBaseURL: gateWayURL ?? "http://localhost:8081/catalog",
    gateWayURL
}