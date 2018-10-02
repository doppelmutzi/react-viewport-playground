// https://caniuse.com/#feat=getboundingclientrect
// x and y is not supported everywhere, instead use left and top

const getViewportHeight = () => {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};

const getViewportWidth = () => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

export const isElementVerticallyInViewport = (element, percentInViewport) => {
  const viewportHeight = getViewportHeight();
  const { height, bottom, top } = element.getBoundingClientRect();
  const isElementAboveViewport = bottom <= 0;
  if (isElementAboveViewport) {
    return false;
  }
  const isElementBelowViewport = top >= viewportHeight;
  if (isElementBelowViewport) {
    return false;
  }
  // element is (partly) inside viewport
  const thresholdPxInViewport = height * percentInViewport;
  const pxAboveViewport = top < 0 ? top * -1 : 0;
  const pxBelowViewport = bottom > viewportHeight ? bottom - viewportHeight : 0;
  const pxInViewport = height - pxAboveViewport - pxBelowViewport;
  return pxInViewport >= thresholdPxInViewport;
};

export const isElementHorizontallyInViewport = (element, percentInViewport) => {
  const viewportWidth = getViewportWidth();
  const { width, left, right } = element.getBoundingClientRect();
  const isElementLeftOfViewport = right <= 0;
  if (isElementLeftOfViewport) {
    return false;
  }
  const isElementRightOfViewport = left >= viewportWidth;
  if (isElementRightOfViewport) {
    return false;
  }
  // element is (partly) inside viewport
  const thresholdPxInViewport = width * percentInViewport;
  const pxLeftToViewport = left < 0 ? left * -1 : 0;
  const pxRightToViewport = right > viewportWidth ? right - viewportWidth : 0;
  const pxInViewport = width - pxLeftToViewport - pxRightToViewport;
  return pxInViewport >= thresholdPxInViewport;
};
