import { Buttonizable } from "./helpers";

type Buttonized = ReturnType<typeof buttonizeInstance>;

type Constructor<T> = new (...args: any[]) => T;
type NotFunction<T> = T extends Function ? never : T;

function isConstructor<T>(target: (new () => T) | any): target is new () => T {
  return target && !!target.prototype && !!target.prototype.constructor.name;
}

type ButtonCallbacks = {
  trigger: () => unknown,
}

type ButtonMods = Record<string, any>;

function buttonizeInstance<T extends Buttonizable>(target:T, mods?: ButtonMods) {
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
}

export function buttonize<T extends Buttonizable>(target:Constructor<T>, mods?: ButtonMods): new () => T & Buttonized;
export function buttonize<T extends Buttonizable>(target:NotFunction<T>, mods?: ButtonMods): T & Buttonized;
export function buttonize<T extends Buttonizable>(target:NotFunction<T> | Constructor<T>, mods?: ButtonMods): any {
  if (isConstructor(target)) {
    return class ButtonizedClass extends (target as any) {
      constructor (...args: any[]) {
        super(...args);
        buttonizeInstance(this as any, mods);
      }
    }
  } else if (typeof target === "object") {
    return buttonizeInstance(target, mods);
  } else {
    throw new Error('this is nothing...');
  }
}