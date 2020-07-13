# d3 + Greensock

## Concept
Ok, so I've struggled a lot with svg.js and now I want to try a different approach. I'll use greensock for all the svg animation and manipulation. As Greensock doesn't have its own API for generating SVGs and because d3 is also useful for other stuff like dynamic dropdown menus, I'll use d3 to generate the svg elements.

## Plan
- Figure out if Greensock can animate text along paths for free (looks like it)
- Use d3 to dynamically generate rectangles at certain positions
- Use d3 to bind data (texts) to the svg elements
- Use Greensock to animate the whole lot
I'll do all of this in vizhub and dump code here from time to time as a back up. Doing it on Vizhub instead of codepen has the added benefit I'll auto find out if I'm sing any premium features. Codepen has those built in, vizhub doesn't.

[Link to basic setup](https://vizhub.com/Razpudding/2e2ed0da09f1427696e53734e901bf47?edit=files&file=index.js)
[Link to working prototype](https://vizhub.com/Razpudding/fd414b707a084035933e5521ee650c51?edit=files&file=index.js)
[Link to choreographed work](https://vizhub.com/Razpudding/ac3f7015fe914b4c9d4b3bc8f4b16922?edit=files&file=index.js)

## Notes
- TextPath can tweaked and manipulated further. The amount of space for the text can be changed for instance. [link](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath)