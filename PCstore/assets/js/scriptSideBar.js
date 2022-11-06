let items = document.querySelectorAll('.item');
let action = document.getElementById('action');
let iconsDown = document.querySelectorAll('.fa-chevron-down');
let itemsDropDown = document.querySelectorAll('.item ul li');

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

items.forEach(item => {
    item.addEventListener('click', function(e){
        if (this.classList.contains('showMenuChild')){
        document.getElementById('arrow-icon')?.remove();
    }
        if( this.classList.contains('active') || e.target.classList.contains('fa-chevron-down')){
            return;
        }

        items.forEach(remove_active => {
            remove_active.classList.remove('active');
        });

        this.classList.add('active');

        document.documentElement.style.setProperty('--height-begin', action.offsetHeight + 'px');

        document.documentElement.style.setProperty('--top-begin', action.offsetTop + 'px');

        document.documentElement.style.setProperty('--height-end', this.offsetHeight + 'px');

        document.documentElement.style.setProperty('--top-end', this.offsetTop + 'px');

        action.classList.remove('runAnimation');
        void action.offsetWidth;
        action.classList.add('runAnimation');
    },false)
})

let step = 0;
iconsDown.forEach(icon =>{
    icon.addEventListener('click', function(){
        step = step ? 0 : 1;
        if (step === 0){
            this.classList.add('showMenuChild');
            document.querySelector('.showMenuChild')?.classList.remove('showMenuChild');
        }
        else{
            document.querySelector('.showMenuChild')?.classList.remove('showMenuChild');
            this.classList.add('showMenuChild');
        }

        if (this.classList.contains('showMenuChild')){
            document.getElementById('arrow-icon')?.remove();
        }

        items.forEach(item => {
            if(item.classList.contains('active')){
                document.documentElement.style.setProperty('--height-end', item.offsetHeight + 'px');
                document.documentElement.style.setProperty('--top-end', item.offsetTop + 'px');
                return;
            }
        });
    })
})

const iconArrow = document.createElement('i');
iconArrow.id = 'arrow-icon';
iconArrow.classList.add('fa-solid');
iconArrow.classList.add('fa-caret-left');
iconArrow.style.display = 'block';

for (const item of itemsDropDown) {
    item.addEventListener('click', function(){
        document.getElementById('arrow-icon')?.remove();
        this.appendChild(iconArrow);
    })
}
