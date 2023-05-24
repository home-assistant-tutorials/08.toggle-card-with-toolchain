function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $2274bf72133e3065$exports = {};
$2274bf72133e3065$exports = "\n<ha-card>\n    <div class=\"card-content\">\n        <p class=\"error error hidden\">\n        </p><dl class=\"dl\">\n            <dt class=\"dt\"></dt>\n            <dd class=\"dd\">\n                <span class=\"toggle\">\n                    <span class=\"button\"></span>\n                </span>\n                <span class=\"value\">\n                </span>\n            </dd>\n        </dl>\n    </div>\n</ha-card>";


var $643e2572997ae2f9$exports = {};
$643e2572997ae2f9$exports = ".error {\n  color: red;\n}\n\n.error.hidden {\n  display: none;\n}\n\n.dl {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  display: grid;\n}\n\n.dl.hidden {\n  display: none;\n}\n\n.dt {\n  flex-wrap: wrap;\n  align-content: center;\n  display: flex;\n}\n\n.dd {\n  grid-template-columns: repeat(2, minmax(0, auto) minmax(0, 2fr));\n  margin: 0;\n  display: grid;\n}\n\n.toggle {\n  border: gray;\n  border-radius: 50%;\n  padding: .6em;\n}\n\n.toggle.on {\n  background-color: green;\n}\n\n.toggle.off {\n  background-color: red;\n}\n\n.button {\n  width: 1.4em;\n  height: 1.4em;\n  background-color: silver;\n  border: .2em outset silver;\n  border-radius: 50%;\n  display: block;\n}\n\n.value {\n  flex-wrap: wrap;\n  align-content: center;\n  padding-left: .5em;\n  display: flex;\n}\n\n";


class $beabb7f95d0325e3$export$44473774f20a91cd extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};
    // lifecycle
    constructor(){
        super();
        this.doHtml();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }
    setConfig(config) {
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
    }
    set hass(hass) {
        this._hass = hass;
        this.doUpdateHass();
    }
    onClicked() {
        this.doToggle();
    }
    // accessors
    isOff() {
        return this.getState().state === "off";
    }
    isOn() {
        return this.getState().state === "on";
    }
    getHeader() {
        return this._config.header;
    }
    getEntityID() {
        return this._config.entity;
    }
    getState() {
        return this._hass.states[this.getEntityID()];
    }
    getAttributes() {
        return this.getState().attributes;
    }
    getName() {
        const friendlyName = this.getAttributes().friendly_name;
        return friendlyName ? friendlyName : this.getEntityID();
    }
    // jobs
    doCheckConfig() {
        if (!this._config.entity) throw new Error("Please define an entity!");
    }
    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = (0, (/*@__PURE__*/$parcel$interopDefault($2274bf72133e3065$exports)));
        this._elements.card = importBox.firstElementChild;
    }
    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = (0, (/*@__PURE__*/$parcel$interopDefault($643e2572997ae2f9$exports)));
    }
    doAttach() {
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(this._elements.style, this._elements.card);
    }
    doQueryElements() {
        const card = this._elements.card;
        this._elements.error = card.querySelector(".error");
        this._elements.dl = card.querySelector(".dl");
        this._elements.topic = card.querySelector(".dt");
        this._elements.toggle = card.querySelector(".toggle");
        this._elements.value = card.querySelector(".value");
    }
    doListen() {
        this._elements.dl.addEventListener("click", this.onClicked.bind(this), false);
    }
    doUpdateConfig() {
        if (this.getHeader()) this._elements.card.setAttribute("header", this.getHeader());
        else this._elements.card.removeAttribute("header");
    }
    doUpdateHass() {
        if (!this.getState()) {
            this._elements.error.textContent = `${this.getEntityID()} is unavailable.`;
            this._elements.error.classList.remove("hidden");
            this._elements.dl.classList.add("hidden");
        } else {
            this._elements.error.textContent = "";
            this._elements.topic.textContent = this.getName();
            if (this.isOff()) {
                this._elements.toggle.classList.remove("on");
                this._elements.toggle.classList.add("off");
            } else if (this.isOn()) {
                this._elements.toggle.classList.remove("off");
                this._elements.toggle.classList.add("on");
            }
            this._elements.value.textContent = this.getState().state;
            this._elements.error.classList.add("hidden");
            this._elements.dl.classList.remove("hidden");
        }
    }
    doToggle() {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this.getEntityID()
        });
    }
    // card configuration
    static getConfigElement() {
        return document.createElement("toggle-card-with-toolchain-editor");
    }
    static getStubConfig() {
        return {
            entity: "input_boolean.tcwt",
            header: ""
        };
    }
}


var $69fa7c10f0e93f0b$exports = {};
$69fa7c10f0e93f0b$exports = "\n<form class=\"table\">\n    <div class=\"row\"><label class=\"label cell\" for=\"header\">Header:</label><input class=\"value cell\" id=\"header\"></div>\n    <div class=\"row\"><label class=\"label cell\" for=\"entity\">Entity:</label><input class=\"value cell\" id=\"entity\"></div>\n</form>";


var $0d52b71427515847$exports = {};
$0d52b71427515847$exports = ".table {\n  display: table;\n}\n\n.row {\n  display: table-row;\n}\n\n.cell {\n  padding: .5em;\n  display: table-cell;\n}\n\n";


class $024613ee6ee50c79$export$996cbfeb08977e54 extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};
    // lifecycle
    constructor(){
        super();
        this.doHtml();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }
    setConfig(config) {
        this._config = config;
        this.doUpdateConfig();
    }
    set hass(hass) {
        this._hass = hass;
        this.doUpdateHass();
    }
    onChanged(event) {
        this.doMessageForUpdate(event);
    }
    // jobs
    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = (0, (/*@__PURE__*/$parcel$interopDefault($69fa7c10f0e93f0b$exports)));
        this._elements.editor = importBox.firstElementChild;
    }
    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = (0, (/*@__PURE__*/$parcel$interopDefault($0d52b71427515847$exports)));
    }
    doAttach() {
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(this._elements.style, this._elements.editor);
    }
    doQueryElements() {
        this._elements.header = this._elements.editor.querySelector("#header");
        this._elements.entity = this._elements.editor.querySelector("#entity");
    }
    doListen() {
        this._elements.header.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.entity.addEventListener("focusout", this.onChanged.bind(this));
    }
    doUpdateConfig() {
        this._elements.header.value = this._config.header;
        this._elements.entity.value = this._config.entity;
    }
    doUpdateHass() {}
    doMessageForUpdate(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id == "header") newConfig.header = changedEvent.target.value;
        else if (changedEvent.target.id == "entity") newConfig.entity = changedEvent.target.value;
        const messageEvent = new CustomEvent("config-changed", {
            detail: {
                config: newConfig
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(messageEvent);
    }
}


customElements.define("toggle-card-with-toolchain", (0, $beabb7f95d0325e3$export$44473774f20a91cd));
customElements.define("toggle-card-with-toolchain-editor", (0, $024613ee6ee50c79$export$996cbfeb08977e54));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "toggle-card-with-toolchain",
    name: "toggle card created with a toolchain",
    description: "Turn an entity on and off"
});


//# sourceMappingURL=card.js.map
