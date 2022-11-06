let inputAddStaff = $$('.form-add_staff input');
let inputProduct = $$('.form-add_product input');
let inputReceipt = $$('.form-add_receipt input');

inputAddStaff.forEach(input => {
    input.onblur = function() {
        if (input.value.length == 0) {
            input.nextElementSibling.innerHTML = 'This field is required';
        }
        else {
            input.nextElementSibling.innerHTML = '';
        }
    }
});

inputProduct.forEach(input => {
    input.onblur = function() {
        if (input.value.length == 0) {
            input.nextElementSibling.innerHTML = 'This field is required';
        }
        else {
            input.nextElementSibling.innerHTML = '';
        }
    }
});

inputReceipt.forEach(input => {
    input.onblur = function() {
        if (input.value.length == 0) {
            input.nextElementSibling.innerHTML = 'This field is required';
        }
        else {
            input.nextElementSibling.innerHTML = '';
        }
    }
});