
$("#target").submit(function(event){
  if ($("input[name='tag']").val().length === 0 ||
      $("input[name='blogname']").val().length === 0){
    alert("We can't read your mind (yet!). Choose blog name and pet!");
    event.preventDefault();
  }
});
