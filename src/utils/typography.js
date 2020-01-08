import Typography from 'typography';
import Moraga from 'typography-theme-moraga';

Moraga.headerColor = '#fffffe';
Moraga.bodyColor = '#b8c1ec';

const typography = new Typography(Moraga);

if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
