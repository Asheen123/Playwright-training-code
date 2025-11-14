const { test, expect }= require('@playwright/test')

test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token
  var Id;

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
        data: {
         "email": "asheen@abc.com",
         "password": "welcome@20"
        },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200)
      expect(responseBody.data.token).toBeTruthy()
      token = responseBody.data.token
      console.log(token)
  })
  test('POST Request - Create Notes', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_Notes_API_for_Delete",
            description: "Done via API",
            category: "Work"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    Id=responseBody.data.id
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_Notes_API_for_Delete')
 
    })

    test('DELETE Request - Delete Notes', async ({ request }) => {

      const response = await request.delete(`${baseUrl}/notes/api/notes/${Id}`, {
  
          headers: {
            'x-auth-token': `${token}`,
          }
      })
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      expect(responseBody.message).toBe('Note successfully deleted')
      //expect(responseBody.data.title).toBe('Playwright_Notes_API_Updated-2')
   
      })
})