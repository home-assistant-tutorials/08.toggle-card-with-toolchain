import html from "bundle-text:./editor.html";
import css from "bundle-text:./editor.css";

export class ToggleCardWithToolchainEditor extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};

    // lifecycle
    constructor() {
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
        importBox.innerHTML = html;
        this._elements.editor = importBox.firstElementChild;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = css;
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.editor);
    }

    doQueryElements() {
        this._elements.header = this._elements.editor.querySelector("#header");
        this._elements.entity = this._elements.editor.querySelector("#entity");
    }

    doListen() {
        this._elements.header.addEventListener(
            "focusout",
            this.onChanged.bind(this)
        );
        this._elements.entity.addEventListener(
            "focusout",
            this.onChanged.bind(this)
        );
    }

    doUpdateConfig() {
        this._elements.header.value = this._config.header;
        this._elements.entity.value = this._config.entity;
    }

    doUpdateHass() { }

    doMessageForUpdate(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id == "header") {
            newConfig.header = changedEvent.target.value;
        } else if (changedEvent.target.id == "entity") {
            newConfig.entity = changedEvent.target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}