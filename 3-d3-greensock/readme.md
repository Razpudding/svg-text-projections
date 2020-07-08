# d3 + Greensock

## Concept
Ok, so I've struggled a lot with svg.js and now I want to try a different approach. I'll use greensock for all the svg animation and manipulation. As Greensock doesn't have its own API for generating SVGs and because d3 is also useful for other stuff like dynamic dropdown menus, I'll use d3 to generate the svg elements.

## Plan
- Figure out if Greensock can animate text along paths for free (looks like it)
- Use d3 to dynamically generate rectangles at certain positions
- Use d3 to bind data (texts) to the svg elements
- Use Greensock to animate the whole lot