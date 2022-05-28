/**
 * @file Creates a Heatmap web component
 * Accepts data in the form of JSON as [{"date": "YYYY-MM-DD", "time": "00:00"}]
 */

import * as d3 from "d3";

export class CalendarHeatmap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.template = `
        <style>
          * {
            box-sizing: border-box;
          }
    
          *::after,
          *::before {
            box-sizing: inherit;
          }
      
          #heatmap {
            padding-block: 1em;
            overflow: auto;
          }
    
          svg.calendar {
            inline-size: max(56.25rem, 100%);
          }
        </style>
    
        <div id="heatmap" part="heatmap"></div>
        `;
  }

  /**
   * Define the location of the JSON file in the props
   * @returns {string}
   */
  get dataSrc() {
    return this.dataset.src;
  }

  /**
   * Fetch the data from the src
   * @returns {Promise<Map<unknown, unknown>>}
   */
  async getData() {
    const response = await fetch(this.dataSrc);
    const json = await response.json();
    return new Map(json.map((value) => [value["date"], value["time"]]));
  }

  /**
   * Take the fetched data and return the min and max years to use in the heatmap
   * @param data
   * @returns {Promise<{start: number, end: number}>}
   */
  async getDates(data) {
    const all = [];
    for (const [key, value] of data) {
      all.push(parseInt(key));
    }

    const min = Math.min.apply(null, all);
    const max = Math.max.apply(null, all);

    return {
      start: min,
      end: max + 1,
    };
  }

  async connectedCallback() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = this.template;

    const dataset = await this.getData();
    const dates = await this.getDates(dataset);

    // The svg are made responsive within setting the width and height attr to 100%
    const width = 960;
    const height = 136;
    const cellSize = 17;
    const mainStrokeColor = "currentColor";
    const defaultStrokeWidth = "0.1px";
    const boldedStrokeWidth = "1px";
    const outerBorderWidth = "1.5px";

    // Create the color scale
    const color = d3
      .scaleQuantize()
      .domain([0, 23])
      .range(["#b1deff", "#54b1f5", "#0264a9", "#002b4c"]);

    // Create the overall SVG element
    const svg = d3
      .select(shadowRoot.querySelector("#heatmap"))
      .selectAll("svg")
      .data(d3.range(dates.start, dates.end))
      .enter()
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("class", "calendar")
      .append("g")
      .attr("transform", `translate(${(width - cellSize * 53) / 2}, ${height - cellSize * 7 - 1})`);

    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", mainStrokeColor)
      .attr("stroke-width", defaultStrokeWidth)
      .selectAll("rect")
      .data((d) => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", (d) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
      .attr("y", (d) => d.getDay() * cellSize)
      .datum(d3.timeFormat("%Y-%m-%d"))
      .attr("fill", (d) => color(parseInt(dataset.get(d))));

    const Days = shadowRoot.querySelectorAll(".day");
    Days.forEach((day) => {
      if (day.hasAttribute("fill")) {
        d3.select(day)
          .on("mouseover", function () {
            d3.select(this).attr("stroke-width", boldedStrokeWidth);
          })
          .on("mouseout", function () {
            d3.select(this).attr("stroke-width", defaultStrokeWidth);
          })
          .append("title")
          .text(
            (d) => `Date: ${d}
Time: ${dataset.get(d)}`
          );
      }
    });

    svg
      .append("text")
      .attr("transform", `translate(-6, ${cellSize * 3.5})rotate(-90)`)
      .attr("font-size", "1rem")
      .attr("text-anchor", "middle")
      .attr("fill", mainStrokeColor)
      .text((d) => d);

    // Create the borders between the months
    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", mainStrokeColor)
      .attr("stroke-width", outerBorderWidth)
      .selectAll("path")
      .data((d) => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append("path")
      .attr("class", "month")
      .attr("d", function (d) {
        const t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
          d0 = d.getDay(),
          w0 = d3.timeWeek.count(d3.timeYear(d), d),
          d1 = t1.getDay(),
          w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return `M${
          (w0 + 1) * cellSize
        }, ${d0 * cellSize}H${w0 * cellSize}V${7 * cellSize}H${w1 * cellSize}V${(d1 + 1) * cellSize}H${(w1 + 1) * cellSize}V0H${(w0 + 1) * cellSize}Z`;
      });

    const axisScale = d3
      .scaleBand()
      .domain([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ])
      .range([0, width - 50]);

    const xAxis = d3.axisTop(axisScale).tickSize(0).tickPadding("3");
    svg
      .append("g")
      .attr("id", "x-axis")
      .call(xAxis)
      .selectAll("path")
      .attr("stroke", "transparent");
  }
}

customElements.define("calendar-heatmap", CalendarHeatmap);
