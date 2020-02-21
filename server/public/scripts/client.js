$(document).ready(onReady);

function onReady(){
    refreshTasks();
    //attach click listeners
    $('#addTaskButton').on('click', addTask);
    $('.view-by-btn').on('click', assignViewBy);
    $('#task-list').on('click', '.completeButton', completeTask);
    $('#task-list').on('click', '.deleteButton', deleteTask);
}

let viewByVariable = 'view-oldest';

function refreshTasks(){
    console.log('viewByVariable is', viewByVariable);
    //get tasks as array of objects from db
    $.ajax({
        type: 'GET',
        url: `/tasks/${viewByVariable}`
    }).then( function (response){
        console.log(`back from /tasks/${viewByVariable} GET`);
        //target and empty the ul
        let list = $('#task-list');
        list.empty();
        //loop through array and append as <li> to dom
        for (task of response){
            list.append(`
            <li class="completed-${task.completed}" data-id="${task.id}">
                <h3>${task.description}</h3>
                <p>priority level: ${task.priority_level}</p>
                <p>category: ${task.category}</p>
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
    if ($('#descriptionIn').val()===''){
        alert('you have to enter a task!');
        return false;
    }
    console.log('in addTask');
    //bundle inputs into object
    let newTask = {
        description: $('#descriptionIn').val(),
        category: $('#categoryIn').val(),
        priority_level: $('#priorityLevelIn').val()
    }
    console.log('new task is:', newTask);
    //empty input(s)
    $('#descriptionIn').val('');
    $('#categoryIn').val('');
    $('#priorityLevelIn').val('');
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
    //target the id of the item to update 
    let taskId = $(this).parent().data('id');
    // $(this).toggle();
    //ajax delete request
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        console.log('back from PUT with:', response);
        refreshTasks();
    }).catch(function (err) {
        console.log(err);
        alert('could not delete task');
    })//end ajax
}//end completeTask
function deleteTask() {
    popUp("are you sure you want to delete this?");
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
function assignViewBy(){
    //store how user wants to view tasks in global variable, then show in that order
    viewByVariable=$(this).attr('id');
    refreshTasks();
}
function popUp(textString){
    console.log('in popUp function');
    $('body').append(`
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `)
}

{/* <div class="modal">
    <h3>${textString}</h3>
    <p>this action cannot be undone</p>
    <button class="confirm-btn">yes, I'm sure</button>
    <button class="goback-btn">no, cancel this action</button>
</div> */}


