
export const motionTokens = {
  duration: {
    short: 0.4,
    medium: 0.6,
    long: 0.9,
  },
  easing: {
    default: [0.4, 0.0, 0.2, 1] as const,
  },
  stagger: {
    default: 0.25,
  },
  colors: {
    redShadow: "rgba(224, 0, 43, 0.4)",
  }
};

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: motionTokens.duration.medium,
    ease: motionTokens.easing.default,
  },
};

export const fadeUpStagger = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: motionTokens.duration.medium,
    ease: motionTokens.easing.default,
  },
};

export const scaleOnPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.08 },
};

export const portfolioCardHover = {
  whileHover: {
    scale: 1.03,
    transition: { 
      duration: 0.22, 
      ease: motionTokens.easing.default 
    },
  },
};

export const headerAutoHide = {
  hidden: { 
    y: "-100%",
    transition: {
      duration: 0.28,
      ease: motionTokens.easing.default,
    }
  },
  visible: { 
    y: 0,
    transition: {
      duration: 0.28,
      ease: motionTokens.easing.default,
    }
  },
};

export const kenBurnsEffect = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
  transition: {
    duration: 12,
    ease: "easeOut",
  },
};

export const parallaxConfig = {
  stiffness: 100,
  damping: 20,
};

export const timelineScrollConfig = {
  stiffness: 100,
  damping: 20,
  ease: motionTokens.easing.default,
  duration: 0.4,
};

export const buttonGlow = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(224, 0, 43, 0)",
      "0 0 20px rgba(224, 0, 43, 0.3)",
      "0 0 0px rgba(224, 0, 43, 0)",
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const hoverUnderline = {
  initial: { width: 0 },
  whileHover: { width: "100%" },
  transition: {
    duration: 0.3,
    ease: motionTokens.easing.default,
  },
};

export const focusRing = {
  whileFocus: {
    boxShadow: "0 0 0 3px rgba(224, 0, 43, 0.3)",
    transition: { duration: 0.2 },
  },
};
