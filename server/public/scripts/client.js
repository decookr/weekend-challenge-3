console.log('JS loaded');

$(document).ready(function(){
    console.log('JQ ready');
    getItems();
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
                var $newTodoItem = $('<li>' + todo.item + '</li>');
                
                //create completed button for each item

                //create delete button for each item
                
                //append todo items to DOM

            }
            
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
    var shoeIdToRemove = $(this).data().id;
    console.log('remove shoe was clicked! The shoe id was ', shoeIdToRemove);

    $.ajax ({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function(response){
            getItems(); // call get function
        }
    })
}


function editItem(){
    console.log($(this).data()); // this should love {id:7} or whatever id is  
    var shoeIdToSave = $(this).data().id;
    var shoeNameToSave = $(this).parent().children(".newShoeName").val();
    console.log('save shoe was clicked! The shoe id was ', shoeIdToSave);

    $.ajax({
        method: 'PUT',
        url: '/shoes/' + shoeIdToSave,
        data: {
            name: shoeNameToSave,
        },
        success: function (response) {
            getItems();
        }
    })
}