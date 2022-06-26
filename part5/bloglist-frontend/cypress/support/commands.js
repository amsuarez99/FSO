// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'http://localhost:3000/api/login', user).then(
    (returnedUser) => {
      console.log('returnedUser', returnedUser.body)
      window.localStorage.setItem('blogUser', JSON.stringify(returnedUser.body))
      cy.visit('http://localhost:3000')
    }
  )
})

Cypress.Commands.add('createPost', (post) => {
  const user = JSON.parse(window.localStorage.getItem('blogUser'))
  cy.request({
    method: 'POST',
    url: '/api/blogs',
    headers: {
      authorization: `Bearer ${user.token}`,
    },
    body: post,
  })
})

Cypress.Commands.add('createPostWithUser', (post, otherUser) => {
  cy.request('POST', 'http://localhost:3000/api/login', otherUser).then(
    (response) => {
      cy.request({
        method: 'POST',
        url: '/api/blogs',
        headers: {
          authorization: `Bearer ${response.body.token}`,
        },
        body: post,
      })
    }
  )
})

Cypress.Commands.add('loadBlogs', () => {
  cy.visit('http://localhost:3000')
  cy.intercept('GET', '/api/blogs').as('blogs')
  cy.wait('@blogs')
})

Cypress.Commands.add('expandBlog', (blog) => {
  cy.contains(blog.title).as('blog')
  cy.get('@blog').contains('view').click()
  cy.get('@blog').contains(blog.url)
  cy.get('@blog').contains(blog.author)
  cy.get('@blog').contains(`likes ${blog.likes}`)
  cy.get('@blog').contains('hide').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
