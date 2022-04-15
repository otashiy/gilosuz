const createElement = function (elName, className, textContent) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;
    if (textContent) {
        createdElement.textContent = textContent;
    }
    return createdElement;
}

const addZero = function (number) {
    return number < 10 ? "0" + number : number;
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())}`;
}

const productsTable = document.querySelector("#products");
const productTemplate = document.querySelector("#template");

const productRender = function (product) {
    const mark = product.price * 0.25;

    const productsItem = productTemplate.content.cloneNode(true);
    

    const productImg = productsItem.querySelector(".products__item-img");
    productImg.src = product.img;
    const productTitle = productsItem.querySelector(".products__item-title");
    productsItem.querySelector(".products__item-title").textContent = product.title;
    const productsMark = productsItem.querySelector(".products__item-mark");
    productsItem.querySelector(".products__item-mark").textContent = product.price;
    const productsPromotion = productsItem.querySelector(".undefined");
    productsItem.querySelector(".undefined").textContent = mark;
    const productsDate = productsItem.querySelector(".products__item-date");
    productsItem.querySelector(".products__item-date").textContent = showDate(product.addedDate);
    const productsItemTitle = productsItem.querySelector(".products__item-subtitle");
    productsItem.querySelector(".products__item-subtitle").textContent = product.model;
    const productBtn = productsItem.querySelector(".products__item-edit");
    productBtn.setAttribute("data-id", product.id);
    const productBtnDanger = productsItem.querySelector(".products__item-delete");
    productBtnDanger = ("data-id", product.id);




    productsTable.append(productsItem);
    return productsItem;
}



const elCount = document.querySelector(".count");
let showingProducts = products.slice();

const renderProducts = function () {
    productsTable.innerHTML = "";

   const productFragment = document.createDocumentFragment();

    elCount.textContent = `Count: ${showingProducts.length}`;
    showingProducts.forEach(function (product) {
        const elProduct = productRender(product);
       productFragment.append(elProduct);
        
    });
   productsTable.append(productFragment);
}
renderProducts();

const select = document.querySelector("#manufacturer");
for (let m = 0; m < manufacturers.length; m++) {
    const currentManufacturers = manufacturers[m];
    const optionSelect = createElement("option", "", currentManufacturers.name);

    select.append(optionSelect);

}

const addProductModal = new bootstrap.Modal(document.querySelector("#product-modal"));


const addInput = document.querySelector("#add-benefits");
const addList = document.querySelector("#benefits-table");
let addOption = [];
addInput.addEventListener("input", function () {

    const addSplitedValue = addInput.value.trim().split(";");

    if (addSplitedValue.length === 2) {
        addOption.push(addSplitedValue[0]);
        addInput.value = "";

        addList.innerHTML = "";
        for (let a = 0; a < addOption.length; a++) {
            const addOptionLi = createElement("li", "me-1 mb-1");
            const addOptionBtn = createElement("button", "btn btn-sm badge rounded-pill btn-primary", option[a]);
            addOptionLi.append(addOptionBtn);
            addList.append(addOptionLi);
        }
    }
});

const addForm = document.querySelector("#edit-product-table");
addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const inputTitle = elements.title;
    const inputPrice = elements.price;
    const addInputSelect = elements.manufacturer;

    const titleValue = inputTitle.value;
    const priceValue = inputPrice.value;
    const addSelectValue = addInputSelect.value;


    if (titleValue.trim() && priceValue && addSelectValue) {
        const addProduct = {
            id: Math.floor(Math.random() * 1000),
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: priceValue,
            model: addSelectValue,
            addedDate: new Date().toISOString(),
            benefits: addOption,
        }
        addProductModal.hide();
        addForm.reset();
        products.push(addProduct);
        localStorage.setItem("products", JSON.stringify(products));
        showingProducts.push(addProduct);
        renderProducts();
    }
});


const editTitle = document.querySelector("#edit-title");
const editPrice = document.querySelector("#edit-price");
const editManufacturer = document.querySelector("#edit-manufacturer");
const editBenefits = document.querySelector("#edit-benefits");

const btn = document.querySelector("#product-btn");
btn.addEventListener("click", function () {
    optionsWrapper.innerHTML = "";
    option = [];
});
productsTable.addEventListener("click", function (evt) {
    if (evt.target.matches(".btn-danger")) {
        const productId = +evt.target.dataset.id;
        const productItemIndex = products.findIndex(function (product) {
            return product.id === productId;
        })
        const productShowItemIndex = products.findIndex(function (product) {
            return product.id === productId;
        })

        products.splice(productItemIndex, 1);
        localStorage.setItem("products", JSON.stringify(products));
        showingProducts.splice(productShowItemIndex, 1);


    } else if (evt.target.matches(".btn-secondary")) {
        const editProductClicked = +evt.target.dataset.id;
        const editProductItem = products.find(function (product) {
            return product.id === editProductClicked;
        })
        editTitle.value = editProductItem.title;
        editPrice.value = editProductItem.price;
        editManufacturer.value = editProductItem.model;
        editBenefits.value = editProductItem.benefits;

        editForm.setAttribute("data-editing-id", editProductClicked);

    }
    renderProducts();
});


const input = document.querySelector("#edit-benefits");
const optionsWrapper = document.querySelector("#edit-benefits-table");
let option = [];
input.addEventListener("input", function () {

    const splitedValue = input.value.trim().split(";");

    if (splitedValue.length === 2) {
        option.push(splitedValue[0]);
        input.value = "";

        optionsWrapper.innerHTML = "";
        for (let x = 0; x < option.length; x++) {
            const optionLi = createElement("li", "me-1 mb-1");
            const optionBtn = createElement("button", "btn btn-sm badge rounded-pill btn-primary", option[x])
            optionLi.append(optionBtn)
            optionsWrapper.append(optionLi);
        }
    }
});

const editForm = document.querySelector("#new-product-table");
const editProductModal = new bootstrap.Modal(document.querySelector("#new-product-modal"));


editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const editingId = +evt.target.dataset.editingId;

    const titleValue = editTitle.value;
    const priceValue = editPrice.value;
    const selectValue = editManufacturer.value;

    if (titleValue.trim() && priceValue && selectValue) {
        const product = {
            id: editingId,
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: priceValue,
            model: selectValue,
            addedDate: new Date().toISOString(),
            benefits: option,
        }

        const editingItemIndex = products.findIndex(function (product) {
            return product.id === editingId;
        })
        const editingShowingItemIndex = showingProducts.findIndex(function (product) {
            return product.id === editingId;
        })
        products.splice(editingItemIndex, 1, product);
        localStorage.setItem("products", JSON.stringify(products));
        showingProducts.splice(editingShowingItemIndex, 1, product);
        editForm.reset();
        editProductModal.hide();
        renderProducts();
    }
});

const editSelect = document.querySelector("#edit-manufacturer");
for (let l = 0; l < manufacturers.length; l++) {
    const editCurrentManufacturers = manufacturers[l];
    const editOptionSelect = createElement("option", "", editCurrentManufacturers.name);

    editSelect.append(editOptionSelect);
}
const filterFrom = document.querySelector(".filter");

filterFrom.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const elements = evt.target.elements;
    
    const fromValue = elements.from.value;
    const toValue = elements.to.value;
    const searchValue = elements.search.value;
    const sortValue = elements.sortby.value;

    showingProducts = products
    .sort(function(a, b) {
        switch (sortValue) {
            case "1":
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                };
            case "2":
                return b.price - a.price
            case "3":
            return a.price - b.price
                break;
            default:
                break;
        }
    })
    .filter(function(product) {
    return product.price >= fromValue;
    }).filter(function(product) {
    return !toValue ? true : product.price <= toValue;
    }).filter(function(product) {
       const titleRegExp = new RegExp(searchValue, "gi");
       return product.title.match(titleRegExp);
    });

    renderProducts();
});
