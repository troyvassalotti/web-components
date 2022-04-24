/**
 * @file Creates a LightBox Web Component
 */

import { html, css, LitElement } from "lit";

export class LightBox extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    *::after,
    *::before {
      box-sizing: inherit;
    }

    img {
      max-inline-size: 100%;
    }

    .lightbox__original-image {
      cursor: zoom-in;
    }

    .lightbox__shadow {
      background-color: rgba(0, 0, 0, 0.7);
      block-size: 100vh;
      cursor: zoom-out;
      display: none;
      inline-size: 100%;
      inset: 0;
      overflow: auto;
      padding: 1rem;
      place-items: center;
      position: fixed;
    }
  `;

  static properties = {
    alt: { type: String },
    decoding: { type: String },
    height: { type: Number },
    lightbox: { type: String },
    loading: { type: String },
    src: { type: String },
    width: { type: Number },
  };

  get _lightboxShadow() {
    return this.renderRoot?.querySelector(".lightbox__shadow") ?? null;
  }

  constructor() {
    super();
    this.alt = "";
    this.decoding = "async";
    this.height = "";
    this.loading = "lazy";
    this.src = "#";
    this.width = "";
  }

  _openLightbox() {
    this._lightboxShadow.style.display = "grid";
    document.body.style.overflow = "hidden";
  }

  _closeLightbox() {
    this._lightboxShadow.style.display = "none";
    document.body.style.overflow = "auto";
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
        width=${this.width}
        @click=${this._openLightbox} />
      <div class="lightbox__shadow" @click=${this._closeLightbox}>
        <img class="lightbox__created-image" src=${this.lightbox ? this.lightbox : this.src} />
      </div>
    `;
  }
}

customElements.define("light-box", LightBox);
