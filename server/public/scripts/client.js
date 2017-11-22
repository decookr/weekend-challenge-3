console.log('JS loaded');

$(document).ready(function(){
    console.log('JQ ready');
    getItems();



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
                var $newTodoItem = $('<li>' + todo.item + '</li>');
                
                //create completed button for each item

                //create delete button for each item
                
                //append todo items to DOM

            }
            
        }
    })
    
}