import 'styles/index.scss';
import 'styles/pages/info.scss';
import "components/colors-panel";
import { View } from 'fragments/view';

import { render, dom } from "helper/ff_web_components";
import Color from 'color';

const color = new URL(location.href).searchParams.get("color");
const tmp = (() => {
    try {
        return Color(color);
    } catch {
        return null;
    }
})();
const showAlert = tmp == null;
const fcolor = tmp != null ? color : "#000000";

render(
    <View show_back="true">
        {showAlert && <div className="error-msg">The color {color} is not a real color</div>}
        <h3>Analogous Colors</h3>
        <colors-panel func="analogous" color={fcolor}></colors-panel>
        <h3>Triadic Colors</h3>
        <colors-panel func="triadic" color={fcolor}></colors-panel>
        <h3>Complementary Color</h3>
        <colors-panel func="complementary" color={fcolor}></colors-panel>
        <h3>Shades of {fcolor}</h3>
        <colors-panel func="shade" color={fcolor}></colors-panel>
        <h3>Tints of {fcolor}</h3>
        <colors-panel func="tint" color={fcolor}></colors-panel>
    </View>
);