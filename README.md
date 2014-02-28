# jquery-livesvg

Welcome to jQuery plugin making embedded SVGs alive.

## Installation

Just copy `jquery-livesvg.js` anywhere and include it with

    <script src="(your path)/jquery-livesvg.js"></script>


## Usage

You'll have to change both your SVG files and scripts.

### SVG files

To add some action to your SVG images, use one of the following constructions:

1) Create a `<defs>` tag like the following:

    <defs>
      <ref id="width"  default="100"/>
      <ref id="height" default="100"/>
      <ref id="angle"  default="30.0"/>
    </defs>


Now you have defined a set of parameters, namely, `width`, `height` and `angle`.

2) Now use defined parameters in XML code like this:

    <g transform="rotate(#angle)">
      ...
    </g>


3) Go even further and apply some complex computations using `$(...);` construction:

    <g transform="rotate(#alpha $(#width/2); $(#height/2);)">
      ...
    </g>


You are free to place any JavaScript expression into the brackets.

**WARNING**: The technology is unsafe. The browser forbids accessing SVG
downloaded from another website, and he is right. Don't 'enliven' SVGs obtained
from your users or other suspicious sources.

### HTML and JavaScript

Now you would probably like to specify values for defined variables. There are
two ways to do that:

1) Specify values in `<param>` tags:

    <object type="image/svg+xml" data="rectangle.svg">
      <param name="width"  value="177" /><!-- any values here -->
      <param name="height" value="108" />
    </object>


2) Set values dynamically:

    $("#mysvg").livexml({angle: 42});
    $("#mysvg").livexml({width: 777});

Use

    $("#mysvg").livexml({angle: null})

to return to `angle` it's default value.

## Demo

There is a working example in `examples` folder. Nice demo in progress!
