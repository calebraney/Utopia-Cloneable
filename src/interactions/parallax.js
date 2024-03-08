import { attr, checkBreakpoints } from '../utilities';

export const parallax = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'parallax';
  //elements
  const PARALLAX_WRAP = `[data-ix-parallax="wrap"]`;
  const PARALLAX_SECTION = `[data-ix-parallax="section"]`;
  const PARALLAX_TRIGGER = `[data-ix-parallax="trigger"]`;
  //options
  const PARALLAX_TYPE = 'data-ix-parallax-type'; //options are uncover, cover, or parallax
  const PARALLAX_AMOUNT = 'data-ix-parallax-amount';

  const parallaxItems = gsap.utils.toArray(PARALLAX_WRAP);
  parallaxItems.forEach((parallaxItem) => {
    const section = parallaxItem.querySelector(PARALLAX_SECTION);
    const trigger = parallaxItem.querySelector(PARALLAX_TRIGGER);
    if (!parallaxItem || !section || !trigger) return;
    //set default animation type
    let animationType = 'uncover';
    animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));
    moveAmount = attr(50, parallaxItem.getAttribute(PARALLAX_AMOUNT));

    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(parallaxItem, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;

    // animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));
    // default GSAP options for uncover animation
    const settings = {
      scrub: true,
      start: 'top bottom',
      end: 'top top',
      moveStart: '-100vh',
      moveEnd: '0vh',
    };
    //check for animationType of cover
    if (animationType === 'cover') {
      settings.start = 'bottom bottom';
      settings.end = 'bottom top';
      settings.moveStart = '0vh';
      settings.moveEnd = '100vh';
    }
    //check for animationType of parallax
    if (animationType === 'parallax') {
      settings.moveStart = `-${moveAmount}vh`;
      settings.moveEnd = '0vh';
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        markers: false,
        start: settings.start,
        end: settings.end,
        scrub: settings.scrub,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
      onStart: () => {
        ScrollTrigger.refresh();
      },
    });
    tl.fromTo(
      section,
      {
        y: settings.moveStart,
      },
      {
        y: settings.moveEnd,
      }
    );
  });
};
