const customerApi = "http://localhost:8000/v1/customer/";
const staffApi = "http://localhost:8000/v1/staff/";
const productApi = "http://localhost:8000/v1/product/";
const warrantyApi = "http://localhost:8000/v1/warranty/";

function Start() {
    // Call handle customer
    GetCustomer(function(customers) {
        RenderCustomer(customers, $('.table-cus table'));
        HandleEditCustomer(customers, $('.table-cus_edit table'));
    });

    // Call handle staff
    GetStaff(function(staffs) {
        RenderStaff(staffs, $('.table-staff table'));
        HandleEditStaff(staffs, $('.table-staff_edit table'));
    });
    HandleAddStaff();

    // Call handle warranty
    GetWarranty(function(warranties) {
        RenderWarranty(warranties, $('.table-warranty table'));
    });

    // Call handle product
    GetProduct(function(products) {
        RenderProduct(products, $('.table-product table'));
        HandleEditProduct(products, $('.table-product_edit table'));
    });
    HandleAddProduct();

    // Call handle receipt
    ShowStaff();
    ShowProduct();
    HandleAddReceipt();

    // Call handle bill
    GetWarranty(function(warranties) {
        RenderBill(warranties, $('.table-list-bill table'));
    });

    // Call handle revenue
    GetProduct(function(products) {
        RenderRevenue(products, $('.table-revenue table'));
    });
}
Start();

// --------------------------------Function handle data from customerAPI--------------------------------
// Function get data customer
function GetCustomer(callback) {
    fetch(customerApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
// Function render data customer to table
function RenderCustomer(customers, elementShow) {
    let i = 0;
    let dataCus = customers.map(function(customer) {
        return `
            <tr class="cus-${customer._id}">
                <td>${++i}</td>
                <td class="width-20">${customer.name}</td>
                <td>${customer.address}</td>
                <td class="width-20">${customer.phone}</td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataCus.join('');
}
// Function handle edit customer
function HandleEditCustomer(customers, elementShow) {
    let i = 0;
    let dataCus = customers.map(function(customer) {
        return `
            <tr>
                <td>${++i}</td>
                <td class="width-20">${customer.name}</td>
                <td>${customer.address}</td>
                <td class="width-20">${customer.phone}</td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" class="btn-edit-${customer._id}">Edit</button></td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" class="btn-delete-${customer._id}">Delete</button></td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataCus.join('');

    customers.forEach(function(customer) {
        $('.btn-edit-' + customer._id).addEventListener('click', function() {
            $('.modal-cus_add').classList.toggle('modal-hidden');
            $('.modal-cus_body table').innerHTML = `
                <tr>
                    <td>
                        <label>Name</label>
                    </td>
                    <td>
                        <input type="text" name="cus_name" value="${customer.name}">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Address</label>
                    </td>
                    <td>
                        <input type="text" name="cus_address" value="${customer.address}">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Phone</label>
                    </td>
                    <td>
                        <input type="text" name="cus_phone" value="${customer.phone}">
                    </td>
                </tr>
            `;
            $('.modal-cus_body button').value = customer._id;

            $('#btn-cus_submit').addEventListener('click', function() {
                HandleUpdateCustomer($('#btn-cus_submit').value);
            });
        });

        $('.btn-delete-' + customer._id).addEventListener('click', function() {
            HandleDeleteCustomer(customer._id);
        });
    });
}
// Function delete customer
function HandleDeleteCustomer(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(customerApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.cus-' + id).remove();
            $('.btn-delete-' + id).parentElement.parentElement.remove();
        })
        .catch(function(error) {
            console.log(error);
        });
}
// Function update customer
function HandleUpdateCustomer(id) {
    let name = $('.modal-cus_body input[name="cus_name"]').value;
    let address = $('.modal-cus_body input[name="cus_address"]').value;
    let phone = $('.modal-cus_body input[name="cus_phone"]').value;

    let customer = {
        name: name,
        address: address,
        phone: phone
    };
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    };

    fetch(customerApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.edit-cus_message').innerHTML = 'Update customer successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("");}, 2000);
                });
                $('.edit-cus_message').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// --------------------------------Function handle data from staffApi--------------------------------
// Function get data staff
function GetStaff(callback) {
    fetch(staffApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
// Function add staff to database
function HandleAddStaff() {
    $('.form-add_staff .submit-btn').addEventListener('click', function() {
        let name = $('.form-add_staff input[name="name_staff"]').value;
        let address = $('.form-add_staff input[name="address"]').value;
        let phone = $('.form-add_staff input[name="phone"]').value;
        let age = $('.form-add_staff input[name="age"]').value;
        let linkImg = $('.form-add_staff input[name="image"]').value;
        let position;
        if ($('.form-add_staff select[name="position"]').value == 1){
            position = "Manager";
        }
        else {
            position = "Staff";
        }
        let salary = $('.form-add_staff input[name="salary"]').value;

        let staff = {
            name: name,
            address: address,
            phone: phone,
            age: age,
            position: position,
            salary: salary,
            image: linkImg
        };
        AddStaff(staff);
    });
}
function AddStaff(staff) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staff)
    };

    fetch(staffApi, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.add_staff-message').innerHTML = 'Add staff successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("");}, 3000);
                });
                $('.add_staff-message').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        });
}
// Function render data staff to table
function RenderStaff(staffs, elementShow) {
    let i = 0;
    let dataStaff = staffs.map(function(staff) {
        return `
            <tr class="staff-${staff._id}">
                <td>${++i}</td>
                <td class="width-20">${staff.name}</td>
                <td>${staff.address}</td>
                <td style="width: 15%;">${staff.phone}</td>
                <td class="width-4">${staff.age}</td>
                <td class="width-12">${staff.position}</td>
                <td class="width-12">${staff.salary}</td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataStaff.join('');
}
// Function handle edit staff
function HandleEditStaff(staffs, elementShow) {
    let i = 0;
    let dataCus = staffs.map(function(staff) {
        return `
            <tr>
                <td>${++i}</td>
                <td class="width-20">${staff.name}</td>
                <td>${staff.address}</td>
                <td style="width: 15%;">${staff.phone}</td>
                <td class="width-4">${staff.age}</td>
                <td class="width-12">${staff.position}</td>
                <td class="width-12">${staff.salary}</td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" class="btn-edit-${staff._id}">Edit</button></td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" class="btn-delete-${staff._id}">Delete</button></td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataCus.join('');

    staffs.forEach(function(staff) {
        $('.btn-edit-' + staff._id).addEventListener('click', function() {
            $('.modal-staff_add').classList.toggle('modal-hidden');
            $('.modal-staff_body table').innerHTML = `
            <tr>
                <td>
                    <label>Name</label>
                </td>
                <td>
                    <input type="text" name="staff_name" value="${staff.name}">
                </td>
            </tr>
            <tr>
                <td>
                    <label>Address</label>
                </td>
                <td>
                    <input type="text" name="staff_address" value="${staff.address}">
                </td>
            </tr>
            <tr>
                <td>
                    <label>Phone</label>
                </td>
                <td>
                    <input type="text" name="staff_phone" value="${staff.phone}">
                </td>
            </tr>
            <tr>
                <td>
                    <label>Age</label>
                </td>
                <td>
                    <input type="number" name="staff_age" value="${staff.age}">
                </td>
            </tr>
            <tr>
                <td>
                    <label>Position</label>
                </td>
                <td>
                    <select style="border-radius: 5px; border: 1px solid #ccc; padding: 10px; rgba(128, 128, 128, 0.2) color: #000;" name="position">
                        
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Salary</label>
                </td>
                <td>
                    <input type="number" name="staff_salary" value="${staff.salary}">
                </td>
            </tr>
            <tr>
                <td>
                    <label>Link Image</label>
                </td>
                <td>
                    <input type="text" name="staff_image" value="${staff.image}">
                </td>
            </tr>
            `;
            if (staff.position === "Manager") {
                $('.modal-staff_body table select[name="position"]').innerHTML = `
                    <option style="background-color: rgba(128, 128, 128, 0.2); color: #000;" value="1" selected>Manager</option>
                    <option style="background-color: rgba(128, 128, 128, 0.2); color: #000;" value="2">Staff</option>
                `
            }
            else {
                $('.modal-staff_body table select[name="position"]').innerHTML = `
                    <option style="background-color: rgba(128, 128, 128, 0.2); color: #000;" value="1">Manager</option>
                    <option style="background-color: rgba(128, 128, 128, 0.2); color: #000;" value="2" selected>Staff</option>
                `
            }
            $('.modal-staff_body button').value = staff._id;
            $('#btn-staff_submit').addEventListener('click', function() {
                HandleUpdateStaff($('#btn-staff_submit').value);
            });
        });

        $('.btn-delete-' + staff._id).addEventListener('click', function() {
            HandleDeleteStaff(staff._id);
        });
    });
}
// Function delete staff
function HandleDeleteStaff(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(staffApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.staff-' + id).remove();
            $('.btn-delete-' + id).parentElement.parentElement.remove();
        })
        .catch(function(error) {
            console.log(error);
        });
}
// Function update staff
function HandleUpdateStaff(id) {
    let name = $('.modal-staff_body input[name="staff_name"]').value;
    let address = $('.modal-staff_body input[name="staff_address"]').value;
    let phone = $('.modal-staff_body input[name="staff_phone"]').value;
    let age = $('.modal-staff_body input[name="staff_age"]').value;
    let position;
    if ($('.modal-staff_body select[name="position"]').value == 1) {
        position = "Manager";
    }
    else {
        position = "Staff";
    }
    let salary = $('.modal-staff_body input[name="staff_salary"]').value;
    let linkImg = $('.modal-staff_body input[name="staff_image"]').value;

    let staff = {
        name: name,
        address: address,
        phone: phone,
        age: age,
        position: position,
        salary: salary,
        image: linkImg
    };
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staff)
    };

    fetch(staffApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.edit-staff_message').innerHTML = 'Update staff successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("");}, 2000);
                });
                $('.edit-staff_message').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// ------------------ Function handle data from productApi ------------------
// Function get data product
function GetProduct(callback) {
    fetch(productApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
// Function render data product to table
function RenderProduct(products, elementShow) {
    let i = 0;
    let dataProduct = products.map(function(product) {
        return `
            <tr class="product-${product._id}">
                <td>${++i}</td>
                <td>${product.name}</td>
                <td style="width: 30%;">
                    <img src="${product.image}" alt="Avatar" style="width: 100px; height: 100px;">
                </td>
                <td class="width-12">${product.quantity}</td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataProduct.join('');
}
// Function add product to database
function HandleAddProduct() {
    $('.form-add_product .submit-btn').addEventListener('click', function() {
        let name = $('.form-add_product input[name="name_product"]').value;
        let price = $('.form-add_product input[name="price"]').value;
        let linkImage = $('.form-add_product input[name="image"]').value;
        let quantity = $('.form-add_product input[name="quantity"]').value;

        let product = {
            name: name,
            price: price,
            image: linkImage,
            quantity: quantity,
            quantityBegin: quantity
        };
        AddProduct(product);
    });
}
function AddProduct(product) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };

    fetch(productApi, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.add_product-message').innerHTML = 'Add product successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("");}, 3000);
                });
                $('.add_product-message').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        });
}
// Function handle edit staff
function HandleEditProduct(products, elementShow) {
    let i = 0;
    let dataProduct = products.map(function(product) {
        return `
            <tr>
                <td>${++i}</td>
                <td>${product.name}</td>
                <td style="width: 30%;">
                    <img src="${product.image}" alt="Avatar" style="width: 100px; height: 100px;">
                </td>
                <td class="width-12">${product.quantity}</td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" id="btn-product_edit" class="btn-edit-${product._id}">Edit</button></td>
                <td style="width: 4.5%;"><button style="cursor:pointer;" class="btn-delete-${product._id}">Delete</button></td> 
            </tr>
        `;
    });
    elementShow.innerHTML = dataProduct.join('');

    products.forEach(function(product) {
        $('.btn-edit-' + product._id).addEventListener('click', function() {
            $('.modal-product_add').classList.toggle('modal-hidden');
            $('.modal-product_body table').innerHTML = `
                <tr>
                    <td>
                        <label>Product Name</label>
                    </td>
                    <td>
                        <input type="text" name="product_name" value="${product.name}">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Link Image</label>
                    </td>
                    <td>
                        <input type="text" name="product_image" value="${product.image}">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Quantity</label>
                    </td>
                    <td>
                        <input type="number" name="product_quantity" value="${product.quantity}">
                    </td>
                </tr>
            `;
            $('.modal-product_body button').value = product._id;
            $('#btn-product_submit').addEventListener('click', function() {
                HandleUpdateProduct($('#btn-product_submit').value);
            });
        });

        $('.btn-delete-' + product._id).addEventListener('click', function() {
            HandleDeleteProduct(product._id);
        });
    });
}
// Function delete product
function HandleDeleteProduct(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(productApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.product-' + id).remove();
            $('.btn-delete-' + id).parentElement.parentElement.remove();
        })
        .catch(function(error) {
            console.log(error);
        });
}
// Function update product
function HandleUpdateProduct(id) {
    let name = $('.modal-product_body input[name="product_name"]').value;
    let linkImage = $('.modal-product_body input[name="product_image"]').value;
    let quantity = $('.modal-product_body input[name="product_quantity"]').value;

    let product = {
        name: name,
        image: linkImage,
        quantity: quantity,
        quantityBegin: quantity
    };
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };

    fetch(productApi + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.edit-product_message').innerHTML = 'Update product successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("");}, 2000);
                });
                $('.edit-product_message').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// --------------------------------Function handle data from warrantyApi--------------------------------
// Function get data warranty
function GetWarranty(callback) {
    fetch(warrantyApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
// Function render data warranty to table
function RenderWarranty(warranties, elementShow) {
    let i = 0;
    let dataCus = warranties.map(function(warranty) {
        let data = `
            <tr>
                <td>${++i}</td>
                <td class="width-20">${warranty.customer.name}</td>
                <td class="width-20">${warranty.customer.phone}</td>
                <td style="height: 20px; overflow: auto;" class="warranty-product-${warranty._id}">
                    
                </td>
                <td class="width-20" style="height: 20px; overflow: auto;">
                    ${
                        warranty.product.map(function(product) {
                            return "- " + product.end + '<br>';
                        }).join('')
                    }
                </td>
            </tr>
        `;
        
        warranty.product.forEach(function(product) {
            fetch(productApi + product._id)
                .then(function(response) {
                    return response.json();
                })
                .then(function(product) {
                    $('.warranty-product-' + warranty._id).innerHTML += `
                        - ${product.name} <br>
                    `;
                });
        })
        return data;
    });
    elementShow.innerHTML = dataCus.join('');
}

// --------------------------------Function handle Receipt--------------------------------
// Function show staff
function ShowStaff() {
    fetch(staffApi)
        .then(function(response) {
            return response.json();
        })
        .then((staffs) => {
            let staff = staffs.map(function(staff) {
                return `
                    <tr>
                        <td style="width: 10%;">
                            <input type="radio" name="staff" value="${staff._id}">
                        </td>
                        <td style="width: 30%;">
                            <img src="${staff.image}" alt="Avatar" style="width: 100%;">
                        </td>
                        <td>${staff.name}</td>
                    </tr>
                `;
            });
            $('.table-receipt_staff table').innerHTML = staff.join('');
        });
}
// Function show product
function ShowProduct() {
    fetch(productApi)
        .then(function(response) {
            return response.json();
        })
        .then((products) => {
            let product = products.map(function(product) {
                return `
                    <tr style="height: 100%;">
                        <td>
                            <input type="checkbox" name="checked-product" value="${product._id}">
                        </td>
                        <td style="width: 25%;">
                            <img src="${product.image}" alt="Avatar" style="width: 50%;">
                        </td>
                        <td>${product.name}</td>
                        <td style="width: 17%;">
                            <input type="date" name="receipt-product_date-${product._id}">
                        </td>
                        <td class="width-12">
                            <input type="number" name="receipt-product_quantity-${product._id}" min="0" max="${product.quantity}">
                        </td>
                    </tr>
                `;
            });

            $('.table-receipt_product table').innerHTML = product.join('');
        });
}
// Function add customer to database
function HandleAddReceipt() {
    $('.form-add_receipt .submit-btn').addEventListener('click', function() {
        // Handle get data customer from receipt
        let name = $('.form-add_receipt input[name="name_customer"]').value;
        let address = $('.form-add_receipt input[name="address"]').value;
        let phone = $('.form-add_receipt input[name="phone"]').value;

        let customerAdd = {
            name: name,
            address: address,
            phone: phone
        };

        let customerId;
        let check = false;
        fetch(customerApi)
            .then(function(response) {
                return response.json();
            })
            .then(function(customers) {
                customers.forEach(function(customer) {
                    if (customer.name == name && customer.address == address && customer.phone == phone) {
                        customerId = customer._id;
                        check = true;
                        GetDataReceipt(customerId);
                    }
                });
                if (check == false) {
                    let options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(customerAdd)
                    };
                    fetch(customerApi, options)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(customer) {
                            customerId = customer._id;
                            GetDataReceipt(customerId);
                        });
                }
            });
    });
}
function GetDataReceipt(customerId) {
    // Handle get data staff from receipt
    let staffId = $('.table-receipt_staff input[name="staff"]:checked').value;

    // Handle get data product from receipt
    let products = [];
    let productId;
    let quantity;
    let productDate;
    $$('input[name="checked-product"]:checked').forEach(function(product) {
        new Promise( (resolve, reject) => {
            productId = product.value;
            productDate = $('input[name="receipt-product_date-' + productId + '"]').value.toString();
            quantity = $('input[name="receipt-product_quantity-' + productId + '"]').value;
            let itemProduct = {
                _id: productId,
                quantity: quantity,
                end: productDate
            }
            products.push(itemProduct);
            resolve(
                {
                    productId: productId,
                    quantity: quantity,
                }
            );
        }).then(function(data) {
            fetch(productApi + data.productId)
                .then(function(response) {
                    return response.json();
                })
                .then(function(product) {
                    let quantity = product.quantity - data.quantity;
                    let options = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            quantity: quantity
                        })
                    };
                    fetch(productApi + data.productId, options);
                });
        });
    });

    // Handle put data to receipt database
    let receipt = {
        customer: customerId,
        staff: staffId,
        product: products
    };

    AddReceipt(receipt);
}
function AddCustomer(customer) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    };

    fetch(customerApi, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            console.log('Add customer successfully');
        });
}
function AddReceipt(receipt) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receipt)
    };

    fetch(warrantyApi, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            $('.form-add_receipt .submit-btn').innerHTML = 'Successfully!';
            async function ClearMessage() {
                let AddMessage = new Promise(function(resolve) {
                    setTimeout(function() {resolve("Add");}, 3000);
                });
                $('.form-add_receipt .submit-btn').innerHTML = await AddMessage;
                setTimeout(function() {location.reload();}, 1000);
            }
            
            ClearMessage();
        });
}

// ------------------ Function Handle Bill ------------------
function RenderBill(warranties, elementShow) {
    let i = 0;
    let dataProduct = warranties.map(function(warranty) {
        return `
            <tr class="bill-${warranty._id}">
                <td>${++i}</td>
                <td style="width: 30%;">${warranty.customer.name}</td>
                <td style="width: 20%;">${warranty.customer.phone}</td>
                <td>${warranty.customer.address}</td>
                <td style="width: 5%;"><button class="btn-detail" value="${warranty._id}">Detail</button></td>
            </tr>
        `;
    });
    elementShow.innerHTML = dataProduct.join('');

    // Handle click button detail
    $$('.btn-detail').forEach(function(btn) {
        btn.addEventListener('click', function() {
            $('.bill-content').classList.toggle('modal-hidden');
            
            fetch(warrantyApi + '/' + btn.value)
                .then(function(response) {
                    return response.json();
                })
                .then(function(warranty) {
                    $('.bill-header #staff-name').innerHTML = warranty.staff.name;
                    $('.bill-header #customer-id').innerHTML = warranty.customer._id;
                    $('.bill-header #date').innerHTML = warranty.date;
                    $('.bill-header #customer-name').innerHTML = warranty.customer.name;
                    $('.bill-header #customer-address').innerHTML = warranty.customer.address;
                    $('.bill-header #customer-phone').innerHTML = warranty.customer.phone;

                    let i = 0;
                    let toTal = 0;
                    let dataProduct = warranty.product.map(function(product) {
                        let dataTableProduct = `
                            <tr>
                                <td>${++i}</td>
                                <td class="bill-name_${product._id}"></td>
                                <td class="width-20 bill-price_${product._id}"></td>
                                <td class="width-12">${product.quantity}</td>
                                <td class="width-20 bill-total_${product._id}"></td>
                            </tr>
                        `;

                        fetch(productApi + '/' + product._id)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(productInfo) {
                                $('.bill-name_' + product._id).innerHTML = productInfo.name;
                                $('.bill-price_' + product._id).innerHTML = productInfo.price;
                                $('.bill-total_' + product._id).innerHTML = product.quantity * productInfo.price;
                                toTal += product.quantity * productInfo.price;
                                return toTal;
                            })
                            .then(function(toTal) {
                                $('.bill-footer #total').innerHTML = toTal;
                            });
                        return dataTableProduct;
                    });
                    $('.table-bill table').innerHTML = dataProduct.join('');
                });
        });
    });

    // Handle click button close
    $('.bill-title .icon').addEventListener('click', function() {
        $('.bill-content').classList.toggle('modal-hidden');
    });
}

// ------------------ Function Handle Revenue ------------------
function RenderRevenue(products, elementShow) {
    let i = 0;
    let toTal = 0;
    let quantitySold = 0;
    let dataRevenue = products.map(function(product) {
        quantitySold = product.quantityBegin - product.quantity
        let dataProduct = `
            <tr>
                <td>${++i}</td>
                <td class="width-20">${product._id}</td>
                <td>${product.name}</td>
                <td class="width-12">${quantitySold}</td>
                <td class="width-12">${product.price * quantitySold}</td>
            </tr>
        `;
        toTal += product.price * quantitySold;
        return dataProduct;
    });
    $('.total-revenue-footer #total-revenue').innerHTML = toTal;
    elementShow.innerHTML = dataRevenue.join('');
}
