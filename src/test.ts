import { buttonize } from "./buttonize";
import { Sprite } from "@pixi/sprite";

class Foo extends Sprite {
  name?: string
  public foo = 1;
}

const Button = buttonize(Foo);

const test = function (this:any) { console.debug(JSON.stringify(this)) };

const a = new Button();
a.on({ trigger: test });
a.name = 'A';
a.trigger();

const b = buttonize(new Foo);
b.on({ trigger: test });
b.name = 'B';
b.trigger();

//const c = buttonize(log, {});