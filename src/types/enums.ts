export const enum Colors {
  RonBurgundy = "#b71c1c",
  BurntOrange = "#ff5722",
  Carrot = "#ff9900",
  Mango = "#fdd835",
  Mantis = "#18c96e",
  Spruce = "#4cb04f",
  GrassStain = "#8ac24a",
  Lime = "#cbdB39",
  Cobalt = "#303f9f",
  Bluebird = "#2196f3",
  Seafoam = "#00bcd4",
  Carribean = "#00e5ff",
  Crown = "#7b1fa2",
  Screample = "#7c4dff",
  Sangria = "#880e4f",
  Lavender = "#dea7e8",
  WildStrawberry = "#ff4081",
  Steel = "#9e9e9e",
  SendGridBlue = "#1a82e2"
}

export enum AvailableEditorFont {
  "Arial" = "arial,helvetica,sans-serif",
  "Arial Black" = "arial black, helvetica, sans-serif",
  "Comic Sans" = "comic sans ms,cursive",
  "Courier" = "courier, monospace",
  "Courier New" = "courier new,courier,monospace",
  "Georgia" = "georgia,serif",
  "Helvetica" = "helvetica,sans-serif",
  "Impact" = "impact, sans-serif",
  "Lucida Sans Unicode" = "lucida sans unicode,lucida grande,sans-serif",
  "Tahoma" = "tahoma,geneva,sans-serif",
  "Times" = "times,serif;",
  "Times New Roman" = "times new roman,times,serif",
  "Trebuchet MS" = "trebuchet ms,helvetica,sans-serif",
  "Verdana" = "verdana,geneva,sans-serif",
  "Inherit (Web Fonts)" = "inherit"
}

declare global {
  type TAvailableEditorFont = AvailableEditorFont;
  type TColors = Colors;
}

// Typecast images as _any_
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.png";
declare module "*.svg";
