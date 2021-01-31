import 'components/colors-header';
import 'components/colors-input';

import { style } from 'helper/ff_web_components';
import {
    LitElement, html, customElement, property, unsafeCSS, css
} from 'lit-element';

@customElement('colors-view')
export class View extends LitElement {
    @property({ type: Boolean }) show_back = false;

    static get styles() {
        return css`${unsafeCSS(style(require("!css-loader!sass-loader!styles/components/view.scss")))}`
    }

    render() {
        return html`
        <div class="colors-view">
            <colors-header show_back=${this.show_back}>
                <colors-input class_name="colors-view-colorinput" label="Analizar"></colors-input>
            </colors-header>
            <div class="colors-view__scrollview">
                <div class="colors-view__content">
                    <slot></slot>
                </div>
            </div>
        </div>
        `;
    }
}