# web-components

Web Components I've made

## How to Use

If you're not importing them into your app (which means you're handling bundling, etc.), then use them with [import maps](https://github.com/WICG/import-maps).

### Polyfill

If you're using a browser that does not support import maps, here is a polyfill from <https://gist.github.com/dy/dfe659c662279089369986cbc0fa4060>.

```html
<!-- Uncompressed -->
<script id='import-maps-polyfill'>
const imports = {}

// intercept all subsequent scripts before init
;(new MutationObserver(rx=>rx.forEach(({target:s}) => {
  if (s.tagName !== 'SCRIPT' || s.im) return

  if (s.getAttribute('type') === 'importmap') {
    Object.assign(imports, JSON.parse(s.textContent).imports)
  }
  else {
    s.textContent = s.textContent.replace(
    // find any static import
    /(from\s+|import\s+)['"]([\w\-]+)['"]/g,
    (unmodified, action, selector) => {
      // If we can find a mapped path...
      const mapped = imports[selector]
      return mapped ?
        // ...then update the import to use that mapped URL instead.
        `${action}/* ${selector} */ '${mapped}'` :
        unmodified;
    });
    s.im=true
  }
}))).observe(document, {childList:true,subtree:true})
</script>

<script type="importmap">
{
  "imports": {
    "lit": "https://cdn.skypack.dev/lit@2",
    "d3": "https://cdn.skypack.dev/d3@7"
  }
}
</script>

<script type="module">
  // Link to the script
</script>
```

```js
// Compressed
const t={};new MutationObserver((e=>e.forEach((({target:e})=>{"SCRIPT"!==e.tagName||e.im||("importmap"===e.getAttribute("type")?Object.assign(t,JSON.parse(e.textContent).imports):(e.textContent=e.textContent.replace(/(from\s+|import\s+)['"]([\w\-]+)['"]/g,((e,r,n)=>{const o=t[n];return o?`${r}/* ${n} */ '${o}'`:e})),e.im=!0))})))).observe(document,{childList:!0,subtree:!0});
```
