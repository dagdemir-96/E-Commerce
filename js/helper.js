//  localStorage a kayıt yapacak fonksiyon

import { uiElements } from "./ui.js";

const saveToLocalStorage = (key, cart) => {
    //dışarıdan verilen key değeri ve  card dizisini locale ekle
    localStorage.setItem(key, JSON.stringify(cart));
};


//localStorage elemanları alacak fonksiyon
const getFromLocalStorage = (key) => {
    //localStorage dan belirtilen key e sahip elemanları al ve js objesine dönüşütür.
    const strData = localStorage.getItem(key);
    //eğer str data varsa bunu json nesnesine çevirp return yap ma değer yoksa bunu boş bir dixi[] olarak retrun et
    return strData ? JSON.parse(strData) : [];
};
//sepetteki ürün miktarını hesaplyarak sepet ikonu yanındaki miktarı güncellen fonksiyon
const updateCartIcon = (cart) => {

    //reduce metodu ile dizideki elemanların toplam tutarını hesaplama
    console.log("CART : ", cart)
    const totalQuantity = cart.reduce(
        (total, item) => total + parseInt(item.quantity),
        0
    );

    

    //elde edilen ürün miktarını sepet kısmına yazdır
    uiElements.cartIcon.setAttribute("data-quantity", totalQuantity);

};


//sepetteki toplam ürün fiyatını hesapla
const calculateCartTotal = (cart) =>
    cart.reduce((total, product) => total + product.price * product.quantity, 0);



//toplam ürün fiyatını rener eden fonksiyon
const renderCartTotal = (cart) => {
    //toplam fiyata eriş
    const totalPrice = calculateCartTotal(cart);

    //sepete 50 euro ekele
    const cartFee = 50.0;

    //sepetteki toplam ürünlerin fiyatını render et
    //totalPrice 100 den küçükse kargo ekle değilse ekelem

    uiElements.cartTotal.textContent = totalPrice > 0 && totalPrice < 100 ? (cargoFee + Number(totalPrice)).toFixed(2) : Number(totalPrice.toFixed(2));
};

export {
    saveToLocalStorage, getFromLocalStorage, updateCartIcon,
    calculateCartTotal, renderCartTotal
};