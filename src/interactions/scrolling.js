import { attr, checkBreakpoints } from '../utilities';

export const scrolling = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrolling';
  //elements
  const SCROLLING_WRAP = `[data-ix-scrolling="wrap"]`;
  const SCROLLING_TRIGGER = `[data-ix-scrolling="trigger"]`;
  const SCROLLING_LAYER = '[data-ix-scrolling="layer"]';
  //timeline options
  const SCROLLING_START = 'data-ix-scrolling-start';
  const SCROLLING_END = 'data-ix-scrolling-end';
  const SCROLLING_SCRUB = 'data-ix-scrolling-scrub';
  //tween options
  const SCROLLING_POSITION = 'data-ix-scrolling-position'; // sequential by default, use "<" to start tweens together
  const SCROLLING_X_START = 'data-ix-scrolling-x-start';
  const SCROLLING_X_END = 'data-ix-scrolling-x-end';
  const SCROLLING_Y_START = 'data-ix-scrolling-y-start';
  const SCROLLING_Y_END = 'data-ix-scrolling-y-end';
  const SCROLLING_WIDTH_START = 'data-ix-scrolling-width-start';
  const SCROLLING_WIDTH_END = 'data-ix-scrolling-width-end';
  const SCROLLING_HEIGHT_START = 'data-ix-scrolling-height-start';
  const SCROLLING_HEIGHT_END = 'data-ix-scrolling-height-end';
  const SCROLLING_ROTATE_Z_START = 'data-ix-scrolling-rotate-z-start';
  const SCROLLING_ROTATE_Z_END = 'data-ix-scrolling-rotate-z-end';
  const SCROLLING_OPACITY_START = 'data-ix-scrolling-opacity-start';
  const SCROLLING_OPACITY_END = 'data-ix-scrolling-opacity-end';

  const scrollingItems = gsap.utils.toArray(SCROLLING_WRAP);
  scrollingItems.forEach((scrollingItem) => {
    const layers = scrollingItem.querySelectorAll(SCROLLING_LAYER);
    // return if items are null
    if (!scrollingItem || layers.length === 0) return;
    // find the target element if one exists, otherwise the parent is the target
    let trigger = scrollingItem.querySelector(SCROLLING_TRIGGER);
    if (!trigger) {
      trigger = scrollingItem;
    }
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(scrollingItem, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    // default GSAP options for animation
    const tlSettings = {
      scrub: 1,
      start: 'top bottom',
      end: 'bottom top',
    };
    // get custom timeline settings or set them at the default
    tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(SCROLLING_START));
    tlSettings.end = attr(tlSettings.end, scrollingItem.getAttribute(SCROLLING_END));
    tlSettings.scrub = attr(tlSettings.scrub, scrollingItem.getAttribute(SCROLLING_SCRUB));
    // create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: tlSettings.start,
        end: tlSettings.end,
        scrub: tlSettings.scrub,
        markers: false,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    //////////////////////
    // Adding tweens
    layers.forEach((layer) => {
      if (!layer) return;
      //default tween settings
      const tween = {
        position: '<',
        XStart: '0%',
        XEnd: '0%',
        YStart: '0%',
        YEnd: '0%',
        rotateZStart: 0,
        rotateZEnd: 0,
        opacityStart: 1,
        opacityEnd: 1,
        widthStart: '100%',
        widthEnd: '100%',
      };

      // get custom tween settings amounts or set them at the default
      tween.position = attr(tween.position, layer.getAttribute(SCROLLING_POSITION));
      tween.XStart = attr(tween.XStart, layer.getAttribute(SCROLLING_X_START));
      tween.XEnd = attr(tween.XEnd, layer.getAttribute(SCROLLING_X_END));
      tween.YStart = attr(tween.YStart, layer.getAttribute(SCROLLING_Y_START));
      tween.XYnd = attr(tween.YEnd, layer.getAttribute(SCROLLING_Y_END));
      tween.widthStart = attr(tween.widthStart, layer.getAttribute(SCROLLING_WIDTH_START));
      tween.widthEnd = attr(tween.widthEnd, layer.getAttribute(SCROLLING_WIDTH_END));
      tween.rotateZStart = attr(tween.rotateZStart, layer.getAttribute(SCROLLING_ROTATE_Z_START));
      tween.rotateZEnd = attr(tween.rotateZEnd, layer.getAttribute(SCROLLING_ROTATE_Z_END));
      tween.opacityStart = attr(tween.opacityStart, layer.getAttribute(SCROLLING_OPACITY_START));
      tween.opacityEnd = attr(tween.opacityEnd, layer.getAttribute(SCROLLING_OPACITY_END));

      //add tween
      tl.fromTo(
        layer,
        {
          y: tween.YStart,
          x: tween.XStart,
          rotateZ: tween.rotateZStart,
          width: tween.widthStart,
          opacity: tween.opacityStart,
        },
        {
          y: tween.YEnd,
          x: tween.XEnd,
          rotateZ: tween.rotateZEnd,
          width: tween.widthEnd,
          opacity: tween.opacityEnd,
        },
        tween.position
      );
    });
  });
};
