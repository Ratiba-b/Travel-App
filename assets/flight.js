// $(function () {
//   $(".btn").click(function (e) {
//     $target = $(e.target); //evenement qui contient un element = bouton html (e.target)
//     console.log(e);
//     const flight = JSON.parse($target.attr("flight-choice"));
//     console.log(flight);
//     fetch("/historique", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         flight: flight,
//       }),
//     }).then(() => {
//       console.log("success");
//     });
//   });
// });
