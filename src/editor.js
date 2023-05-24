
export class ToggleCardWithToolchainEditor extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};

    // lifecycle
    constructor() {
        super();
        console.log("editor:constructor()");
        this.doEditor();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }

    setConfig(config) {
        console.log("editor:setConfig()");
        this._config = config;
        this.doUpdateConfig();
    }

    set hass(hass) {
        console.log("editor.hass()");
        this._hass = hass;
        this.doUpdateHass();
    }

    onChanged(event) {
        console.log("editor.onChanged()");
        this.doMessageForUpdate(event);
    }

    // jobs
    doEditor() {
        this._elements.editor = document.createElement("form");
        this._elements.editor.innerHTML = `
            <div class="row"><label class="label" for="header">Header:</label><input class="value" id="header"></input></div>
            <div class="row"><label class="label" for="entity">Entity:</label><input class="value" id="entity"></input></div>
        `;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = `
            form {
                display: table;
            }
            .row {
                display: table-row;
            }
            .label, .value {
                display: table-cell;
                padding: 0.5em;
            }
        `;
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