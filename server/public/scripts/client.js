$(document).ready(onReady);

function onReady(){
    refreshTasks();
    //attach click listeners
    $('#addTaskButton').on('click', addTask);
    $('#task-list').on('click', '.completeButton', completeTask);
    $('#task-list').on('click', '.deleteButton', deleteTask);
}

function refreshTasks(){
    console.log('in refreshTasks');
    //get tasks as array of objects from db
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function (response){
        console.log('back from /tasks GET');
        //target and empty the ul
        let list = $('#task-list');
        list.empty();
        //loop through array and append as <li> to dom
        for (task of response){
            list.append(`
            <li class="completed-${task.completed}" data-id="${task.id}">
            ${task.description}
            <button class="completeButton">done!</button>
            <button class="deleteButton">remove</button>
            </li>
            `)
        }
    }).catch( function (err){
        console.log(err);
        alert('problem refreshing tasks');
    })//end AJAX
}//end refreshTasks
function addTask(){
    console.log('in addTask');
    //bundle inputs into object
    let newTask = {
        description: $('#descriptionIn').val()
    }
    //empty input(s)
    $('#descriptionIn').val('');
    //post request
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    }).then( function (response){
        console.log('back from POST with:', response);
        //update display
        refreshTasks();
    }).catch( function (err){
        alert('unable to add task');
        console.log(err);
    })
}//end addTask
function completeTask(){
    console.log("in completeTask");
}//end completeTask
function deleteTask() {
    console.log("in deleteTask");
    //target the id of the item to remove 
    let taskId = $(this).parent().data('id');
    //ajax delete request
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then( function( response ){
        console.log('back from DELETE with:', response);
        refreshTasks();
    }).catch( function(err){
        console.log(err);
        alert('could not delete task');
    })//end ajax
}//end deleteTask
