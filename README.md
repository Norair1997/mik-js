# mik-js v0.1.0

A lightweight (~1.66KB) easy to use Javascript Library to build fast web applications 

Support: (IE 10+, Firefox 3.6+, Chrome 8+, Safari 5.1+, Opera 12.1+)

## How to install

Just bind it in the 'head' or generally before you wanna use it
```HTML
<head>
  ...
  <script src="mik.min.js"></script>
</head>
```

## How to use it

### mik.on() - Binding multiple events to multiple elements
```Javascript
// bind to the element with the id "foo" a click function
mik.on("#foo", {click: doSomething});


// as soon as "DOMContentLoaded" => init triggers AND when you scroll doSmoothScroll triggers too
mik.on(document, {
	DOMContentLoaded: init, 
	scroll: doSmoothScroll
});

// all elements that have the todo class, the button with id addBtn and the body
// start to listen to the events click, mousemove and touchstart
mik.on([".todo", "#addBtn", document.body], {
	click: someHandler,
	mousemove: callThisFunction,
	touchstart: callThisFunction
});

// now we want to remove some events ...
mik.on([document.body, "#addBtn"], {
	click: someHandler
}, true); // <--- if the 3. parameter is true, then it removes the events

// you can also select elements nested inside other elements
mik.on(["#content .container button", document.links], {click: doSomething});

// anonymous function work too
mik.on(".inputField", {
	click: function(e) {
		var inputField = e.target;
		// do something with inputField
	},
	focus: doSomething
});

```
### mik.create() - Creating HTML Elements in a new easy way
```Javascript

// We create a div with an id, classes, data attribute, append it to document body
// and set two event listener
var myContainer = mik.create("div", {
	className: "container whatever",
	id: "big-container",
	"data-something": 14,
	insertEnd: document.body,
	on: {
		click: doSomething,
		scroll: doScroll
	}
});

var myBigTitle = mik.create("h1", {
	textContent: "An awesome title",
	className: "title",
	style: "color:#af0",
	// inserts as first Child from myContainer
	insertBegin: myContainer
});

var mySubTitle = mik.create("h2", {
	textContent: "Small Subtitle",
	// appends as last Child from myContainer
	insertEnd: "#big-container" // you can select the parent also with its #id
});

// we create two simple paragraphs, without appending it anywhere
var paragraph1 = mik.create("p", {textContent: "Lorem ipsum"});
var paragraph2 = mik.create("p", {textContent: "Hello World"});

var paragraphContainer = mik.create("div", {
	class: "container",
	id: "p-container"
}, [paragraph1, paragraph2]); // <--- We say, p1 and p2 are children from paragraphContainer


// but wait...we didn't append paragraphContainer ...
// no problem -> mik.update() is the solution

```
### mik.update() - Updating HTML Elements in a new easy way
```Javascript
// We want to update our elements
mik.update("#p-container", {
	// our container from before with the id "p-container"
	// gets appended to document.body
	insertEnd: document.body,
	// and it gets an event listener for click
	on: {click: someClickEvent}
});


// we change the style and add two event listener to all input fields(type=text) inside #myForm
// and all elements with the class "textareas"
mik.update(["#myForm input[type='text']", ".textareas"], {
	style: "font-size: 18px; color:#54a",
	on: {
		input: checkInput,
		focus: showHints
	}
});


var myButton = mik.create("button", {
	textContent: "Normal Button"
	insertEnd: "#some-container",
});

window.setTimeout(function() {
	// after 3 seconds
	// we change the textContent and add a class
	mik.update(myButton, {
		textContent: "Super Button",
		className: "button"
	});
}, 3000);

```
### mik.select() - Selecting Elements

```Javascript


// returns inputElements[] Array with all elements with the inputFields class
var inputElements = mik.select(".inputFields");

// returns someContainer[] Array with all elements with .someDiv class inside #content
// and the #specialDiv
var someContainer = mik.select(["#content .someDiv", "#specialDiv"]);


```


### mik.request() - Making requests 

```Javascript

mik.request("http://localhost/testValues.php", {
	method: "GET",
	onSuccess: function(request){ console.log(request.responseText); },
	onError: (e) => {console.log("Something bad happened")}
});


mik.request("http://www.norair.at/mik-js/testValues.php", {
	method: "POST",
	data: "parameterA=hello&parameterB=world",
	onSuccess: buildView,
	onError: (e) => {console.log("Something bad happened")}
})

```

## Some important notes
### mik.on(selector, events, removeBoolean)

```Javascript
selector can be a Node|String|Array

// example for Node: 
document.body or myDiv or document.links[0] or document.links

// example for String: 
"#someDiv" or ".inputFields div.p" or "form input"

// example for Array: 
[document.body, "#someDiv", ".inputFields div.p"]



events is a object with key:value pairs

key is the trigger like "click" or "scroll"
value is the function like callThisFunction or function() {// do Stuff}
mik.on(".foo", {
	// works also with "" 
	"click": doSomething,
	scroll: doSomething
})


removeBoolean
default: false => add events
if set to true => remove events


```
### mik.create(type, config, children)

```Javascript
type must be String

// examples for type:
"input" or "button" or "script" or "img" or "div" or "span"

config is a object with key:value

// examples
{
	textContent: "Bla blub",
	id:          "some-unique-id"
	className:   "foo bar",
	insertEnd:   HTMLNode or "#someID",
	insertBegin: HTMLNode or "#someID",
	style:       "background-color: red; transform: scale(1.2)",
	"data-brrr": "some data1",
	"data-mrrr": "some more data",
	// if type == input
	placeholder: "Some placeholder"
	// <img> tags have
	src: "www.myurl.at/image.jpg"
	// and all other attributes the elements have
	// ...
	on: {
		click: someHandler,
		"scroll": someOtherHandler,
		load: whatever,
		blur: (e) => { console.log(e.target) }
	}
}


children is like the selector from mik.on(selector, ...);

selector can be a Node|String|Array
// see above for more details

```
### mik.update(selector, config, children)

```Javascript

config and children
the same like above mik.create

```

### mik.select() - Selecting Elements
```Javascript
selector can be a Node|String|Array

// example for Node: 
document.body or myDiv or document.links[0] or document.links

// example for String: 
"#someDiv" or ".inputFields div.p" or "form input"

// example for Array: 
[document.body, "#someDiv", ".inputFields div.p"]

this returns 


```