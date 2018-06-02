
// init is called when "DOMContentLoaded" triggers
function init() {
	// ----------------- TODO(mik.create) EXAMPLE ------------ //

	// create the "Add" button, and set the "click" listener
	var myAddBtn = mik.create("button", {
		textContent: "Add",
		on: {click: addTodo}
	});

	// creating a input field for our todo app
	var myTextfield = mik.create("input", {
		type: "text",
		placeholder: "Write your todo ..."
	});

	// creating a container, setting a class, and appending it to body
	// and we add two children objects (the last parameter)
	var myContainer = mik.create("div", {
		className: "container",
		insertEnd: document.body
	}, [myTextfield, myAddBtn]);


	function addTodo() {
		// if the input field is empty, we don't add anything
		if (myTextfield.value === "") return;

		// we create a div, with the content of input, appending it at ...
		// ..the BEGIN  of the container with the id "todo-container"
		// and we create an anonymous function on click (we add a class)
		mik.create("div", {
			textContent: myTextfield.value,
			className: "todo",
			insertBegin: "#todos-container",
			on: {click: (e) => { e.target.classList.add("completed") }}
		});	
		myTextfield.value = "";
	}

	// here is our container for our todo list
	// we append it to our myContainer
	var todoContainer = mik.create("div", {
		id: "todos-container",
		insertEnd: myContainer
	});

	// ----------------- END TODO EXAMPLE --------------- //


	// ----------------- mik.request/mik.update/mik.on EXAMPLES --------------- //


	mik.request("http://localhost/testValues.php", {
		method: "GET",
		onSuccess: buildView,
		onError: (e) => {console.log("Something bad happened")}
	})

	function buildView(request) {
		var myData = JSON.parse(request.responseText);

		// creating a container for my data
		var dataContainer = mik.create("div", {
			className: "container",
			id: "data-container",
			style: "display: block"
		});

		for (var i = 0; i < myData.length; i++) {
			// creating data items and inserting them to dataContainer
			mik.create("p", {
				textContent: myData[i],
				className: "paragraph",
				insertEnd: dataContainer
			});
		}

		// updating dataContainer object 
		// append it to the body element
		mik.update(dataContainer, {insertEnd: document.body});

		var mySubtitle = mik.create("h3", {
			id: "sub-title-data",
			textContent: "Some Data from an Ajax Call", 
			insertBegin: dataContainer
		});

		var eventOffBtn = mik.create("button", {
			textContent: "Stop the paragraph events", 
			insertEnd: dataContainer,
			"data-event-state": false,
			on: {click: stopParagraphEvents}
		});

		// later on you deside to add event listener to these paragraphs
		// ... and the one eventOffBtn we created before and our title with its #ID
		mik.on([".paragraph", eventOffBtn, "#sub-title-data"], {mousemove: someHandler, touchmove: someHandler});

	}

}



function someHandler(e) {
	if (e.type == "touchmove") e.clientX = e.changedTouches[0].clientX;

	var myParagraph = e.target;
	mik.update(myParagraph, {
		style: "box-shadow: inset "+(e.clientX- myParagraph.offsetLeft)+"px 0 0 #cc5;"
	})
}

function stopParagraphEvents() {

	var myParagraphs = mik.on([".paragraph"], {mousemove: someHandler, touchmove: someHandler}, true);
	// console.log(myParagraphs);
	// returns => Array(4) [p.paragraph, p.paragraph, p.paragraph, p.paragraph]
}


// we want, that the init function triggers when DOMContentLoaded
mik.on(document, {"DOMContentLoaded": init});