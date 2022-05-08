/**
 * @file Creates a component with clouds flowing in the background.
 * @attribution https://codepen.io/shshaw/pen/DxJka
 */

import { LitElement, css, html, nothing } from "https://cdn.skypack.dev/lit@2.2.3";

export class CloudySky extends LitElement {
  static get styles() {
    return css`
      /*
       * These apply all the time
       */
      * {
        box-sizing: border-box;
      }

      *::after,
      *::before {
        box-sizing: inherit;
      }

      .hillside {
        display: block;
      }

      .hillside path {
        fill: hsl(145, 63%, 42%);
      }

      /*
       * These apply if the user specifically requests reduced motion
       */
      @media (prefers-reduced-motion: reduce) {
        .sundial,
        .sundialWrapper {
          display: none;
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        /*
         * These only apply if the user wants motion
         */
        .shell {
          padding-block-start: 1ch;
        }

        .wrapper {
          position: relative;
        }

        .slotArea {
          z-index: 3;
        }

        .sunset {
          display: none;
        }

        .sundial {
          background: transparent;
          border: none;
          color: currentColor;
          cursor: pointer;
          padding-block: 0;
          padding-inline: 1ch;
          position: absolute;
          right: 0;
          top: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes float {
          from {
            transform: translateX(100%) translateZ(0);
          }

          to {
            transform: translateX(-15%) translateZ(0);
          }
        }

        @keyframes fadefloat {
          0%,
          100% {
            opacity: 0;
          }

          5%,
          90% {
            opacity: 1;
          }
        }

        [data-clouds] {
          animation: fadeIn 3s ease-out;
          block-size: clamp(30%, 15vw, 60%);
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          position: absolute;
          user-select: none;
        }

        .cloud {
          animation-duration: 120s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: float, fadefloat;
          animation-timing-function: linear;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABgCAYAAACTzNnjAAAFCklEQVR42u3d34uVRRjA8YMsEi0iSwhdRBGhSJgZiNRFIkWhQVEXBipKUVBBLCF6k0h4UxFkBLq4QT/Qiyi80EgxCjXMWqOMtqy0bBNja92yXatN3c3pGc9sHU/v+X3emWfe93vx+QN23u+e95x5Z94pmNWFQo5NEytErzgoBsSIOCf+FqbEBTEhzophcVTsFxvFEjE152PZHGMukbcB6BAPij0uqgtl0bXCBvyjeFPcS2wEWc0y0ec++Ywnf7rwbyc8grQ6RY8Y9RhhJT+Jde4TmghzFuR08bo4ryDEpE/N58QUYsx+kFPcD4yzCkMsZz+1uwkyu0HeKYYiCLHcN2I2QWYnSPudbHubfy37NuFu4wQZeZD2k2Uw4hDLHRZdBBnnH3K/5ykcX86IeQQZl6civ0XXYv/RlhJkHLZkOMTypz7dBKnbyzmJsfTZeTdB6vRszmIsjXI5QeryWMa/M9ZinzjdTJA63CLGcxzjpD/ElQQZfq3iKDFe8lSHIAPqI8L/6SHIMB4nvorTQQsI0v+teoz4KjpBkH7tIrqaNhCkH9cnbK5C8q/uywiSHzKabCLIdM3K+QR4o8YysfVWcZDvElnD1hNkOi5XuilLu5MlOyzni3vESnGfWCRuIMjm1zgSWPM7GWvNXdonXkdM8Q0dCwmytu8Iy/vK9B3iRoJMnghnqifc8jb7yXkXQf5nLWGo2WR2HUGuLrxPDKq25D6d9yBPE4I6/e6rVO6CnMpkuFq/eLmFKwtyMRde/dOg2XkKkvlH/X5P9ZNSWZBvcMGjMJza6iJlQe7nYkfjozwE+TkXOiprsx7kES5yVOzLYK/IcpA/cJGj806Wg/yaCxzlzsersxpkPxc4SruzGuQBLm603yU7DPOQUOSJWIK0E6j2lcvPm+JJVp+674oDbiFuv5t/fEXs5cJG65DmIO3KY3vG3yCLbXO1N1xVkB3uWfQQFye3rtUS5DN1bC5C9j0cOki7XOwUFwJOb6gg7TmCW1lMizI7QwQ5nW2qqGCv7yDtwsxfGXhU0OczyKvECIOOKvb5CnKa2+TDoKOat3wFyaIH1ONFH0H2MNCo00NpBzmXR39owIy0gzzOIKNOv6X9LHsZg4wGp3xsM/ZMoUfF3aaZ4++qBDnIIKMNzrsHKb11Lb6oEORtDCRSYB81f+vWxzYUJBv2kTYb5vx6gzzHgMHTjsUXagV5BwMFzz78d5NYQpDbGCAEcOzissaEIL9kcBDIx0lBsrwMIW0uD3KcQUHgqaEFpUGyLQGhnSgNkgGBBg8QJDQ5Phkky82g5bvkNQXDscDQY6MNcpiBgBL9NsjDDAS0LPq1Qb7EQECJicLFSUkGAkpMLgMaYzCgKci3GQxomPqZDPImBgMa9uOULifnDWcI7VRpkIsYEAR2sHwX2GcMCgJak/QKPh4lIsgcpOhM2iv7JIODAPqqvY7vPQYInlf6zKsWpN2iOMBAwZMD9bzSudPwvh+kr3gofJ0vve/ikxIp36pXNHosiD2j5gMGD2ksyG3lJK917qc5A4l2eNW04Wi5OaZ41DADilZu0xtMmw/fXCV+ZnDRoFFTfBdpaudlLxVfsXMRNYy7W3SH8XSAu/01bo8s/kL8xQWAM+JC7DIeDnCvZqZ4RGxxi3/3iUPOJ+5TtRXfG/v6jeadNMVjlqsZquG0uwU164ybg2vFuPuh2ax23tkm3N91VLwmbjVNvPT+H7Ro4730ITNPAAAAAElFTkSuQmCC");
          background-repeat: no-repeat;
          background-size: auto 100%;
          block-size: 4.375rem;
          filter: invert(80%);
          inline-size: 100%;
          position: absolute;
          z-index: 1;
        }

        .cloud.foreground {
          block-size: 10%;
          min-block-size: 1.25rem;
          z-index: 2;
        }

        .cloud.background {
          animation-duration: 210s;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAqCAYAAAAUJM0rAAACFUlEQVRo3u3aPSwDYRzH8UZEbAYiYrDYjLZGpIPBJLGwSKwi0k1iYBKDdFJsEiMxSZgsFZJGiGjqJWEhSKuaNKRUG8r5PfI8SXOud72+PH2eu2f47Ndv7+V5/nee/G6bh5MWmIV9iEMWvkGjfiADD7AHk9BU6+PSNK0kPAINwwXkC6KU6gvC4HVyKB/clhHHCDnbTqHbSaEaYIv+OK3KyBk274RQrXBXg0B6B/QPkTIUiZTiEIm5gkbZQjXTJ5nG2ZFsocJ1iMQEZQk1VcdIGl2L9Yoeitwj3uocirgRPVRAgEjMoMihkgKFStIzK063QVHYhKF6h/IKFMlKGpaNlhM8Qq1JFIp5gQHeoSIShmJPST/PUElJQ7FN9hivUGmJQxE56OQRKiN5qL/NNY9QKQeEIpdgR7VC9cEqHeGeUyEHXHrMUiWhyKx6BV4dEsNMtNxQI4Ls33h5LidUoEYjXKEXoXZDLbgsEBOzE8qne8fmJhE7oWIujUQcwhyMmy0VSKRRF0cyWlclYMYo1LEKZOgRugpDpVWUot5ZLI8LlwN23bNQKoY1vwpVmmsS6kOFsPRJQl2qENZIqGkVwnp9xb5nUksEcxm2hZlQMcy3OYXTgx0VpOi2pl8/jwqpMP9sF5twBl08ctE7I/dws5l5D5y4OBj51HvdzluYdlik0RL06cjkKpSlB1Span5x/AQb5Hfrxyy/oU5ISeVw53AAAAAASUVORK5CYII=");
          block-size: 9.09090909%;
          min-block-size: 0.5rem;
        }

        .cloud:nth-child(10) {
          animation-delay: -184.61538462s;
          top: 60%;
        }

        .cloud.foreground:nth-child(10) {
          animation-duration: 80s;
          block-size: 35%;
        }

        .cloud.background:nth-child(10) {
          animation-duration: 110s;
          block-size: -3.40909091%;
        }

        .cloud:nth-child(9) {
          animation-delay: -166.15384615s;
          top: 54%;
        }

        .cloud.foreground:nth-child(9) {
          animation-duration: 84s;
          block-size: 32.5%;
        }

        .cloud.background:nth-child(9) {
          animation-duration: 114s;
          block-size: -2.15909091%;
        }

        .cloud:nth-child(8) {
          animation-delay: -147.69230769s;
          top: 48%;
        }

        .cloud.foreground:nth-child(8) {
          animation-duration: 88s;
          block-size: 30%;
        }

        .cloud.background:nth-child(8) {
          animation-duration: 118s;
          block-size: -0.90909091%;
        }

        .cloud:nth-child(7) {
          animation-delay: -129.23076923s;
          top: 42%;
        }

        .cloud.foreground:nth-child(7) {
          animation-duration: 92s;
          block-size: 27.5%;
        }

        .cloud.background:nth-child(7) {
          animation-duration: 122s;
          block-size: 0.34090909%;
        }

        .cloud:nth-child(6) {
          animation-delay: -110.76923077s;
          top: 36%;
        }

        .cloud.foreground:nth-child(6) {
          animation-duration: 96s;
          block-size: 25%;
        }

        .cloud.background:nth-child(6) {
          animation-duration: 126s;
          block-size: 1.59090909%;
        }

        .cloud:nth-child(5) {
          animation-delay: -92.30769231s;
          top: 30%;
        }

        .cloud.foreground:nth-child(5) {
          animation-duration: 100s;
          block-size: 22.5%;
        }

        .cloud.background:nth-child(5) {
          animation-duration: 130s;
          block-size: 2.84090909%;
        }

        .cloud:nth-child(4) {
          animation-delay: -73.84615385s;
          top: 24%;
        }

        .cloud.foreground:nth-child(4) {
          animation-duration: 104s;
          block-size: 20%;
        }

        .cloud.background:nth-child(4) {
          animation-duration: 134s;
          block-size: 4.09090909%;
        }

        .cloud:nth-child(3) {
          animation-delay: -55.38461538s;
          top: 18%;
        }

        .cloud.foreground:nth-child(3) {
          animation-duration: 108s;
          block-size: 17.5%;
        }

        .cloud.background:nth-child(3) {
          animation-duration: 138s;
          block-size: 5.34090909%;
        }

        .cloud:nth-child(2) {
          animation-delay: -36.92307692s;
          top: 12%;
        }

        .cloud.foreground:nth-child(2) {
          animation-duration: 112s;
          block-size: 15%;
        }

        .cloud.background:nth-child(2) {
          animation-duration: 142s;
          block-size: 6.59090909%;
        }

        .cloud:nth-child(1) {
          animation-delay: -18.46153846s;
          top: 6%;
        }

        .cloud.foreground:nth-child(1) {
          animation-duration: 116s;
          block-size: 12.5%;
        }

        .cloud.background:nth-child(1) {
          animation-duration: 146s;
          block-size: 7.84090909%;
        }
      }

      @media (prefers-color-scheme: dark) {
        .hillside path {
          fill: hsl(220, 7.2%, 40%);
        }

        .cloud {
          filter: none;
        }
      }
    `;
  }

  static get properties() {
    return {
      buttonSize: { type: String },
      hillside: { type: Boolean },
      _active: { state: true },
    };
  }

  constructor() {
    super();
    this.buttonSize = "24px";
    this.hillside = false;
    this._active = false;
  }

  _setClouds() {
    this._active = !this._active;
  }

  firstUpdated() {
    const _intersectionObserver = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this._setClouds();
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(_intersectionObserver);
    observer.observe(this);
  }

  render() {
    return html` <div class="wrapper shell">
      <div data-clouds class="${!this._active ? "sunset" : nothing}">
        <div class="cloud foreground"></div>
        <div class="cloud background"></div>
        <div class="cloud foreground"></div>
        <div class="cloud background"></div>
        <div class="cloud foreground"></div>
        <div class="cloud background"></div>
        <div class="cloud background"></div>
        <div class="cloud foreground"></div>
        <div class="cloud background"></div>
        <div class="cloud background"></div>
      </div>
      <div class="wrapper sundialWrapper" style="block-size: ${this.buttonSize}">
        <button
          title="Turn the clouds on or off."
          type="button"
          name="sundial"
          class="sundial sun"
          @click="${this._setClouds}">
          ${this._active
            ? html` <!-- Sun -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="${this.buttonSize}"
                  height="${this.buttonSize}"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <!-- /Sun -->`
            : html` <!-- Moon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="${this.buttonSize}"
                  height="${this.buttonSize}"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <!-- /Moon -->`}
        </button>
      </div>
      <div class="wrapper slotArea">
        <slot></slot>
      </div>
      ${this.hillside
        ? html` <svg
            class="hillside"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 720 80">
            <path d="M0,80V47.6C0,47.6,333,0,503,0c166,0,217,24.3,217,24.3V80H0z" part="hillside" />
          </svg>`
        : nothing}
    </div>`;
  }
}

customElements.define("cloudy-sky", CloudySky);
