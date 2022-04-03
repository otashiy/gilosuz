const createElement = function (elName, className, textContent) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;
    if (textContent) {
        createdElement.textContent = textContent;
    }
    return createdElement;
}

const addZero = function(number) {
    return number < 10 ? "0" + number : number;
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth())}.${addZero(date.getFullYear())}`;
}

const productsTable = document.querySelector("#products");

const productRender = function(product) {
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
    const productBtnDanger = createElement("button", "btn rounded-0 btn-danger");
    const productInner = createElement("i","fa-solid fa-pen");
    const productInnerDanger = createElement("i", "fa-solid fa-trash");
    const productsPromotionPrice = createElement("p", "card-text");
    const productsDate = createElement("p", "card-text", showDate(product.addedDate));
    const productPromotion = createElement("s");
    productPromotion.textContent = mark;


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
    
    return productItem;
}

for (let i = 0; i < products.length; i++) {
    const currentProducts = products[i];
    
    const productItem = productRender(currentProducts)
    
    productsTable.append(productItem);

   
}

const addForm = document.querySelector("#product-table");
const addProductModal = new bootstrap.Modal(document.querySelector("#edit-product-modal"));

addForm.addEventListener("submit", function(evt) {
evt.preventDefault();
const elements = evt.target.elements;

const inputTitle = elements.title;
const inputPrice = elements.price;
const inputSelect = elements.manufacturer;
const inputBenefits = elements.benefits;

const titleValue = inputTitle.value;
const priceValue = inputPrice.value;
const selectValue = inputSelect.value;
const benefitsValue = inputBenefits.value.split(",");


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

const input = document.querySelector("#benefits");
const optionsWrapper = document.querySelector("option-wrapper");
const option = [];
input.addEventListener("input", function() {

const splitedValue = input.value.trim().split(",");
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
