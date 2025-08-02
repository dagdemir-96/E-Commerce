const fetchProducts = async () => {
  try {
    // Api'a istek at
    const response = await fetch("../db.json");

    // Api'dan gelen veriyi js nesnesine çevir
    const data = await response.json();

    // Products verisini return et
    return data.products;
  } catch (error) {
    console.log(`Hataaa: ${error}`);

    // Hata varsa console'a çıktı ver ve geriye boş bir dizi dönder
    return [];
  }
};
export default fetchProducts;