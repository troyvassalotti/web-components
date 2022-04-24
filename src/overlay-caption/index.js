/**
 * @file Creates a web component for images with captions that appear on hover as an overlay
 */

import { html, css, LitElement } from "lit";

export class OverlayCaption extends LitElement {
  static styles = css`
    *,
    ::slotted(*) {
      box-sizing: border-box;
    }

    *::after,
    *::before {
      box-sizing: inherit;
    }

    :host {
      margin-inline: auto;
    }

    img,
    ::slotted(img) {
      block-size: auto;
      display: block;
      inline-size: auto;
      margin-inline: auto;
      max-inline-size: 100%;
    }

    /* part="co-container" */
    .caption-container {
      display: inline-block;
    }

    /* part="co-figure" */
    .caption-figure {
      filter: drop-shadow(2px 4px 6px hsl(0 0% 50%));
      inline-size: fit-content;
      margin: 0;
      position: relative;
    }

    /* part="co-caption" */
    .caption {
      display: grid;
      inset: 0;
      opacity: 0;
      place-items: center;
      position: absolute;
      transition: 0.3s ease;
    }

    .caption:hover {
      background-color: hsl(0 0% 0% / 0.5);
      opacity: 1;
    }

    .caption :first-child,
    ::slotted(*:not(img)) {
      background: white;
      color: black;
      font-size: clamp(1rem, 2vw, 2rem);
      font-weight: bold;
      inline-size: 100%;
      padding: 1ch;
      text-align: center;
    }
  `;

  static properties = {
    url: { type: String },
  };

  /**
   * Check if there are any slotted images missing alt text.
   */
  get missingAltText() {
    return this.querySelector('img:not([alt])') ?? null;
  }

  constructor() {
    super();
    this.url = "#";
  }

  render() {
    return html` <a part="co-container" class="caption-container" href=${this.url}>
      <figure part="co-figure" class="caption-figure">
        <slot name="image">
          <img
            src="https://via.placeholder.com/500"
            width="500"
            height="500"
            alt=""
            decoding="async"
            loading="lazy" />
        </slot>
        <figcaption part="co-caption" class="caption">
          <slot name="caption"><span>Your caption goes here</span></slot>
        </figcaption>
      </figure>
    </a>`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.missingAltText) {
      return;
    } else {
      this.missingAltText.alt = "";
      console.error("HEY YOU - add alt text to your images. I did it for you, but please remember to do it yourself next time.")
    }
  }
}

customElements.define("overlay-caption", OverlayCaption);
