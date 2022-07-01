const baseUser = {
  name: 'root',
  username: 'root',
  password: 'root',
}

const otherUser = {
  name: 'Marcelo Suarez',
  username: 'amsuarez99',
  password: 'quesadilla123',
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://127.0.0.1:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', baseUser)
    cy.request('POST', 'http://localhost:3000/api/users', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('Can login with existing user', function () {
    cy.contains('username').type(baseUser.username)
    cy.contains('password').type(baseUser.password)
    cy.contains('Login').click()

    cy.contains(`${baseUser.name} logged in`)
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: baseUser.username, password: baseUser.password })
    })

    const posts = [
      {
        title: 'New Post 1',
        author: 'Marcelo Suarez',
        url: 'newpost.com/1',
        likes: 3,
      },
      {
        title: 'New Post 2',
        author: 'Marcelo Suarez',
        url: 'newpost.com/2',
        likes: 1,
      },
      {
        title: 'New Post 3',
        author: 'Marcelo Suarez',
        url: 'newpost.com/3',
        likes: 2,
      },
    ]

    it('a blog can be created', function () {
      function createPost(post) {
        cy.intercept('POST', '/api/blogs').as('postBlog')
        cy.contains('title')
          .find('input')
          .should('have.value', '')
          .type(post.title)
        cy.contains('author')
          .find('input')
          .should('have.value', '')
          .type(post.author)
        cy.contains('url').find('input').should('have.value', '').type(post.url)
        cy.get('button[type=submit]').click()
        cy.wait('@postBlog')
      }

      cy.contains('create post').click()
      posts.forEach(createPost)
      posts.forEach((post) => {
        cy.contains(post.title)
      })
    })

    describe('and you have existing', function () {
      beforeEach(function () {
        posts.forEach(cy.createPost)
        cy.loadBlogs()
      })

      it('you can view blog details', function () {
        posts.forEach(cy.expandBlog)
      })

      it('you can delete blogs that belong to you', function () {
        cy.on('window:confirm', () => true)

        posts.forEach((post) => {
          cy.intercept('DELETE', '/api/blogs/*').as('blogDelete')
          cy.contains(post.title).as('blog')
          cy.get('@blog').contains('view').click()
          cy.get('@blog').contains('delete').click()
          cy.wait('@blogDelete')
        })

        posts.forEach((post) => {
          cy.get('.blogs').contains(post.title).should('not.exist')
        })
      })

      // it('blogs are ordered by likes', function () {
      //   const orderedPosts = posts.sort((a, b) => b - a)
      //   orderedPosts.forEach(cy.expandBlog)
      //   orderedPosts.forEach(function (post, i) {
      //     cy.get('.blog').eq(i).should('contain', post.title)
      //   })
      // })
    })

    describe('and blogs that arent yours exist', function () {
      beforeEach(function () {
        posts.forEach((post) => cy.createPostWithUser(post, otherUser))
        cy.loadBlogs()
      })

      it('you cant delete them', function () {
        posts.forEach((blog) => {
          cy.contains(blog.title).as('blog')
          cy.get('@blog').contains('view').click()
          cy.get('@blog').contains('delete').should('not.exist')
        })
      })

      it('you can increment likes', function () {
        cy.intercept('PUT', '/api/blogs/like/*').as('likeBlog')
        posts.forEach((blog) => {
          cy.contains(blog.title).as('blog')
          cy.get('@blog').contains('view').click()
          cy.get('@blog').contains('like').click()
          cy.get('@blog').contains('like').click()
          cy.get('@blog').contains('like').click()
          cy.wait('@likeBlog')
          cy.get('@blog').contains(`likes ${blog.likes + 3}`)
        })
      })

      it('blogs are ordered by likes', () => {
        const orderedPosts = posts.sort((a, b) => b.likes - a.likes)
        orderedPosts.forEach(cy.expandBlog)
        orderedPosts.forEach(function (post, i) {
          cy.get('.blog').eq(i).should('contain', post.title)
        })
      })
    })
  })

  it("Can't login with inexisting users", function () {
    cy.contains('username').type('test')
    cy.contains('password').type('test')
    cy.contains('Login').click()

    cy.contains('Could not log in')
  })
})
