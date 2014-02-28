# jquery-livesvg

Welcome to jQuery plugin making embedded SVGs alive.

## Installation

Just copy `jquery-livesvg.js` anywhere and include it with

    <script src="(your path)/jquery-livesvg.js"></script>


## Usage

You'll have to change both your SVG files and scripts.

### SVG files

To add some action to your SVG images, use one of the following constructions:

* Create a `<defs>` tag like the following:

    &lt;defs&gt;
      &lt;ref id="width"  default="100"/&gt;
      &lt;ref id="height" default="100"/&gt;
      &lt;ref id="angle"  default="30.0"/&gt;
    &lt;/defs&gt;

Now you have defined a set of parameters, namely, `width`, `height` and `angle`.

* Now use defined parameters in XML code like this:

  &lt;g transform="rotate(#angle)"&gt;
    ...
  &lt;/g&gt;

* Go even further and apply some complex computations using `$(...);` construction:

  &lt;g transform="rotate(#alpha $(#width/2); $(#height/2);)"&gt;
    ...
  &lt;/g&gt;

You are free to place any JavaScript expression into the brackets.

**WARNING**: The technology is unsafe. The browser forbids accessing SVG
downloaded from another website, and he is right. Don't 'enliven' SVGs obtained
from your users or other suspicious sources.

### HTML and JavaScript

Now you would probably like to specify values for defined variables. There are
two ways to do that:

* Specify values in `<param>` tags:

  &lt;object type="image/svg+xml" data="rectangle.svg"&gt;
    &lt;param name="width"  value="177" /&gt;&lt;!-- any values here --&gt;
    &lt;param name="height" value="108" /&gt;
  &lt;/object&gt;

* Set values dynamically:

  $("#mysvg").livexml({angle: 42});
  $("#mysvg").livexml({width: 777});
  
## Demo

There is a working example in `examples` folder. Nice demo in progress!