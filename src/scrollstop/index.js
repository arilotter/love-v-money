/**
 * Run functions after scrolling has stopped
 * @param  {Number} timeout How long to wait for new scrolls before firing the callback.
 * @param  {Function} callback The function to run after scrolling
 */
export default function scrollStop(timeout, callback) {
  let isScrolling;
  const onScroll = () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(callback, timeout);
  };
  window.addEventListener("scroll", onScroll, false);
  return () => window.removeEventListener(onScroll);
}
