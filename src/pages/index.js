import 'styles/index.scss';
import 'styles/pages/index.scss';
import "components/colors-tileset";
import { render, dom } from "helper/ff_web_components";
import { View } from 'fragments/view';

render(
    <View>
        <colors-tileset></colors-tileset>
    </View>
);