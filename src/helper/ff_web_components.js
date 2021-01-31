export const render = (content, placeholder = document.body) => {
    const el = typeof placeholder == 'string' ? document.getElementById(placeholder) : placeholder
    el.appendChild(content);
}

const add_children = function (el, children) {
    for (let child of children) {
        if (child) {
            if (Array.isArray(child)) {
                add_children(el, child);
                continue;
            }
            el.appendChild((typeof child === 'string') ? document.createTextNode(child) : child);
        }
    }
}

const dom_factory = function (tag, props) {
    const children = Array.prototype.slice.call(arguments, 2);
    if (typeof tag == "function") {
        return tag({ ...props, children });
    }
    var el = tag === dom.Fragment ? document.createDocumentFragment() : document.createElement(tag);
    for (let key in props) {
        el.setAttribute(key, props[key]);
    }
    add_children(el, children);
    return el;
}

dom_factory.Fragment = {};

export const style = function (code) {
    return code.default.toString();
}

export const dom = dom_factory;
