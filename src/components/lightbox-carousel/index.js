/**
 * @file A container for LightBox components to enable a carousel
 */

import { LitElement, css, html } from "lit";
import TinyGesture from "tinygesture";

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

  _handleChangingLightboxes = (index) => {
    for (const node of this._children.entries()) {
      if (node[0] === index) {
        this._openLightbox.node._closeLightbox();
        node[1]._openLightbox();
      }
    }
  };

  _handleKeyup = (e) => {
    const index =
      e.key === "ArrowRight"
        ? this._openLightbox.index + 1
        : e.key === "ArrowLeft"
        ? this._openLightbox.index - 1
        : false;
    this._handleChangingLightboxes(index);
  };

  _handleSwipeLeft = (e) => {
    const index = this._openLightbox.index + 1;
    this._handleChangingLightboxes(index);
  };

  _handleSwipeRight = (e) => {
    const index = this._openLightbox.index - 1;
    this._handleChangingLightboxes(index);
  };

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    const gesture = new TinyGesture(this);
    const callback = (e) => {};
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
      gesture.on("swiperight", this._handleSwipeRight);
      gesture.on("swipeleft", this._handleSwipeLeft);
    });
    this.addEventListener("LightboxClosed", () => {
      this._openLightbox = null;
      document.removeEventListener("keyup", this._handleKeyup);
      gesture.off("swiperight", callback);
      gesture.off("swipeleft", callback);
    });
  }

  disconnectedCallback() {
    gesture.destroy();
    super.disconnectedCallback();
  }
}

customElements.define("lightbox-carousel", LightboxCarousel);
