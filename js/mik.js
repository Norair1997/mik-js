var mik = {
	ver: "0.1.1",
	d: document,
	on: function(selector, config, remove) {
		if (remove === null) remove = false;
		var selectedElements = mik.select(selector);

		for (var i = 0, len = selectedElements.length; i < len; i++) {
			for (var property in config) {
		    	if (config.hasOwnProperty(property) && !remove) {
					selectedElements[i].addEventListener(property, config[property], false);
				} else {
					selectedElements[i].removeEventListener(property, config[property], false);
				}
			}
		}
		return selectedElements;
	},

	request: function(url, config) {
	    var method = "GET", 
	        parameters = "", 
	        callbacks = {"onSuccess": false, "onError": false};

	    for (var property in config) {
	      if (config.hasOwnProperty(property)) {
	        var value = config[property];
	        switch(property) {
	        	case "method": method = value; break;
	        	case "onSuccess":
	        	case "onError": callbacks[property] = true; break;
	        	case "data": parameters = value; break;
	        }
	      }
	    }

	    var request = new XMLHttpRequest();
	    request.onload = function () {
	      // if the dev defined an onSuccess function, we call the callback returning the request Object
	      if (request.status === 200 && callbacks.onSuccess) config.onSuccess(request);
	      // if the dev defined an onError function, we call the callback returning the request Object
	      if ((request.status === 404 || request.status === 500) && callbacks.onError) config.onError(request);
	    }
	    
	    request.open(method, url, true);
	    
	    request.setRequestHeader("Content-Type",
	      "application/x-www-form-urlencoded; charset=UTF-8");
	    request.send(parameters);
  	},

  	select: function(selector) {
  		var selectedElements = [];
		if (!Array.isArray(selector)) selector = [selector];
		var len = selector.length - 1;
		for (var e = 0; e <= len; e++) {
			var elem = selector[e];
			if (typeof elem === "string") {
				if (elem.charAt(0) == "#" && elem.split(" ").length == 1) {
					selectedElements.push(mik.d.getElementById(elem.slice(1)));
				} else if (elem.charAt(0) == "." && elem.split(" ").length == 1) {
					loopPush(mik.d.getElementsByClassName(elem.slice(1)));
				} else {
					loopPush(mik.d.querySelectorAll(elem));
				}
			} else if (elem instanceof HTMLElement || elem instanceof HTMLDocument || elem instanceof window.constructor) {
				selectedElements.push(elem);
			} else if (elem instanceof HTMLCollection) {
				loopPush(elem);
			}
		}

		function loopPush(elm) {
			for (var i = 0, len = elm.length; i < len; i++) {
				selectedElements.push(elm[i]);
			}
		}
		return selectedElements;
  	},

	create: function(type, config, children) {
		return mik.update(mik.d.createElement(type), config, children);
	},

	update: function(selector, config, children) {
		if (children === undefined) children = [];
		var selectedElements = mik.select(selector), children = mik.select(children);
		for (var i = 0, len = selectedElements.length; i < len; i++) {
			var element = selectedElements[i];
			for (var property in config) {
		    	if (config.hasOwnProperty(property)) {
					var value = config[property];
			        if (property == "on") {
			        	mik.on(element, value);
			        } else if (property.includes("insert")) {
			        	var parent = value;
			        	if (typeof value === "string") parent = mik.d.getElementById(value.slice(1));
		        		if (property.includes("End")) {
		        			parent.appendChild(element);
		        		} else {
		        			parent.insertBefore(element, parent.childNodes[0]);
		        		}
			        } else if (property.substring(0,4) == "data") {
			        	element.setAttribute(property, value);
			        } else {
			       		element[property] = value;
			        }
				}
			}
			for (var j = 0, lenA = children.length; j < lenA; j++) {
				element.appendChild(children[j]);
			}
		}
		if (len === 1) return selectedElements[0]; else selectedElements;
	}
}