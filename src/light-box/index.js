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
      isOpen: { type: Boolean },
      _open: { state: true },
    };
  }

  constructor() {
    super();
    this.alt = "";
    this.decoding = "async";
    this.height = "";
    this.loading = "lazy";
    this.src = "#";
    this.width = "";
    this.isOpen = false;
    this._open = false;
  }

  get _lightboxShadow() {
    return this.renderRoot?.querySelector(".lightbox__shadow") ?? null;
  }

  get _openClass() {
    return this._open ? "open" : "closed";
  }

  async _openLightbox() {
    this._open = true;
    this.removeAttribute("closed");
    this.setAttribute("open", "");
    document.body.style.overflow = "hidden";

    await this.updateComplete;
    document.addEventListener("keydown", this._handleEscape);
    this.dispatchEvent(new CustomEvent("LightboxOpened", { bubbles: true, composed: false }));
  }

  async _closeLightbox() {
    this._open = false;
    this.removeAttribute("open");
    this.setAttribute("closed", "");
    document.body.style.overflow = "auto";

    await this.updateComplete;
    document.removeEventListener("keydown", this._handleEscape);
    this.dispatchEvent(new CustomEvent("LightboxClosed", { bubbles: true, composed: false }));
  }

  _handleEscape = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      this._closeLightbox();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("closed", "");
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
        <img
          class="lightbox__created-image"
          src=${this.lightbox ? this.lightbox : this.src}
          alt=${this.alt} />
      </div>
    `;
  }
}

customElements.define("light-box", LightBox);
