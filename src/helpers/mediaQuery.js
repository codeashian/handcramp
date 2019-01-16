import breakpoints from 'helpers/breakpoints.mjs';
import styled, { css } from 'styled-components';

const media = Object.keys(breakpoints).reduce((acc, label) => {
  const size = breakpoints[label];
  acc[label] = (...args) => css`
    @media screen and (min-width: ${size}) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export default media;
