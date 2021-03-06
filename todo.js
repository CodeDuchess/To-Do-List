// fetch from the database the to do itmes that have already been defined
function get_todos() {
	var todos = new Array;
	var todos_str = localStorage.getItem("todo");
	if (todos_str !== null) {
	// JSON is javascript object notation-- text format	
		todos =JSON.parse(todos_str);
	}
		return todos;

}
// function will be called when user clicks on the button
function add () {
	var task = document.getElementById('task').value;
	// calls the get todos and retrieves the already existing to do items and adds a new one with push(append)
	var todos = get_todos();
	todos.push(task);
	//stores it -- stringify is a JSON method that converts a JS value to JSON string
	localStorage.setItem('todo', JSON.stringify(todos));

	show();
	// avoid any further actions generated by the click event
	return false;

}
// clear any input left after adding a task
function clearDefault(a) {
	if (a.defaultValue == a.value) {a.value = " "}

};
// called when user clicks on the remove button
function remove () {
	// this refers to current DOM element
	var id = this.getAttribute('id');
	var todos = get_todos();
	// splice will remove item and store locally
	todos.splice(id, 1);
	localStorage.setItem("todo", JSON.stringify(todos));
	// show what is in the databse; nothing will be triggered after the show function has been called
	show();
	return false;
}
// will show the current to do list stored in the database
function show() {
	var todos = get_todos();

	var html = '<ul>';
	for (var i = 0; i < todos.length; i ++) {
		html += '<li>' + todos[i] + '<button class="remove" id= " ' + i + '">Delete</button> </li>';
	};
	
	html += '<ul>';

	// insert the newly generated html in the original document 
	document.getElementById("todos").innerHTML = html;

	// fetch all the buttons that are in the remove class 
	var buttons = document.getElementsByClassName("remove");
	for (var i = 0; i < buttons.length;  i++) {
	// assign an event listener that will trigger the remove function
			buttons[i].addEventListener("click", remove);
	};
}

	// add task and run add function defined above 
	document.getElementById('add').addEventListener('click', add);
	show();