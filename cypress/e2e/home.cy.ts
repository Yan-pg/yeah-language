import challenge from "../fixtures/challenge.json";

describe("Navigate to challenge", () => {
  it("Should list challenges", () => {
    cy.visit("/");
    cy.intercept("api/generate-sentences", {
      statusCode: 200,
      body: challenge,
      headers: { "access-control-allow-origin": "*" },
      delay: 500,
    }).as("getChallenge");

    cy.get('a[href="/challenge/present"]').first().click();
    cy.location("pathname").should("include", "/challenge/present");
    cy.get("h1").contains("Loading...");
    cy.wait("@getChallenge");
    cy.get("[data-cy=skip]").contains("Skip");
    cy.get("[data-cy=check]").contains("Check");
  });
});
