describe('Blog app', function() {
  beforeEach(function() {
    const user = {
      username: 'user123',
      name: 'User',
      password: 'pass123'
    };
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user123');
      cy.get('#password').type('pass123');
      cy.get('button').click();

      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('User logged in!');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user123');
      cy.get('#password').type('wrong');
      cy.get('button').click();

      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'user123',
        password: 'pass123'
      });
    });

    it('A blog can be created', function() {
      cy.contains('create new blog').click();
      cy.get('#blog-title').type('test blog');
      cy.get('#blog-author').type('test author');
      cy.get('#blog-url').type('test url');
      cy.get('#blog-create').click();

      cy.contains('test blog');
      cy.contains('view').click();
      cy.contains('test author');
      cy.contains('test url');
    });

    describe('Interacting with created blog', function() {
      beforeEach(function() {
        const user = JSON.parse(window.localStorage.getItem('loggedBlogListUser'));
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          headers: {
            'Authorization': `bearer ${user.token}`
          },
          body: {
            title: 'test blog',
            author: 'test author',
            url: 'test url',
          }
        });
        cy.visit('http://localhost:3000');
      });

      it('A blog can be liked', function() {
        cy.contains('test blog');
        cy.contains('view').click();
        cy.contains('like').click().click();

        cy.get('#likes-counter').contains(2);
      });

      it('A blog can be deleted by its creator', function() {
        cy.contains('test blog');
        cy.contains('view').click();
        cy.contains('remove').click();

        cy.get('html').should('not.contain', 'test blog');
      });

      it('A blog cant be deleted by user other than its creator', function() {
        const user = {
          username: 'user321',
          name: 'User2',
          password: 'pass321'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.login({
          username: 'user321',
          password: 'pass321'
        });

        cy.contains('view').click();
        cy.contains('remove').click();

        cy.contains('Request failed with status code 401');
      });
    });

    describe('checking order of rendered blogs', function() {
      beforeEach(function() {
        const user = JSON.parse(window.localStorage.getItem('loggedBlogListUser'));
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          headers: {
            'Authorization': `bearer ${user.token}`
          },
          body: {
            title: 'test blog1',
            author: 'test author1',
            url: 'test url1',
            likes: 1
          }
        });
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          headers: {
            'Authorization': `bearer ${user.token}`
          },
          body: {
            title: 'test blog2',
            author: 'test author2',
            url: 'test url2',
            likes: 2
          }
        });
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          headers: {
            'Authorization': `bearer ${user.token}`
          },
          body: {
            title: 'test blog3',
            author: 'test author3',
            url: 'test url3',
            likes: 3
          }
        });
        cy.visit('http://localhost:3000');
      });

      it('blog with most likes is listed first', function() {
        cy.contains('view').click();

        cy.get('#likes-counter').contains(3);
      });
    });
  });
});