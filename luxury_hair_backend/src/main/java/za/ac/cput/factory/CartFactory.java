package za.ac.cput.factory;

import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;

public class CartFactory {

    public static Cart createCart(Product product, UserLogin userLogin, int quantity) {

        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }
        if (userLogin == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        return new Cart.Builder()
                .setProduct(product)
                .setUserLogin(userLogin)
                .setQuantity(quantity)
                .build();
    }
}
