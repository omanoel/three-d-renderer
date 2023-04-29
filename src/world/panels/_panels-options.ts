import {
  DEFAULT_DIALOG_BOX_OPTIONS,
  DEFAULT_HOWTONAVIGATE_OPTIONS,
  ThreeDRendererDialogBoxOptions
} from './dialog-box-options';

export interface ThreeDRendererPanelsOptions {
  howToNavigate: ThreeDRendererDialogBoxOptions;
  default: ThreeDRendererDialogBoxOptions;
}

export const DEFAULT_PANELS_OPTIONS = {
  default: DEFAULT_DIALOG_BOX_OPTIONS,
  howToNavigate: DEFAULT_HOWTONAVIGATE_OPTIONS
};
