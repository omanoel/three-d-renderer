import {
  DEFAULT_HOWTONAVIGATE_OPTIONS,
  ThreeDRendererHowToNavigateOptions,
} from "./how-to-navigate-options";

export interface ThreeDRendererPanelsOptions {
  howToNavigate: ThreeDRendererHowToNavigateOptions;
}

export const DEFAULT_PANELS_OPTIONS = {
  howToNavigate: DEFAULT_HOWTONAVIGATE_OPTIONS,
};
