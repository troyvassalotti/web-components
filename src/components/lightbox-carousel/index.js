/**
 * @file A container for LightBox components to enable a carousel
 */

import { LitElement, css, html } from "lit";

export class LightboxCarousel extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        grid-template-rows: masonry;
        justify-items: center;
      }

      ::slotted(light-box:first-of-type) {
        inline-size: 100%;
        max-block-size: 30rem;
      }

      @media (min-width: 37.5rem) {
        ::slotted(light-box:first-of-type) {
          grid-column: 1 / 3;
        }
      }
    `;
  }

  static get properties() {
    return {
      _open: { state: true },
      _openLightbox: { state: true },
    };
  }

  constructor() {
    super();
    this._open = false;
    this._openLightbox = null;
  }

  static get _getChildren() {
    return this.querySelectorAll("light-box");
  }

  _handleKeyup = (e) => {
    if (e.key === "ArrowRight") {
      const nextIndex = this._openLightbox.index + 1;
      for (const node of this._children.entries()) {
        if (node[0] === nextIndex) {
          this._openLightbox.node._closeLightbox();
          node[1]._openLightbox();
        }
      }
    } else if (e.key === "ArrowLeft") {
      const previousIndex = this._openLightbox.index - 1;
      for (const node of this._children.entries()) {
        if (node[0] === previousIndex) {
          this._openLightbox.node._closeLightbox();
          node[1]._openLightbox();
        }
      }
    }
  };

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._children = this.querySelectorAll("light-box");
    this.addEventListener("LightboxOpened", () => {
      this._children.forEach((node, index) => {
        if (node.attributes.open) {
          this._openLightbox = {
            node,
            index,
          };
        }
      });
      document.addEventListener("keyup", this._handleKeyup);
    });
    this.addEventListener("LightboxClosed", () => {
      this._openLightbox = null;
      document.removeEventListener("keyup", this._handleKeyup);
    });
  }
}

customElements.define("lightbox-carousel", LightboxCarousel);
