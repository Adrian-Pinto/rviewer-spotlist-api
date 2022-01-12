const apiUrl = `${Cypress.env("apiUrl")}`
import users from '../../../data/users.json';

describe('Create List Spec', () => {

    const user = users[1]
    const basePath = `/users/${user['id']}/lists`

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

    it('should create a list with valid object', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${basePath}`,
            body: addListsPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('listId')
            expect(response.body.songs).to.deep.equal(addListsPayload.list.songs)
        })
    })

    it('should give a 400 with invalid params', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${basePath}`,
            body: {},
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('should give a 401 with non-authorized user', () => {
        const fakeBasePath = '/users/1111/lists'
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${fakeBasePath}`,
            body: addListsPayload,
            auth: {
                user: user['name'],
                password: user['password'],
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('should give a 401 with non-existing user', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUrl}${basePath}`,
            body: addListsPayload,
            auth: {
                user: 'aaaa',
                password: 'bbbb',
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })
})
