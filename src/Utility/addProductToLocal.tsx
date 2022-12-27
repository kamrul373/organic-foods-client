export const addProductToLocal = (id: string, qty: number = 1) => {
    let shoppingCart;
    shoppingCart = localStorage.getItem("organio-cart");

    // checking if shopping cart exists or not
    if (shoppingCart) {
        shoppingCart = JSON.parse(shoppingCart);
    } else {
        shoppingCart = {}
    }
    // defining quantity
    let quantity: number;
    if (id in shoppingCart) {
        quantity = shoppingCart[id] + qty;
    } else {
        quantity = 1;
    }

    shoppingCart[id] = quantity;

    localStorage.setItem("organio-cart", JSON.stringify(shoppingCart));
}