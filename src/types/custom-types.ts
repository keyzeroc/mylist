export interface ItemInterface {
  id?: string;
  name: string;
  link: string;
  tags: Array<string>;
}
export interface NotificationInterface {
  id?: string;
  text: string;
  duration: number;
}
export interface ModalInterface {
  modal: {
    type: "prompt" | "confirm";
    header: string;
    body: string;
    isOpen?: boolean;
  }
};

export interface NotificationState {
  notifications: NotificationInterface[]
}
export interface ThemeState {
  currentTheme: 'dark' | 'light';
}
export interface ListState {
  list: ItemInterface[];
}
