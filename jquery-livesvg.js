((function ( $ ) {
  
  var _livesvg = function livesvg(obj, args) {
    args = args || {};
    // getting SVG document tree
    var svg = obj.getSVGDocument();
    $("defs", svg).each(function(i, defs) {
      /* TODO: use svgDocument.defaultView.parameters
       * (http://dev.w3.org/SVG/modules/ref/master/SVGRef.html#ParametersInterface)
       * when they will be implemented.
       */
      var parameters = {};
      /* 1) Collecting static parameters.
       * TODO: url parameters support
       */
      $("ref", defs).each(function(i, ref) {
        var id = ref.getAttribute("id");
        var pname = ref.getAttribute("param") || id;
        if(id in args) {
          var new_default = args[id];
          var old_default = ref.getAttribute("__old_default");
          if(new_default === null) {
            if(old_default !== undefined) {
              ref.setAttribute("default", old_default);
            }
          } else {
            if(old_default === undefined) { 
              ref.setAttribute("__old_default", ref.getAttribute("default"));
            }
            ref.setAttribute("default", new_default);
          }
        }
        var deflt = ref.getAttribute("default");
        parameters[id] = deflt;
        var param = $("param[name=\"" + pname + "\"]", obj);
        if(param.length > 0) {
          if(pname in args) {
            var new_value = args[pname];
            var old_value = param.attr("__old_value");
            if(new_value === null) {
              if(old_value !== undefined) {
                param.attr("value", old_value);
              }
            } else {
              if(old_value === undefined) {
                param.attr("__old_value", param.attr("value"));
              }
              param.attr("value", args[pname]);
            }
          }
          parameters[id] = param.attr("value");
        }
      });
      /* 2) Adding "live" parameters. */
      $("liveref", defs).each(function(i, liveref) {
	var id = liveref.getAttribute("target");
	var equation = liveref.getAttribute("equation");
        var value = null;
        try {
          // WARNING: this implementation is totally UNSAFE!
          value = eval(equation.replace(/#(\w+)/g, "(parameters.$1)" ));
        } catch(exception) {
            console.warn(exception);
        }
        parameters[id] = value;
        /* TODO: use this code when they will implement ref tags properly
        // removing old "live" value (in case it existed)
        $("ref[id=\"" + id + "\"]", defs).remove();
        var ref = svg.createElement("ref");
        ref.setAttribute("id", id);
        ref.setAttribute("param", "__" + id);
        ref.setAttribute("default", value);
        $(defs).append(ref);*/
      });
      /* 3) Applying. */
      var clarify = function(what) {
        return what.replace(/#(\w+)/g, function(s, name) {
          return parameters[name];
        });
      }
      var evaluate = function(what) {
        return clarify(what.replace(/\$\((.*?)\);/g, function(s, expression) {
          return eval(clarify(expression));
        }));
      };
      $(":not(defs, defs *)", svg).each(function(i, element) {
        var attributes = element.attributes, l = attributes.length;
        for(var i = 0; i < l; ++i) {
          var attr = attributes[i];
          var name = attr.name;
          if(attr.livesvg_value !== undefined) {
            if(attr.livesvg_value !== false) {
              attr.value = evaluate(attr.livesvg_value);
            }
          } else {
            var value = attr.value;
            var evaluated_value = evaluate(value);
            if(evaluated_value != value) {
              attr.livesvg_value = value;
              attr.value = evaluated_value;
            } else {
              attr.livesvg_value = false; // WARNING: don't change attribute values!
            }
          }
        }
      });
    });
  };
  
  $.fn.livesvg = function livesvg(args) {
    var result = $("*, object", this).filter("object");
    return result.each(function(i, object) {
      var type = object.getAttribute("type");
      if(type == "image/svg+xml") {
         try {
          _livesvg(object, args);
         } catch(exception) {
           console.warn(exception); 
         }
      } else {
        // ignore.
      }
    });
  };
  
})( jQuery ));