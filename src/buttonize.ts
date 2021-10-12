import { modifyInstanceOrConstructor } from "./core/modifyInstanceOrConstructor";
import { Buttonizable } from "./helpers";

type ButtonCallbacks = {
  trigger: () => unknown,
  hoverIn: () => unknown,
  hoverOut: () => unknown,
  down: () => unknown,
  up: () => unknown,
}

type ButtonMods = Record<string, any>;

export const buttonize = modifyInstanceOrConstructor(
  function buttonizeInstance<T extends Buttonizable>(target: T, mods?: ButtonMods) {
    let _cb = null as null | Partial<ButtonCallbacks>;

    const behaviour = {
      buttonized: true,
      on(cb: Partial<ButtonCallbacks>) {
        _cb = cb;
      },
      trigger() {
        _cb?.trigger?.call(result);
      },
    }

    const result = Object.assign(target, behaviour, mods);
    return result;
  },
  'Buttonized'
);
