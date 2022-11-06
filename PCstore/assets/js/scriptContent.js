let itemsSideBar = $$('.item');
let contentTitle = $('.content-title h1');
let contentDescription = $('.content-para');

itemsSideBar.forEach((item, index) => {
    handleChangeDes(item, index);
});

// Handle change description when click item
function handleChangeDes(item, index) {
    item.addEventListener('click', function(e){
        // Handle content title
        contentTitle.innerHTML = this.querySelector('a').textContent;
        // Handle content description

        if (item.contains(item.querySelector('ul'))) {
            $('.list-product').classList.add('content-hidden');
            $('.body-clock').classList.add('modal-hidden');
            if (index == 1 || index == 2) {
                contentDescription.innerHTML = des[index - 1].content;
            }
            else {
                contentDescription.innerHTML = des[index - 2].content;
            }
        }
        else if (index == 0) {
            $('.list-product').classList.add('content-hidden');
            $('.content-show')?.classList.add('content-hidden');
            $('.content-show')?.classList.remove('content-show');
            $('.content-para').classList.add('content-hidden');
            $('.body-clock').classList.remove('modal-hidden');
        }
        else {
            $('.content-para').classList.add('content-hidden');
            $('.content-show')?.classList.add('content-hidden');
            $('.content-show')?.classList.remove('content-show');
            $('.list-product').classList.remove('content-hidden');
            $('.body-clock').classList.add('modal-hidden');
        }
    })
}

// Handle change content when click show menu drop down
itemsDropDown.forEach((item, index) => {
    item.addEventListener('click', function(){
        $('.content-para').classList.add('content-hidden');
        $('.content-show')?.classList.add('content-hidden');
        $('.content-show')?.classList.remove('content-show');
        $('.list-product').classList.add('content-hidden');
        if (index == 0) {
            $('.list-customer').classList.remove('content-hidden');
            $('.list-customer').classList.add('content-show');
        }
        else if (index == 1) {
            $('.edit-customer').classList.remove('content-hidden');
            $('.edit-customer').classList.add('content-show');
        }
        else if (index == 2) {
            $('.warranty-customer').classList.remove('content-hidden');
            $('.warranty-customer').classList.add('content-show');
        }
        else if (index == 3) {
            $('.list-staff').classList.remove('content-hidden');
            $('.list-staff').classList.add('content-show');
        }
        else if (index == 4) {
            ValidateModal('.add-staff', '.edit-staff');
        }
        else if (index == 5) {
            ValidateModal('.edit-staff', '.add-staff');
        }
        else if (index == 6) {
            $('.add-product').classList.remove('content-hidden');
            $('.add-product').classList.add('content-show');
        }
        else if (index == 7) {
            $('.edit-product').classList.remove('content-hidden');
            $('.edit-product').classList.add('content-show');
        }
        else if (index == 8) {
            $('.add-receipt').classList.remove('content-hidden');
            $('.add-receipt').classList.add('content-show');
        }
        else if (index == 9) {
            $('.list-bill').classList.remove('content-hidden');
            $('.list-bill').classList.add('content-show');
        }
        else if (index == 10) {
            $('.total-revenue').classList.remove('content-hidden');
            $('.total-revenue').classList.add('content-show');
        }
        else if (index == 11) {
            $('.revenue-report').classList.remove('content-hidden');
            $('.revenue-report').classList.add('content-show');
        }

        itemsSideBar.forEach((itemSideBar) => {
            itemSideBar.querySelectorAll('a')[0].addEventListener('click', function(){
                $('.list-product').classList.add('content-hidden');
                $('.content-show')?.classList.add('content-hidden');
                $('.content-show')?.classList.remove('content-show');
                $('.content-para').classList.remove('content-hidden');
            });
        });
    })
});
