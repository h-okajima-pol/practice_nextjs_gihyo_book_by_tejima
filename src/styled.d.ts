import 'styled-components';
import { AppTheme } from './utils/styles'; 

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}