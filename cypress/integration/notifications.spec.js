// extend cy commands with same commands as from react-testing-library: findByText, findByLabel etc.
import "@testing-library/cypress/add-commands";
import feed from "../fixtures/feed.json";

describe("Notifications application", function() {
  it("shows a message if a user has no new notifications", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/feed",
      response: []
    });

    cy.visit("http://localhost:3000");

    // example of using commands like in React Testing Library
    cy.findByText("You have no new notification(s)").should("exist");
  });

  it("changes notifications title when it is liked", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/feed",
      response: feed
    }).as("getFeed");

    cy.visit("http://localhost:3000");

    cy.wait("@getFeed").then(() => {
      cy.findByTestId("notification-id-1").should("not.contain", "[Liked]");

      cy.findByTestId("notification-id-1")
        .findByText("Like")
        .click();

      cy.findByTestId("notification-id-1").should("contain", "[Liked]");
    });
  });
});
