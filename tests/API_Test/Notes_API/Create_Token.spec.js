import { test, expect } from '@playwright/test'

test.describe('Create Token - API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'

    test('Login as an existing user', async ({ request }) => {

    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": "asheen@abc.com",
        "password": "welcome@20"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.message).toBe('Login successful')
    expect(responseBody.data.token).toBeTruthy()
    expect(responseBody.data.email).toBe('asheen@abc.com')
    const token = responseBody.data.token
    console.log(token)
    
  })
})