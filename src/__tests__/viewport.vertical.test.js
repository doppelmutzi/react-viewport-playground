import { isElementVerticallyInViewport } from "../viewport";

describe("isElementVerticallyInViewport", () => {
  let baseElement;
  let percentInViewport;

  beforeEach(() => {
    global.innerHeight = 400;
    baseElement = document.createElement("li");
    percentInViewport = 0.25;
  });
  test("isElementVerticallyInViewport with element above viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: -200,
        bottom: -100
      };
    });
    expect(
      isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("isElementVerticallyInViewport with element below viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: 500,
        bottom: 600
      };
    });
    expect(
      isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("isElementVerticallyInViewport with element completely inside viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: 100,
        bottom: 200
      };
    });
    expect(
      isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("isElementVerticallyInViewport with element more than 25% inside viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 600,
        top: -100,
        bottom: 500
      };
    });
    expect(
      isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("isElementVerticallyInViewport with element overlapping with viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 600,
        top: -100,
        bottom: 500
      };
    });
    expect(isElementVerticallyInViewport(baseElement, 1)).toBeFalsy();
  });
});
