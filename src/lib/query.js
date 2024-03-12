export const getPlayer = `
    query {
        player(uuid: "%%UUID%%") {
            username
            ranks
            lastJoin
            firstJoin
            status {
                online
                server {
                    category
                    associatedGame
                    id
                }
            }
            party {
                leader {
                    uuid
                    username
                    ranks
                }
                members {
                    uuid
                    username
                    ranks
                }
            }
            friends {
                uuid
                username
                ranks
                status {
                    online
                }
            }
            currency {
                coins
                gems
                silver
                materialDust
            }
        }
    }
`;