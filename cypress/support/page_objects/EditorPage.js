import MainPage from "./MainPage";

class EditorPage {

    setArticleName(articleName) {
        cy.get('.editor-page input').first().type(articleName);
        return this;
    }

    clickPublishArticleButton() {
        cy.get('.editor-page button').click();
        cy.wait(1000);
        return new MainPage();
    }
}

export default EditorPage;