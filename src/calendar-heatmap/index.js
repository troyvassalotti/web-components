/**
 * @file Creates a Heatmap web component
 * Accepts data in the form of JSON as [{"date": "YYYY-MM-DD", "time": "00:00"}]
 */
import { html, css, LitElement } from "lit";

export class CalendarHeatmap extends LitElement {}
customElements.define("calendar-heatmap", CalendarHeatmap);
