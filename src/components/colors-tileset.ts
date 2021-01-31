import { style } from "helper/ff_web_components";
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  unsafeCSS,
} from "lit-element";
import { Mode, Tile } from "./colors-tile";

const default_colors = [
  "#e0ece4",
  "#ff4b5c",
  "#056674",
  "#66bfbf",
  "#f1f3de",
  "#eb8f8f",
  "#ec0101",
  "#cd0a0a",
  "#ffc93c",
  "#07689f",
  "#40a8c4",
  "#a2d5f2",
  "#ff7171",
  "#ffaa71",
  "#6e6d6d",
];

@customElement("colors-tileset")
export class TileSet extends LitElement {
  @property({ type: String }) mode = Mode.Large;
  @property({ type: Array }) colors: string[] = default_colors;

  static get styles() {
    return css`
      ${unsafeCSS(
        style(require("!css-loader!sass-loader!styles/components/tileset.scss"))
      )}
    `;
  }

  render() {
    return html`
      <div class="colors-tileset colors-tileset--${this.mode}">
        ${this.colors.map((value, index) => {
          return html`
            <a href="./info.html?color=${encodeURIComponent(value)}">
              <colors-tile color="${value}" mode="${this.mode}" />
            </a>
          `;
        })}
      </div>
    `;
  }
}
