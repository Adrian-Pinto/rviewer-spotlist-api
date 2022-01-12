const apiUrl = `${Cypress.env("apiUrl")}`
import users from '../../../data/users.json';

describe('Add Songs to List Spec', () => {

    const user = users[1]
    const addListBasePath = `/users/${user['id']}/lists`
    let listId
    let addSongBasePath

    const addListsPayload = {
        list: {
            songs: [
                {
                    artist: "artist1",
                    title : "title1"
                },
                {
                    artist: "artist2",
                    title: "title2"
                }
            ]
        }
    }

    const addSongPayload = {
        song: {
            artist: "artistname",
            title: "songtitle"
        }
    }

    before(() => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${addListBasePath}`,
            body: addListsPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            listId = response.body.listId
            addSongBasePath = `/users/${user['id']}/lists/${listId}/songs`
        })
    })

    it('should add a song to an existing list', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${addSongBasePath}`,
            body: addSongPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.deep.equal(addSongPayload.song)
        })
    })

    it('should throw 400 if list id does not exist', () => {
        const randomListIdBasePath = `/users/${user['id']}/lists/1111111/songs`

        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${randomListIdBasePath}`,
            body: addSongPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('should throw 401 if user does not have permissions to the list', () => {
        const nonOwnerUser = users[2]

        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${addSongBasePath}`,
            body: addSongPayload,
            auth: {
                user: nonOwnerUser['name'],
                password: nonOwnerUser['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('should throw 401 if user does not exist', () => {
        const user = users[0]

        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${addSongBasePath}`,
            body: addSongPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })
})
