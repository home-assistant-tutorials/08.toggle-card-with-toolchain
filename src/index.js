import { ToggleCardWithToolchain } from "./card";
import { ToggleCardWithToolchainEditor } from "./editor";

customElements.define(
    "toggle-card-with-toolchain",
    ToggleCardWithToolchain
);
customElements.define(
    "toggle-card-with-toolchain-editor",
    ToggleCardWithToolchainEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "toggle-card-with-toolchain",
    name: "toggle card created with a toolchain",
    description: "Turn an entity on and off",
});
