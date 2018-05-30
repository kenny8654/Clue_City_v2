
function onSubmitButtonClicked(){
  event.preventDefault();
  var formData = new FormData($('#upload_form')[0]);
  console.log('post');
  $.ajax({
    url : '/upload',
    type : 'post',
    data : formData,
    success : function(data){
      $('#upload_response').text(data);
    },
    cache: false,
    contentType: false,
    processData: false,
  })
}
