$(document).ready(onReady);

function onReady(){
    refreshTasks();
    //attach click listeners
    $('#addTaskButton').on('click', addTask);
    $('.view-by-btn').on('click', assignViewBy);
    $('#task-list').on('click', '.completeButton', completeTask);
    $('#task-list').on('click', '.deleteButton', deleteTask);
    $('body').on('click', '.confirm-btn', confirmClick);
    $('body').on('click', '.goback-btn', goBackClick);
}

let viewByVariable = 'view-oldest';
let confirmationStatus = null;

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
    if (confirm('this action cannot be undone. proceed?')===false){
        return false;
    }
    //target the id of the item to remove 
    let taskId = $(this).parent().data('id');
    console.log(taskId);    
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

function goBackClick(){
    confirmationStatus = 'go-back';
    console.log('confirmation status: ', confirmationStatus);
    $('#confirmation').remove();
}

function confirmClick(){
    confirmationStatus = 'confirmed';
    console.log('confirmation status: ', confirmationStatus);
    $('#confirmation').remove();
}

