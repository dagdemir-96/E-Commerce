
import { getFromLocalStorage, renderCartTotal, saveToLocalStorage, updateCartIcon } from "./helper.js";
import { renderCartItems } from "./ui.js";



// localStorage'dan cart elemanlarını al
let cart = getFromLocalStorage("cart");

// Sepete ürün ekleyen fonksiyon
// Sepete ürün ekleyen fonksiyon
const addToCart = (e, products) => {
  // Tıklanılan elemana ait id'ye eriş
  const productId = Number(e.target.dataset.id);

  // Id'si bilinen elemanı products içerisinde bul
  const product = products.find((product) => product.id === productId);
  //sepete ekelenecek ürün önceden eklendi mi?

  const exitingItem = cart.find((item) => item.id === productId);

  //ürün sepete eklendi ise
  if (exitingItem) {
    //ürün miktarını güncelle
    exitingItem.quantity++;
  }
  else {
    //ürünü sepete ekle

     const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    // Sepet dizisine ürün ekle
    cart.push(cartItem);
  }

  //sepeti güncelle
  saveToLocalStorage("cart", cart);

  //add to cart butonunun içeriğini güncelle
  e.target.textContent = "Added";

  //2 sn sonra botton içeriğini eski haline çevir
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);
};
  //!sepet iconunu güncelle
  updateCartIcon(cart);
//sepetten ürün kaldıran fonksiyon

const removeFromCart = (e) => {
  //silme işlemi için onay
  const response = confirm("silme işlemini onaylıyor musunuz?")
  //silme işlemi onaylanırsa

  if (response) {
    //tıklanınlan ürünün id sine eriş
    const productId = parseInt(e.target.dataset.id);

    //sepetten kaldırılacak eleman
    //sepetteki ürün id sini productid ye eşleşmeyenleri diziye aktar

    cart = cart.filter((item) => item.id !== productId);
    //localstorage güncelle
    saveToLocalStorage("cart", cart)

    //arayüzü renerla

    renderCartItems(cart);
     //!sepet iconunu güncelle
  updateCartIcon(cart);
//toplam fiyatı rener et
  renderCartTotal(cart);
  }
};

//sepetteki ürünlerin fiyatını güncelleyen fonksiyon

const onQuantityChange = (e) => {

  //güncellenecek elemanın id sine eriş
  const productId = +e.target.dataset.id;
  //yeni ürün miktarına eriş
  const newQuantity = e.target.value;
  //yeni miktar 0 dan büyük ise 
  if (newQuantity > 0) {
    //güncellenecek elemanı dizi içerisinde 
    const updateItem = cart.find((item) => item.id === productId);
    //ürün miktarını güncelle
    updateItem.quantity = newQuantity;
    //localStorage ı güncelle
    saveToLocalStorage("cart", cart);
  } else {
    removeFromCart(e)
  }
   //!sepet iconunu güncelle
  updateCartIcon(cart);

//toplam fiyatı rener et
  renderCartTotal(cart);


};
export { addToCart, removeFromCart, onQuantityChange };