/**
 * @file Creates a component for displaying a keyboard typing animation
 * Respects prefers-reduced-motion
 */

import { css, html, LitElement } from "lit";

export class KbTypewriter extends LitElement {
  static get styles() {
    return [
      css`
        * {
          box-sizing: border-box;
        }

        *::after,
        *::before {
          box-sizing: inherit;
        }

        :host {
          display: grid;
          justify-content: start;
        }

        ::slotted(*) {
          border-inline-end: 3px solid transparent;
          color: inherit;
          overflow: hidden;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: no-preference) {
          ::slotted(*) {
            animation-delay: var(--kb-delay-typing, 1s), var(--kb-delay-cursor, 0s);
            animation-direction: normal, normal;
            animation-duration: var(--kb-duration-typing, 1.5s), var(--kb-duration-cursor, 0.5s);
            animation-fill-mode: both, none;
            animation-iteration-count: var(--kb-count-typing, 1), var(--kb-count-cursor, 10);
            animation-name: kb-typing, kb-cursor;
            animation-play-state: running, running;
            animation-timing-function: steps(var(--kb-steps-typing, 25)),
              steps(var(--kb-steps-cursor, 25));
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  /**
   * Appends a Light DOM <style> element to allow use of the defined animations
   * @description kb-typing hammers in the white-space rules to allow for wrapping on small screens but also turning off the wrapping when the animation is done.
   * @private
   */
  _createAnimationStyles() {
    const animations = document.createElement("style");

    animations.innerHTML = css`
      @keyframes kb-typing {
        0% {
          inline-size: 0;
        }

        99% {
          inline-size: 100%;
          white-space: nowrap;
        }

        100% {
          white-space: normal;
        }
      }

      @keyframes kb-cursor {
        0% {
          border-inline-end-color: currentColor;
        }

        100% {
          border-inline-end-color: transparent;
        }
      }
    `;

    this.prepend(animations);
  }

  render() {
    this._createAnimationStyles();
    return html` <slot part="kb-text"></slot>`;
  }
}

customElements.define("kb-typewriter", KbTypewriter);
