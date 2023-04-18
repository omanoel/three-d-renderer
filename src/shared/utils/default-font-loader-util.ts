import { LoadingManager } from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

export class DefaultFontLoaderUtil {
  private static instance:
    | {
        manager: LoadingManager;
        font: Font | undefined;
      }
    | undefined;
  constructor() {
    //
    DefaultFontLoaderUtil.instance = undefined;
  }

  public static getInstance(): {
    manager: LoadingManager;
    font: Font | undefined;
  } {
    if (DefaultFontLoaderUtil.instance === undefined) {
      const manager = new LoadingManager();
      let font;
      var loader = new FontLoader(manager);
      loader.load(
        "/assets/fonts/optimer_bold.typeface.json",
        (responseFont) => {
          font = responseFont;
        }
      );
      DefaultFontLoaderUtil.instance = { manager: manager, font: font };
    }
    return DefaultFontLoaderUtil.instance;
  }
}
