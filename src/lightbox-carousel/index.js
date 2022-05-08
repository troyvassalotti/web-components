import { LitElement, css, html } from "https://cdn.skypack.dev/lit@2.2.3";

export class LightboxCarousel extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        gap: 1rem;
      }
    `;
  }

  static get properties() {
    return {
      _open: { state: true },
    };
  }

  constructor() {
    super();
    this._open = false;
  }

  static get _getChildren() {
    return this.querySelectorAll("light-box");
  }

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._children = this.querySelectorAll("light-box");

    this.addEventListener("LightboxOpened", () => {
      console.log("opened");
      /**
       * When opened, this component should...
       * - Know what Lightbox is currently open
       * - Know all the Lightboxes to the left and right of the open one
       *  - Maybe it's just an array in order of elements on the DOM instead of figuring out the math
       * - On arrow presses, close the current Lightbox and open the corresponding Lightbox
       */
      console.log(this._children);
      this._openLightbox = this.querySelector("light-box[open]"); // Try accessing it from this._children instead
      console.log("Lightbox is:", this._openLightbox);
    });
    this.addEventListener("LightboxClosed", () => {
      console.log("closed");
      this._openLightbox = null;
      console.log("Lightbox is:", this._openLightbox);
    });
  }
}

customElements.define("lightbox-carousel", LightboxCarousel);
