/**
 *
 */
export interface ThreeDRendererDialogBoxOptions {
  id: string;
  title: string;
  message: string;
}

export const DEFAULT_DIALOG_BOX_OPTIONS: ThreeDRendererDialogBoxOptions = {
  id: 'default',
  title: 'Title',
  message: 'Message'
};

export const DEFAULT_HOWTONAVIGATE_OPTIONS: ThreeDRendererDialogBoxOptions = {
  id: 'how-to-navigate',
  title: 'How to use 3D display?',
  message:
    'Left mouse click and drag for rotation around the camera target<br>' +
    'Right mouse click and drag for translation of the camera target<br>' +
    'Mouse wheel for zooming/dezooming from camera target<br>' +
    'Mouse over an object (red cross is the target) to display additional infos<br>' +
    'Double Click on red cross to define camera target<br>' +
    'Press Escape key to reset to initial view<br>'
};
