import { style } from "helper/ff_web_components";
import {
  LitElement,
  html,
  customElement,
  property,
  unsafeCSS,
  css,
} from "lit-element";

@customElement("colors-header")
export class Header extends LitElement {
  @property({ type: Boolean }) show_back: boolean = false;
  static get styles() {
    return css`
      ${unsafeCSS(
        style(require("!css-loader!sass-loader!styles/components/header.scss"))
      )}
    `;
  }
  render() {
    return html`
      <div class="colors-header">
        <div class="colors-header__wrapper">
          ${this.show_back
            ? html` <div
                className="colors-header__showback"
                @click=${this._showBack}
              >
                <FontAwesomeIcon icon="{faArrowAltCircleLeft}" size="lg" />
              </div>`
            : ""}
          <a href="/" class="colors-header__link">
            <div class="colors-header__title">Colors</div>
          </a>
          <div className="colors-header__extra">
            <slot></slot>
          </div>
          <colors-theme-chooser
            class="colors-header__themechooser"
          ></colors-theme-chooser>
        </div>
      </div>
    `;
  }

  _showBack(e: Event) {
    window.history.back();
  }
}
