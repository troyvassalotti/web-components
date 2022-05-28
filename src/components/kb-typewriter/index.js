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
          border-inline-end: 2px solid transparent;
          font-size: 5rem;
          color: inherit;
          overflow: hidden;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: no-preference) {
          ::slotted(*) {
            /* name, duration, number of steps, delay, repetitions */
            animation: kb-typing 1.5s steps(25) 1s 1 normal both,
              kb-cursor 500ms steps(25) 10 normal;
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
    return html` <slot part="kb-line1"></slot>`;
  }
}

customElements.define("kb-typewriter", KbTypewriter);
