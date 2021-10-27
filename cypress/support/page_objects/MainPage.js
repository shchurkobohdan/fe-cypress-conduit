import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import EditorPage from "./EditorPage";
import ProfilePage from "./ProfilePage";

class MainPage {

    open() {
        cy.visit('/');
        return this;
    }

    newPostButton() {
        return cy.get('.navbar .nav-item [href="/editor"]');
    }

    signInButton() {
        return cy.get('a[href="/login"]')
    }

    signUpButton() {
        return cy.get('a[href="/register"]');
    }

    clickSignInButton() {
        this.signInButton().click();
        return new SignInPage();
    }

    clickSignUpButton() {
        this.signUpButton().click();
        return new SignUpPage();
    }

    getMenuItems() {
        return cy.get('.navbar .nav-item');
    }

    clickProfileButton() {
        this.getMenuItems().last().click();
        return new ProfilePage();
    }

    clickNewPostButton(){
        this.newPostButton().click();
        return new EditorPage();
    }

    clickGlobalFeedTab() {
        cy.get('nav-pills li').last().click();
        return this;
    }
}

export default MainPage;