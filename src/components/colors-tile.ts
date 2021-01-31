import { style } from "helper/ff_web_components";
import { css, customElement, html, LitElement, property, unsafeCSS } from "lit-element";

export enum Mode {
    Compact = 'compact',
    Large = 'large'
};

@customElement("colors-tile")
export class Tile extends LitElement {
    @property({ type: String }) mode = Mode.Large;
    @property({ type: String }) color = Mode.Large;

    static get styles() {
        return css`${unsafeCSS(style(require("!css-loader!sass-loader!styles/components/tile.scss")))}`
    }

    render() {
        return html`
        <div class="colors-tile colors-tile--${this.mode}">
            <div class="colors-tile__color" style="background-color: ${this.color}">
            </div>
            <div class="colors-tile__caption">
                ${this.color}
            </div>
        </div>
        `
    }

}