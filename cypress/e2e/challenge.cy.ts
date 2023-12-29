import challenge from "../fixtures/challenge.json";

describe("Challenge", () => {
  it("Should verify view page", () => {
    cy.intercept("api/generate-sentences", {
      statusCode: 200,
      body: challenge,
      headers: { "access-control-allow-origin": "*" },
      delay: 500,
    }).as("getChallenge");

    cy.visit("/challenge/present");

    cy.get("h1").contains("Loading...");
    cy.wait("@getChallenge");

    cy.get("[data-cy=skip]").contains("Skip");
    cy.get("[data-cy=check]").contains("Check");
  });

  it("Should generate correct sentence.", () => {
    cy.intercept("api/generate-sentences", {
      statusCode: 200,
      body: challenge,
      headers: { "access-control-allow-origin": "*" },
      delay: 500,
    }).as("getChallenge");

    cy.visit("/challenge/present");

    cy.get("h1").contains("Loading...");
    cy.wait("@getChallenge");

    cy.get("[data-cy=sentence]").then((sentence) => {
      const sentenceText = sentence.text();
      const separatedSentence = sentenceText.split(" ");

      // separatedSentence.forEach((word) => {
      //   cy.get(`[data-cy=${word}]`).contains(word).click();
      // });
    });
  });
});
