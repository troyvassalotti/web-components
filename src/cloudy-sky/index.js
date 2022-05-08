/**
 * @file Creates a component with clouds flowing in the background.
 * @TODO
 * - Optional Hillside
 * - Customize colors of hill and clouds
 * - Adjustable height of the clouds
 * - Unnamed slot for passing your own Light DOM content
 */

import { LitElement, css, html } from "https://cdn.skypack.dev/lit@2.2.3";

export class CloudySky extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super()
  }

  render() {
    return html``;
  }
}

customElements.define("cloudy-sky", CloudySky)
