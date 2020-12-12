export type StepProcess = {
  init: (total: number, message?: string) => void;
  success: (message?: string) => void;
  failure: (message?: string) => void;
  finish: (message?: string) => void;
  cancel: (message?: string) => void;
};

const noop = () => undefined;

export const EmptyProcess: StepProcess = {
  init: noop,
  success: noop,
  failure: noop,
  finish: noop,
  cancel: noop,
};
