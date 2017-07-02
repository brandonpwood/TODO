// TOOD: Can't close lists that were made and not refreshed, can't close lists with names with spaces
function parse(elem){
  return elem.replace(/\ /g, '.');
}
// Add new lists
$(document).on('click', '.add', function(){
  var data = {
      name: $(':text.listtext').val(),
      contents: ['You should add some things todo!']
  }

  $.post('/addlistquiet', data, function(res, status){
    if(res === true){
      console.log(data.name)
      var btn = '<input type = "button" value = "'
      + data.name
      + '" name = "'
      + data.name
      + '" class = "btn"/>';

      var close = '<input type = "button" value = "Close '
      + data.name
      + '" name = "'
      + data.name
      + '" class = "clsbtn"/>';

      var holder = '<div class = "'
      + data.name
      + '-holder">'
      + btn + close + ' <br/> </div>';

      $('.holder').append(holder);

    }else if(res === 'List already exists'){
      alert('You are not allowed to make a list with the same name as one that exists.')
    }else{
      alert('There was a server error')
    }
  });
});

// Delete Lists
$(document).on('click', '.clsbtn', function(){

  var data =  {name: parse(this.name)};
  var holder = $('.' + data.name + '-holder');

  $.post('/deletelistquiet', data, function(res, status){
    if(res === true){
      holder.remove();
    }else{
      alert(res)
    }
  });
});
// Add items to lists
