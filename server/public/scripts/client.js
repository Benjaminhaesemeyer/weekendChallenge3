console.log('js sourced')

$( document ).ready( function(){
  console.log('JQ ready');

//load existing todo table to page
getTodo();
//add a task button click
$( '#addTask' ).on( 'click', function() {
  console.log( 'addTask on click' );

  var newTask = {}
  newTask.task = $('#taskBox').val();
  saveTask( newTask );
  $('#taskBox').val("");
});
//task delete button click
$('#taskView').on('click', '.deleteBtn', function(){
// We attached the bid as data on our button
var taskid = $(this).data('taskid');
console.log($(this));
console.log('Delete task with id of', taskid);
deleteTask(taskid);
}); // end of delete task button
}); // end of doc ready

function getTodo(){
  console.log( 'in getTodo' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/todo',
    type: 'GET',
    success: function( response ){
      console.log( 'got some Task: ', response );
      appendToDom(response.todo);
    } // end success
  }); //end ajax
} // end getTodo

function refreshTask() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function(response) {
      console.log(response);
      appendToDom(response.todo);
    }
  });
}

//function saving new task to server side
function saveTask( NewTask ){
  console.log( 'in newTask', NewTask );
  // ajax call to server to get todo table
  $.ajax({
    url: '/todo',
    type: 'POST',
    data: NewTask,
    success: function( data ){
      console.log( 'got some Task: ', data );
      refreshTask();
    } // end success
  }); //end ajax
}

function appendToDom(tasks) {
  console.log('todo Append Working');
  // Remove task that currently exist in the table
  $('#taskView').empty();
  for(var i = 0; i < tasks.length; i += 1) {
    var newTask = tasks[i];
    // For each task, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('newTask', newTask);
    $tr.append('<td>' + newTask.task + '</td>');
    $tr.append('<td><button class="deleteBtn" data-taskid="' + newTask.id + '">Delete</button></td>');
    $('#taskView').append($tr);
  }
}

function deleteTask(taskid) {
  console.log('task id = ', taskid);
  // When using URL params, your url would be...
  // '/todo/' + taskkId

  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'DELETE',
    url: '/todo/' + taskid,
    success: function(response) {
      console.log(response);
      console.log('I deleted the task!');
      refreshTask();
    }
  });
}
