export interface ItemInterface {
  id?: string;
  name: string;
  link: string;
  tags?: Array<string>;
}
export interface ThemeState {
  currentTheme: 'dark' | 'light';
}
export interface ListState {
  list: ItemInterface[];
}