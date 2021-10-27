import ArticlePage from "./ArticlePage";

class ProfilePage {

    navigationTabs() {
        return cy.get('.profile-page .nav-pills a')
    }

    articles() {
        return cy.get('.article-preview');
    }

    openFirstArticle() {
        const article = this.articles().first();
        article.should('not.to.have.text', 'Loading...')
        article.click();
        cy.wait(1000);
        return new ArticlePage();
    }
}

export default ProfilePage;