declare module 'styled-components/native' {
  import * as styledComponents from 'styled-components';
  export * from 'styled-components';
  const styled: typeof styledComponents.default;
  export default styled;
}
