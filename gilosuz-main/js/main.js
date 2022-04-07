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

const productRender = function (product) {
    const mark = 1500000;
    const productItem = createElement("li", "col-4");
    const productsContent = createElement("div", "card-body");
    const productsTitle = createElement("h2", "card-title", product.title);
    const productsPrice = createElement("p", "card-text fw-bold");
    const productsMark = createElement("mark", "", product.price);
    const productsImg = createElement("img", "card-img-top");
    productsImg.src = product.img;
    const productCard = createElement("div", "card");
    const productsParagraph = createElement("p", "badge bg-success", product.model);
    const productBtnWrapper = createElement("div", "position-absolute top-0 end-0 d-flex");
    const productBtn = createElement("button", "btn rounded-0 btn-secondary");
    productBtn.setAttribute("data-id", product.id);
    productBtn.setAttribute("data-bs-toggle", "modal");
    productBtn.setAttribute("data-bs-target", "#new-product-modal");
    const productBtnDanger = createElement("button", "btn rounded-0 btn-danger");
    productBtnDanger.setAttribute("data-id", product.id);
    const productInner = createElement("i", "fa-solid fa-pen");
    productInner.style.pointerEvents = "none";
    const productInnerDanger = createElement("i", "fa-solid fa-trash");
    productInnerDanger.style.pointerEvents = "none";
    const productsPromotionPrice = createElement("p", "card-text");
    const productsDate = createElement("p", "card-text", showDate(product.addedDate));
    const productPromotion = createElement("s");
    productPromotion.textContent = mark;


    const benefitsList = createElement("ul", "d-flex flex-wrap list-unstyled mt-3");
    const benefitsItem = createElement("li", "me-1 mb-1");
    const benefitsBtn = createElement("button", "btn btn-sm badge rounded-pill btn-primary", product.benefits);


    benefitsItem.append(benefitsBtn);
    benefitsList.append(benefitsItem);



    productsPromotionPrice.append(productPromotion);
    productsPrice.append(productsMark);
    productBtnDanger.append(productInnerDanger);
    productBtn.append(productInner);
    productBtnWrapper.append(productBtn);
    productBtnWrapper.append(productBtnDanger);


    productItem.append(productCard);
    productCard.append(productsImg);
    productCard.append(productsContent);

    productsTable.append(productItem);
    productsContent.append(productBtnWrapper);
    productsContent.append(productsTitle);
    productsContent.append(productsPrice);
    productsContent.append(productsPromotionPrice);
    productsContent.append(productsDate);
    productsContent.append(productsParagraph);
    productsContent.append(benefitsList);



    return productItem;
}

const renderProducts = function () {
    productsTable.innerHTML = "";
    products.forEach(function (currentProducts) {
        const productItem = productRender(currentProducts);
        productsTable.append(productItem);
    });
}

renderProducts();

const addForm = document.querySelector("#edit-product-table");
const addProductModal = new bootstrap.Modal(document.querySelector("#product-modal"));

addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const elements = evt.target.elements;

    const inputTitle = elements.title;
    const inputPrice = elements.price;
    const inputSelect = elements.manufacturer;
    const inputBenefits = elements.benefits;

    const titleValue = inputTitle.value;
    const priceValue = inputPrice.value;
    const selectValue = inputSelect.value;
    const benefitsValue = inputBenefits.value.split(";");


    if (titleValue.trim() && priceValue && selectValue) {
        const product = {
            id: Math.floor(Math.random() * 1000),
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: priceValue,
            model: selectValue,
            addedDate: new Date().toISOString(),
            benefits: benefitsValue,
        }
        addProductModal.hide();
        addForm.reset();
        products.push(product);
        const elProduct = productRender(product);
    }
})

const select = document.querySelector("#manufacturer");
for (let m = 0; m < manufacturers.length; m++) {
    const currentManufacturers = manufacturers[m];
    const optionSelect = createElement("option", "", currentManufacturers.name);

    select.append(optionSelect);

}


const input = document.querySelector("#edit-benefits");
const optionsWrapper = document.querySelector("option-wrapper");
let option = [];
input.addEventListener("input", function () {

    const splitedValue = input.value.trim().split(";");

    if (splitedValue.length === 2) {
        option.push(splitedValue[0]);
        input.value = "";

        optionsWrapper.innerHTML = "";
        for (let x = 0; x < option.length; x++) {
            const optionSpan = createElement("span");
            optionSpan.textContent = option[x];

            optionsWrapper.append(optionSpan);
        }
    }
})
const editTitle = document.querySelector("#edit-title");
const editPrice = document.querySelector("#edit-price");
const editManufacturer = document.querySelector("#edit-manufacturer");
const editBenefits = document.querySelector("#benefits");


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
        products.splice(productItemIndex, 1);

    } else if (evt.target.matches(".btn-secondary")) {
        const editProductClicked = +evt.target.dataset.id;
        const editProductItem = products.find(function (product) {
            return product.id === editProductClicked;
        })
        editTitle.value = editProductItem.title;
        editPrice.value = editProductItem.price;
        editManufacturer.vlaue = editProductItem.manufacturers;
        editBenefits.value = editProductItem.benefits;

        editForm.setAttribute("data-editing-id", editProductClicked);

    }
    renderProducts();
});
const editForm = document.querySelector("#new-product-table");
const editProductModal = new bootstrap.Modal(document.querySelector("#new-product-modal"));
editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const editingId = +evt.target.dataset.editingId;

    const titleValue = editTitle.value;
    const priceValue = editPrice.value;
    const selectValue = editManufacturer.value;
    const editBenefitsValue = editBenefits.value.split(";");

    if (titleValue.trim() && priceValue && selectValue) {
        const product = {
            id: editingId,
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: priceValue,
            model: selectValue,
            addedDate: new Date().toISOString(),
            benefits: editBenefitsValue,
        }

        const editingItemIndex = products.findIndex(function (product) {
            return product.id === editingId;
        })
        products.splice(editingItemIndex, 1, product);
        editForm.reset();
        renderProducts();
        editProductModal.hide();

        
    }
});
const editSelect = document.querySelector("#edit-manufacturer");
for (let l = 0; l < manufacturers.length; l++) {
    const editCurrentManufacturers = manufacturers[l];
    const editOptionSelect = createElement("option", "", editCurrentManufacturers.name);

    editSelect.append(editOptionSelect);
}