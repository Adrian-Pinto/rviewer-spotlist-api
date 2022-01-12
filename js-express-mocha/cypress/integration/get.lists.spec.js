const apiUrl = `${Cypress.env("apiUrl")}`
import users from '../../../data/users.json';

describe('Get Lists from User Spec', () => {

    const userOwner = users[1]
    const userNotOwner = users[2]
    const basePath = `/users/${userOwner['id']}/lists`

    const addSongsPayload = {
        list: {
            songs: [
                {
                    artist: "i'm the artist",
                    title: "this is my title"
                }
            ]
        }
    }

    it('should return a list of songs if userOwner is the owner', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${apiUrl}${basePath}`,
            auth: {
                user: userOwner['name'],
                password: userOwner['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should return 401 if not owner of that list', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${apiUrl}${basePath}`,
            auth: {
                user: userNotOwner['name'],
                password: userNotOwner['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('should return 401 if the user id does not exist', () => {
        const basePath = '/users/fake/lists'

        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${apiUrl}${basePath}`,
            auth: {
                user: userNotOwner['name'],
                password: userNotOwner['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('should contain the inserted song on the list', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${basePath}`,
            body: addSongsPayload,
            auth: {
                user: userOwner['name'],
                password: userOwner['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            addSongsPayload.list.listId = response.body.listId
        })

        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${apiUrl}${basePath}`,
            auth: {
                user: userOwner['name'],
                password: userOwner['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.map(x => x.listId)).to.contain(addSongsPayload.list.listId)
            expect(response.body.map(x => x.songs)).to.deep.contain(addSongsPayload.list.songs)
        })
    })

})
