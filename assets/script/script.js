var modalAppear = document.querySelector("#btn-modal");

modalAppear.addEventListener('click', function() {
    var modalTwo = Bulma('#mymodal').modal();
    modalTwo.open();
});