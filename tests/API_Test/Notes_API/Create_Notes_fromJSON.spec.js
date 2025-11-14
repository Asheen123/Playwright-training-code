import { test, expect } from '@playwright/test'
import { AccessToken } from './BaseTest'
import notes from '../TestData/Create_Notes.json'   // Import JSON directly

test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  let token

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("testing@abc.com", "test1234", request)
    expect(token).toBeTruthy()
  })

  notes.forEach((note, index) => {
    test(`POST Request - Create Note ${index + 1}: ${note.title}`, async ({ request }) => {
      const response = await request.post(`${baseUrl}/notes/api/notes`, {
        headers: {
          'x-auth-token': token,
        },
        data: note,
      })

      const responseBody = await response.json()
      console.log(responseBody)

      expect(response.status()).toBe(200)
      expect(responseBody.message).toBe('Note successfully created')
      expect(responseBody.data.title).toBe(note.title)
    })
  })
})