// $(document).ready(function () {
//   // quand doc est ready activer fonction

//   $("form").on("submit", function () {
//     // quand on a un event submit via un formulaire on active la fonction

//     var item = $("form input"); // la fonction créee une variable item qui correspond à l'input
//     var todo = { item: item.val() }; //puis elle créee une variable todo contenant un objet. Dedans on trouve un item correspondant à la valeur de l'input

//     $.ajax({
//       // ajax active la method post pour demander au serveur de gérer les données
//       type: "POST",
//       url: "/todo",
//       data: todo, // les valeurs stockées ds la variable todo sont recup
//       success: function (data) {
//         //do something with the data via front-end framework renvoie la liste apres avoir up date les infos
//         location.reload();
//       },
//     });

//     return false;
//   });

//   $("li").on("click", function () {
//     var id = $(this).attr("todo-id");
//     $.ajax({
//       type: "DELETE",
//       url: "/todo/" + id,
//       success: function (data) {
//         // on recoit les données de data qui ont été renouvelé dans todoController
//         //do something with the data via front-end framework
//         location.reload();
//       },
//     });
//   });
// });
