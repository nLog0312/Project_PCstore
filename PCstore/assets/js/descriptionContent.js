const des = [
    {
        "content": "This is the customer management function, staffs can view the list, edit and delete existing customer information sold in the store. Click on the \"arrow\" icon (<i class=\"fa-solid fa-chevron-down\"></i>) to open the options of the customer management function."
    },
    {
        "content": "This is an staff management function, if you are an staff, you can view the list of staffs, and functions such as adding, editing and deleting staff information can only be used by the manager (who has the login code). Click the \"arrow\" icon (<i class=\"fa-solid fa-chevron-down\"></i>) to open the staff management options."
    },
    {
        "content": "This is the warehouse management function, staffs can view the list, add, edit and delete existing product information sold in the store. Click on the \"arrow\" icon (<i class=\"fa-solid fa-chevron-down\"></i>) to open the options of the warehouse management function."
    },
    {
        "content": "This is an invoice management function, staffs can fill out receipts, complete invoices and print invoices for customers. Click on the \"arrow\" icon (<i class=\"fa-solid fa-chevron-down\"></i>) to open the options of the invoice management function."
    },
    {
        "content": "This is the statistics function, staffs and managers can operate to view the list of invoices and sales statistics of the store. Click the “arrow” icon (<i class=\"fa-solid fa-chevron-down\"></i>) to open the options of the statistics function."
    }
]

const strips = [...document.querySelectorAll(".strip")];
const numberSize = "2"; // in rem

// highlight number i on strip s for 1 second
function highlight(strip, d) {
  strips[strip]
    .querySelector(`.number:nth-of-type(${d + 1})`)
    .classList.add("pop");

  setTimeout(() => {
    strips[strip]
      .querySelector(`.number:nth-of-type(${d + 1})`)
      .classList.remove("pop");
  }, 950); // causes ticking
}

function stripSlider(strip, number) {
  let d1 = Math.floor(number / 10);
  let d2 = number % 10;

  strips[strip].style.transform = `translateY(${d1 * -numberSize}rem)`;
  highlight(strip, d1);
  strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}rem)`;
  highlight(strip + 1, d2);
}

setInterval(() => {
  // get new time
  const time = new Date();

  // get h,m,s
  const hours = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();

  // slide strips
  stripSlider(0, hours);
  stripSlider(2, mins);
  stripSlider(4, secs);

  // highlight numbers
}, 1000);

