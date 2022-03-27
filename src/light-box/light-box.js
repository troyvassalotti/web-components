/**
 * @file Creates a LightBox Web Component
 */
class LightBox extends HTMLImageElement {
  constructor() {
    super()

    /**
     * Defaults to the base image if no data-lbsrc is provided
     * @type {string}
     */
    const lightboxImage = this.dataset.lbsrc ? this.dataset.lbsrc : this.src

    const lb = document.createElement("div")
    const styles = {
      backgroundColor: `rgba(0, 0, 0, 0.7)`,
      blockSize: "100vh",
      cursor: "zoom-out",
      display: "none",
      inlineSize: "100%",
      inset: 0,
      position: "absolute",
    }

    const lbimg = document.createElement("img")
    lbimg.src = lightboxImage
    lb.appendChild(lbimg)

    /**
     * Iterate over all the props in the styles variable to assign inline styles to the lightbox
     */
    for (const property in styles) {
      lb.style[property] = styles[property]
    }

    lb.addEventListener("click", function () {
      this.style.display = "none"
    })

    this.style.cursor = "zoom-in"
    this.parentNode.insertBefore(lb, this)

    // Center the thing
    this.addEventListener("click", function () {
      lb.style.display = "grid"
      lb.style.placeItems = "center"
    })
  }
}

customElements.define("light-box", LightBox, { extends: "img" })
