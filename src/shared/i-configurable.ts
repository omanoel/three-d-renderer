export interface IConfigurable<OPT> {
  updateWithOptions: (options: Partial<OPT>) => void;
}
