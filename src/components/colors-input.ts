import { style } from "helper/ff_web_components";
import {
  LitElement,
  html,
  customElement,
  property,
  unsafeCSS,
  css,
} from "lit-element";

@customElement("colors-input")
export default class Input extends LitElement {
  @property({ type: String }) label?: string;
  @property({ type: String }) class_name?: string;

  static get styles() {
    return css`
      ${unsafeCSS(
        style(
          require("!css-loader!sass-loader!styles/components/color-input.scss")
        )
      )}
    `;
  }

  render() {
    return html`
      <div class="colors-colorinput ${this.class_name}">
        <input
          id="color-value"
          class="colors-colorinput__input"
          @input=${this.updateColor}
        />
        <span id="color-preview" class="colors-colorinput__preview"></span>
        <button class="colors-colorinput__button" @click=${this.showColorInfo}>
          ${this.label}
        </button>
      </div>
    `;
  }

  updateColor(e: Event) {
    let target = e.target as HTMLInputElement;
    let style = this.shadowRoot?.getElementById("color-preview")?.style;
    if (style) {
      style.backgroundColor = target.value;
    }
  }

  showColorInfo(e: Event) {
    let input = this.shadowRoot?.getElementById(
      "color-value"
    ) as HTMLInputElement;
    if (input) {
      location.href = "./info.html?color=" + encodeURIComponent(input.value);
    }
  }
}
