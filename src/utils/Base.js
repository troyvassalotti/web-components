/**
 * @file Creates a Base class for other components to extend from
 * @ignore This is not being used currently, but kept for reference
 */

import { LitElement, css } from "lit";

export class Base extends LitElement {
  static get styles() {
    css`
      * {
        box-sizing: border-box;
      }

      *::after,
      *::before {
        box-sizing: inherit;
      }
    `;
  }
}
