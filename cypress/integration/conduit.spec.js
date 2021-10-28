import MainPage from "../support/page_objects/MainPage";

describe('Conduit Test', function () {
        const username = 'bshchurko';
        const email = 'bshchurko@gmail.com';
        const password = 'qwerty';

        after("Clean up", function () {
            cy.exec('mongo conduit --eval "db.dropDatabase()"');
        });

        describe('Registration', function () {

            afterEach('Delete user', function () {
                cy.task('deleteUser', {username: username, email: email})
            });

            it('can be performed for new user', function () {
                let mainPage = new MainPage().open();
                const signUpPage = mainPage.clickSignUpButton();
                mainPage = signUpPage.setUsername(username)
                    .setEmail(email)
                    .setPassword(password)
                    .clickSignUpButton();

                mainPage.getMenuItems().should((list) => {
                    expect(list).to.have.length(4);
                    expect(list.eq(3)).to.have.text(username);
                })
            });
        });

        describe('Article', function () {

            before('Create new user', function () {
                cy.task('createUser', {username: username, email: email, password: password});
            });

            after('Delete user', function () {
                cy.task('deleteUser', {username: username, email: email})
            });

            it('can be added', function () {
                let mainPage = new MainPage().open();
                const signInPage = mainPage.clickSignInButton();
                const editorPage = signInPage.setEmail(email)
                    .setPassword(password)
                    .clickSignInButton()
                    .clickNewPostButton();

                const articleName = 'New article';
                const profilePage = editorPage.setArticleName(articleName)
                    .clickPublishArticleButton()
                    .clickProfileButton();

                profilePage.navigationTabs()
                    .first()
                    .should('have.class', 'active');

                profilePage.articles().should((articles) => {
                    expect(articles.eq(0).find('a h1')).text(articleName);
                })

            });

            it('can be deleted', function () {
                let mainPage = new MainPage().open()
                    .clickSignInButton()
                    .setEmail(email)
                    .setPassword(password)
                    .clickSignInButton();

                mainPage = mainPage.clickProfileButton()
                    .openFirstArticle()
                    .delete();

                mainPage.clickProfileButton()
                    .articles()
                    .first()
                    .should('have.text', 'No articles are here... yet.');
            })
        })
    }
);