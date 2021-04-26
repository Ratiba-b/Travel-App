$(function () {
  $(".btn-delete-todo").click(function (e) {
    $target = $(e.target); //evenement qui contient un element = bouton html (e.target)
    console.log(e);
    const todoId = $target.attr("todo-id");
    console.log(todoId);
    fetch("/todo/" + todoId, {
      method: "delete",
    }).then(() => {
      window.location.reload();
    });
  });

  $(".btn-delete-vol").click(function (e) {
    $target = $(e.target); //evenement qui contient un element = bouton html (e.target)
    console.log(e);
    const volId = $target.attr("vol-id");
    console.log(volId);
    fetch("/historique/" + volId, {
      method: "delete",
    }).then(() => {
      window.location.reload();
    });
  });
});
