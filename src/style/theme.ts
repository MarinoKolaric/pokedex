export const color = {
  background: "#f2f2f2",
  main: "#fff",
  gray: "#333333",
  grayDarker: "#1A1A1A",
};

export const fontSize = {
  xxs: "11rem",
  xs: "14rem",
  sm: "16rem",
  md: "18rem",
  lg: "24rem",
  xl: "32rem",
};

export const breakpoints = {
  mobile: 320,
  mobileMedium: 400,
  mobileLarge: 540,
  tablet: 768,
  laptop: 1200,
  desktop: 1440,
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: String | TemplateStringsArray) =>
    `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};

export const boxShadow = "box-shadow: 8px 8px 8px 0 rgba(0, 0, 0, 0.4);";
