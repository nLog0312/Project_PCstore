const BtnClose = document.querySelector('.modal .header-icon');
const valuePassWord = document.querySelector('.pass-form .modal-input');
const ErrorMessage = document.querySelectorAll('.modal-error');
const BtnModal = document.querySelector('.modal-btn');

// Listen event click to show modal
itemsDropDown.forEach(item => {
    item.addEventListener('click', function() {
        if (this == itemsDropDown[4] || this == itemsDropDown[5]) {
            document.querySelector('.modal').classList.remove('modal-hidden');
        }
    })
});

// Listen event click button close modal
BtnClose.onclick = function() {
    document.querySelector('.modal').classList.add('modal-hidden');
}

// Validate event blur input
valuePassWord.onblur = function() {
    if (valuePassWord.value.length == 0) {
        ErrorMessage[0].innerHTML = 'Password is required';
    }
    else {
        ErrorMessage[0].innerHTML = '';
    }
}

// Validate event submit form
function ValidateModal(title, cancel) {
    BtnModal.onclick = function() {
        if (valuePassWord.value != "admin") {
            ErrorMessage[1].innerHTML = 'Password is error!';
        }
        else {
            ErrorMessage[1].innerHTML = '';
            document.querySelector('.modal').classList.add('modal-hidden');
            valuePassWord.value = '';
            $(`${cancel}`).classList.remove('content-show');
            $(`${cancel}`).classList.add('content-hidden');
            $(`${title}`).classList.remove('content-hidden');
            $(`${title}`).classList.add('content-show');
        }
    };

    valuePassWord.addEventListener('keyup', function(e) {
        let check = false;
        if (e.keyCode === 13) {
            if (valuePassWord.value != "admin") { //Set value password default \'admin\'
                ErrorMessage[1].innerHTML = 'Password is error!';
            }
            else {
                ErrorMessage[1].innerHTML = '';
                document.querySelector('.modal').classList.add('modal-hidden');
                valuePassWord.value = '';
            }
            $(`${cancel}`).classList.remove('content-show');
            $(`${cancel}`).classList.add('content-hidden');
            $(`${title}`).classList.remove('content-hidden');
            $(`${title}`).classList.add('content-show');
        }
    });
}