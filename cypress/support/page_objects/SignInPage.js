import MainPage from "./MainPage";

class SignInPage {

    setEmail(email) {
        cy.get('.auth-page input[type="email"]').type(email);
        return this;

    }

    setPassword(password) {
        cy.get('.auth-page input[type="password"]').type(password);
        return this;
    };

    clickSignInButton() {
        cy.get('.auth-page button').click();
        cy.wait(1000);
        return new MainPage();
    }
}

export default SignInPage;