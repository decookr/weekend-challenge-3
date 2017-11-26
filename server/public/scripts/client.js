console.log('JS loaded');

$(document).ready(function(){
    console.log('JQ ready');
    getItems();
    $('#listItemSubmit').on('click', addItem);
    $('#todoList').on('click', '.deleteButton', removeItem);
    $('#todoList').on('click', '.markCompletedButton', markComplete);

//add event listeners here for submit, delete, mark completed***


})//end document ready


function getItems(){
    console.log('in getItems');
    $.ajax({
        url: '/todo',
        type: 'GET',
        success: function (response){
            console.log('got some items!', response);
            $('#todoList').empty();
            for (let i = 0; i < response.length; i++) {
                var todo = response[i];

                if (todo.completed == 'Y') {
                var $newTodoItemY = $('<tr class="done"><td>' + todo.item + '</td><td>' + todo.completed + '</td></tr>');
                //create completed button for each item
                var $completedButton = $('<td><button class="markCompletedButton">Completed</button></td>');
                $completedButton.data('id', todo.id);
                $newTodoItemY.append($completedButton);                
                //create delete button for each item
                var $deleteButton = $('<td><button class="deleteButton">Delete</button></td>');
                $deleteButton.data('id', todo.id);
                $newTodoItemY.append($deleteButton);
                $('#todoList').append($newTodoItemY);
                
                } else {
                    var $newTodoItemN = $('<tr><td>' + todo.item + '</td><td>' + todo.completed + '</td></tr>');
                    //create completed button for each item
                    var $completedButton = $('<td><button class="markCompletedButton">Completed</button></td>');
                    $completedButton.data('id', todo.id);
                    $newTodoItemN.append($completedButton);                
                    //create delete button for each item
                    var $deleteButton = $('<td><button class="deleteButton">Delete</button></td>');
                    $deleteButton.data('id', todo.id);
                    $newTodoItemN.append($deleteButton);
                    $('#todoList').append($newTodoItemN);

                }
                //append todo items to DOM
                $('input').val('');
            }//end for loop
        }
    })
    
}


function addItem(){
    $.ajax({  //including this in document ready is not a common practice, just for this demo
        method: 'POST',
        url: '/todo',
        data: {
            item: $('#newListItem').val(),
            completed: 'N'
        },
        success: function(response){
            console.log('response', response);
            getItems(); //call get function
        }
    })
}



function removeItem(){
    console.log($(this).data());
    var listItemToRemove = $(this).parent().data().id;
    console.log('remove item was clicked! The item id was ', listItemToRemove);

    $.ajax ({
        method: 'DELETE',
        url: '/todo/' + listItemToRemove,
        success: function(response){
            getItems(); // call get function
        }
    })
}


function markComplete(){
    console.log($(this).data()); // this should love {id:7} or whatever id is  
    var itemIdToMark = $(this).parent().data().id;
    // var shoeNameToSave = $(this).parent().children(".newShoeName").val();
    console.log('complete button was clicked! The item id was ', itemIdToMark);

    $.ajax({
        method: 'PUT',
        url: '/todo/' + itemIdToMark,
        data: {
            completed: 'Y'
        },
        success: function (response) {
            getItems();
        }
    })
}