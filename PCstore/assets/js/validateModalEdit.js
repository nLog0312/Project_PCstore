$('.modal-cus_container .header-icon').addEventListener('click', function(e) {
    $('.modal-cus_add').classList.toggle('modal-hidden');
});

$('.modal-staff_container .header-icon').addEventListener('click', function(e) {
    $('.modal-staff_add').classList.toggle('modal-hidden');
});

$$('#btn-product_edit').forEach((btn) => {
    btn.addEventListener('click', function(e) {
        $('.modal-product_add').classList.toggle('modal-hidden');
    });
});

$('.modal-product_container .header-icon').addEventListener('click', function(e) {
    $('.modal-product_add').classList.toggle('modal-hidden');
});