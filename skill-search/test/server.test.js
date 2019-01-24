const request = require('supertest')
const databaseHelper = require('./databaseHelper')

describe('server', () => {
  let server

  beforeAll(() => {
    databaseHelper.create()
  })

  afterAll(() => {
    databaseHelper.destroy()
  })

  beforeEach(() => {
    server = require('../src/server')
  })

  afterEach(() => {
    server.close()
  })

  describe('GET /', () => {
    test('returns 200 status code', () => {
      return request(server).get('/').expect(200)
    })

    test('returns the title of the app', () => {
      return request(server).get('/').expect('skill-search api')
    })
  })

  describe('GET /users?skill=skill name', () => {
    test('returns an array of names for a known skill (javascript)', () => {
      return request(server).get('/users?skill=javascript')
        .expect(['rdavis', 'amathews'])
    })

    test.skip('returns an array of names for a known skill (c#)', () => {
      // TODO: handle unsafe characters
      return request(server).get('/users?skill=c#')
        .expect(['adelosreyes'])
    })

    test('returns an empty array an unknown skill', () => {
      return request(server).get('/users?skill=globbing')
        .expect([])
    })
  })
})
