interface RootState {
  galleries: GalleriesMap;
  images: ImagesMap;
  users: UsersMap;
}

type Subtract<T, K> = Omit<T, keyof K>;

type Contains<T> = {
  [key: string]: any;
  [key: number]: any;
} & T;

// npm install -D @types/module - DefiniteyTyped

// declare module "storybook-react-router" {
//   import { StoryDecorator } from "@storybook/react";

//   const constructor: () => StoryDecorator;
//   export default constructor;
// }
