import MainPage from "./MainPage";

class ArticlePage {

    delete() {
        cy.get('.article-page button').first().find('i').click();
        cy.wait(500);
        return new MainPage();
    }
}

export default ArticlePage;