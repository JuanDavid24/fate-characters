$(function(){
    $("#registro-modal").on("show.bs.modal", function (e) {
      console.log ('el modal se muestra');
      
      $('#registro-btn').removeClass('btn-danger');
      $('#registro-btn').removeClass('btn-outline-light');
      $('#registro-btn').addClass('btn-light');
      $('#registro-btn').prop('disabled', true);
    });
  
    $("#registro-modal").on("shown.bs.modal", function (e) {
      console.log ('el modal se mostró')
    });
  
    $("#registro-modal").on("hide.bs.modal", function (e) {
      console.log ('el modal se oculta')
      $('#registro-btn').removeClass('btn-light');
      $('#registro-btn').addClass('btn-danger');
      $('#registro-btn').addClass('btn-outline-light');
      $('#registro-btn').prop('disabled', false);
    });
  
    $("#registro-modal").on("hidden.bs.modal", function (e) {
      console.log ('el modal se ocultó')
    });    
  }); 