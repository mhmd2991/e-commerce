const cartPageSection = document.querySelector(".cart-table .cart-body");

function renderCartItems() {
    cartPageSection.innerHTML = "";
    //Clear Cart Element
    cart.forEach((item) => {
        cartPageSection.innerHTML += `
<div class="cart-item">
    <div class="cart-info" onclick="removeItemFromCart(${item.id})">
        <img src="${item.imgSrc}" alt="${item.name}">
        <h4>${item.name}</h4>
    </div>
    <div class="unit-price">
        <small>$</small>${item.price}
    </div>
    <div class="units">
        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})"><i class="fas fa-minus"></i></div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})"><i class="fas fa-plus"></i></div>
    </div>
</div>
`;
    });
}
renderCartItems();

//function Coupon Discount
const coupon = "elZero";
const couponInput = document.querySelector("#coupon");
const couponBtn = document.querySelector("#couponBtn");

function discount() {
    let totalPrice = 0;
    let totalItems = 0;
    let discountVal = 25 / 100;
    couponBtn.addEventListener("click", () => {
        const couponValue = couponInput.value;
        if (couponValue === coupon) {
            cart.forEach((item) => {
                totalPrice += item.price * item.numberOfUnits;
                totalItems += item.numberOfUnits;
            });
            totalPrice = totalPrice - (totalPrice * discountVal);
            subtotalEl.innerHTML = `SubTotal (${totalItems} items):$${totalPrice.toFixed(2)}`;
            console.log(totalPrice);
        } else {
            alert("coupon is incorrect");
        }

    });
}

discount();

const payBtn = document.querySelector("#pay");
const paymentSection = document.querySelector("#payment");

payBtn.addEventListener("click", () => {
    paymentSection.classList.add("active");
});

document.addEventListener('mouseup', function (e) {
    if (!paymentSection.contains(e.target)) {
        paymentSection.classList.remove("active");
    }
});

const country = document.querySelector("#country");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const email = document.querySelector("#email");
const cEmail = document.querySelector("#cemail");
const countryCode = document.querySelector("#countryCode");
const phone = document.querySelector("#phone");
const cartNumber = document.querySelector("#cartNumber");
const paymentBtn = document.querySelector("#paymentBtn");

function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

function validateCardNumber(n) {
    //convert number to an array of digits
    let digits = n.toString().split('').map(Number);
    //double every other gigit from right to left 
    const sum = digits.map((digit, idx) => idx % 2 === digits.length % 2 ? fixDouble(digit * 2) : digit).reduce((acc, digit) => acc += digit, 0);
    return sum % 10 === 0;
}

function fixDouble(number) {
    return number > 9 ? number - 9 : number
}

paymentBtn.addEventListener("click", () => {
    if (country.value === "" || email.value === "" || cEmail.value === "" || countryCode === "" || phone === "" || cartNumber === "") {
        alert("please enter your info");
        return;
    }
    if (!validateEmail(email.value)) {
        alert("Please enter a correct email address");
        return;
    }
    if (email.value !== cEmail.value) {
        alert("email confirmation incorrect");
        return;
    }
    if (!validateCardNumber(cartNumber.value)) {
        alert("Please enter a correct credit card number");
        return;
    }
    localStorage.removeItem("CART");
});