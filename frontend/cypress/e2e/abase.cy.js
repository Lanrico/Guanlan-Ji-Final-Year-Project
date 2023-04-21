let trendingMovies;

describe("Base tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("The Home page", () => {
    it("displays the page header and 12 movies", () => {
      cy.get("h4").contains("What's popular");
      cy.get(".MuiImageListItemBar-title").should("have.length", 12);
    });

    it("displays the login block", () => {
      cy.get("h1").contains("Sign in");
    });
    it("displays the correct hyper links", () => {
      cy.get(".MuiBox-root>a").should("have.length", 6);
      cy.get(".MuiBox-root>a").eq(0).should("have.attr", "href", "/");
      cy.get(".MuiBox-root>a").eq(1).should("have.attr", "href", "/");
      cy.get(".MuiBox-root>a").eq(2).should("have.attr", "href", "/ranking/movie/1");
      cy.get(".MuiBox-root>a").eq(3).should("have.attr", "href", "/ranking/Movie/1/sort=popularity&order=desc&genres=&releasedate=to&language=&rate=0to10&runtime=0to400");
      cy.get(".MuiBox-root>a").eq(4).should("have.attr", "href", "/");
      cy.get(".MuiBox-root>a").eq(5).should("have.attr", "href", "/");
    });

    describe("navigations work well", () => {
      before(() => {
        cy.request("GET", "http://127.0.0.1:8080/api/media/top/popularity/movie?pageSize=12&page=0").then((response) => {
          trendingMovies = response.body.content;
          cy.log(trendingMovies)
        });
      });
      beforeEach(() => {
        cy.visit("/");
      });
      it("navigate to media detail page", () => {
        cy.get("a>li").eq(0).click();
        cy.url().should("include", `/movie/${trendingMovies[0].id}`);
      });
      it("navigate to login page", () => {
        // cy.wait(100);
        // cy.get("header>.MuiToolbar-root>a").eq(1).click();
        // cy.url().should("include", `/login`);
      });
      it("navigate to register page", () => {
        cy.get(".MuiToolbar-root>a").eq(2).click();
        cy.url().should("include", `/register`);
      });
      it("navigate back to the home page", () => {
        cy.get(".MuiToolbar-root>a").eq(2).click();
        cy.get(".MuiToolbar-root>a").eq(0).click();
        cy.url().should("include", `/`);
      });
    });
  })
  describe("Detailed media page", () => {
    beforeEach(() => {
      cy.visit(`/medias/movie/${trendingMovies[0].id}`);
      cy.request("GET", "http://127.0.0.1:8080/api/media/top/popularity/movie?pageSize=12&page=0").then((response) => {
        trendingMovies = response.body.content;
        cy.log(trendingMovies)
      });
    });
    it("shows the correct media", () => {
      cy.get("h6").eq(0).contains(trendingMovies[0].movie.title);;
    });
  });
});