/**
 * @file Creates a LightBox Web Component
 */

import { html, css, LitElement } from "lit";

class LightBox extends LitElement {
  static styles = css`
    .lightbox__shadow {
      background-color: rgba(0, 0, 0, 0.7);
      block-size: 100vh;
      cursor: zoom-out;
      display: none;
      inline-size: 100%;
      inset: 0;
      position: absolute;
    }
  `;

  static properties = {
    alt: { type: String },
    decoding: { type: String },
    height: { type: Number },
    lightbox: {type: String},
    loading: { type: String },
    src: { type: String },
    width: { type: Number },
  };

  constructor() {
    super();
    this.alt = "";
    this.decoding = "async";
    this.height = "";
    this.loading = "lazy";
    this.src = "#";
    this.width = "";
  }

  render() {
    return html`
      <img
        class="lightbox__original-image"
        alt=${this.alt}
        decoding=${this.decoding}
        height=${this.height}
        loading=${this.loading}
        src=${this.src}
        width=${this.width} />
      <div class="lightbox__shadow">
        <img class="lightbox__created-image" src=${this.lightbox ? this.lightbox : this.src} />
      </div>
    `;
  }
}

customElements.define("light-box", LightBox);
