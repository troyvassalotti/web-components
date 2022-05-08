/**
 * @file Creates a LightBox Web Component
 */

import { LitElement, css, html, nothing } from "https://cdn.skypack.dev/lit@2.2.3";

export class LightBox extends LitElement {
  static get styles() {
    return css`
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

      img[height] {
        block-size: auto;
      }

      .lightbox__original-image {
        cursor: zoom-in;
      }

      .lightbox__shadow {
        background-color: rgba(0, 0, 0, 0.8);
        block-size: 100vh;
        cursor: zoom-out;
        inline-size: 100%;
        inset: 0;
        overflow: auto;
        padding: 1rem;
        place-items: center;
        position: fixed;
      }
      
      .open {
        display: grid;
      }
      
      .closed {
        display: none;
      })
    `;
  }

  static get properties() {
    return {
      alt: { type: String },
      decoding: { type: String },
      height: { type: Number },
      lightbox: { type: String },
      loading: { type: String },
      src: { type: String },
      width: { type: Number },
      _open: { state: true },
    };
  }

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
    this._open = false;
  }

  get _openClass() {
    return this._open ? "open" : "closed";
  }

  _openLightbox() {
    this._open = true;
    document.body.style.overflow = "hidden";
  }

  _closeLightbox() {
    this._open = false;
    document.body.style.overflow = "auto";
  }

  _handleEscape = (e) => {
    if ((e.key === "Escape" || e.key === "Esc")) {
      this._closeLightbox()
    }
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("keydown", this._handleEscape)
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleEscape);
    super.disconnectedCallback();
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
      <div class="lightbox__shadow ${this._openClass}" @click=${this._closeLightbox}>
        <img class="lightbox__created-image" src=${this.lightbox ? this.lightbox : this.src} alt=${this.alt} />
      </div>
    `;
  }
}

customElements.define("light-box", LightBox);
