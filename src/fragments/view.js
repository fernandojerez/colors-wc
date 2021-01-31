import "components/colors-view";
import { dom } from "helper/ff_web_components";

export const View = ({ show_back = "false", children }) => {
    return (<colors-view show_back={show_back} class="colors-dark-theme">{children}</colors-view>)
}