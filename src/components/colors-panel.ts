import * as Color from "color";
import { customElement, html, LitElement, property } from "lit-element";
import "./colors-tileset";

function produce_colors(
  color: Color,
  fn: (c: Color, n: number) => Color
): string[] {
  let c = Color(color);
  const result = [c.hex()];
  for (let i = 1; i < 11; i++) {
    result.push(fn(c, i / 10).hex());
  }
  return result;
}

const shade = (color: Color) => produce_colors(color, (c, n) => c.darken(n));
const tint = (color: Color) => produce_colors(color, (c, n) => c.whiten(n));
const complementary = (color: Color) => [color.hex(), color.rotate(180).hex()];
const triadic = (color: Color) => [
  color.hex(),
  color.rotate(120).hex(),
  color.rotate(240).hex(),
];
const analogous = (color: Color) => [
  color.hex(),
  color.rotate(30).hex(),
  color.rotate(330).hex(),
];
const default_func = (color: Color) => [color.hex()];

interface ColorFunc {
  shade: "shade";
  tint: "tint";
  complementary: "complementary";
  triadic: "triadic";
  analogous: "analogous";
}

const funcs = {
  shade,
  tint,
  complementary,
  triadic,
  analogous,
};

@customElement("colors-panel")
export class Panel extends LitElement {
  @property({ type: String }) func: string = "default_func";
  @property({ type: String }) color: string = "#000000";

  render() {
    return html`
      <colors-tileset
        colors="${this._produceColors()}"
        mode="compact"
      ></colors-tileset>
    `;
  }

  _produceColors() {
    let c = () => {
      try {
        return Color(this.color);
      } catch {
        return Color("black");
      }
    };
    let func = funcs[this.func as keyof ColorFunc] || default_func;
    return JSON.stringify(func(c()));
  }
}
