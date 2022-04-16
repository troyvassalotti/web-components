/**
 * @file Creates a web component for images with captions that appear on hover as an overlay
 */

export class OverlayCaption extends HTMLElement {
  constructor() {
    super();

    /** Set a default for the caption's URL */
    const url = this.dataset.href || "#";

    const template = `
        <style>
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
              background-color: hsl(0 0% 0% / .5);
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
          </style>
          
          <a part="co-container" class="caption-container" href=${url}>
            <figure part="co-figure" class="caption-figure">
              <slot name="image">
                <img src="https://assets.codepen.io/1804713/default.png" width="500" height="500" alt="" class="caption-image" decoding="async" loading="lazy" />
              </slot>
              <figcaption part="co-caption" class="caption">
                <slot name="caption">
                  <p>this is the title</p>
                </slot>
              </figcaption>
            </figure>
          </a>
          `;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    /**
     * Check to see if the slotted image has alt text and log an error if not
     * @type {Element}
     */
    const heyAddAltText = this.querySelector("img:not([alt])");
    heyAddAltText
      ? ((heyAddAltText.alt = ""), console.error("Add alt text to your images"))
      : false;
  }
}

customElements.define("overlay-caption", OverlayCaption);
