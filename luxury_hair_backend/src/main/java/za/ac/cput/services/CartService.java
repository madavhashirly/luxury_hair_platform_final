package za.ac.cput.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.repository.CartRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart addProductToCart(Product product, UserLogin user, int quantity) {
        Cart existingCart = cartRepository.findByProduct_ProductIdAndUserLogin_UserId(product.getProductId(), user.getUserId());

        if (existingCart != null) {
                existingCart = new Cart.Builder()
                    .copy(existingCart) 
                    .setQuantity(existingCart.getQuantity() + quantity)  
                    .build();
            return cartRepository.save(existingCart);
        }

        Cart newCart = new Cart.Builder()
                .setProduct(product)
                .setUserLogin(user)
                .setQuantity(quantity)
                .build();
        return cartRepository.save(newCart);
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserLogin_UserId(userId);
    }

    public Optional<Cart> getCartById(Long cartId) {
        return cartRepository.findById(cartId);
    }

    public void deleteCartItem(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public Cart updateCartQuantity(Long cartId, int newQuantity) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);

        if (cartOpt.isPresent()) {
            Cart existingCart = cartOpt.get();
         
            Cart updatedCart = new Cart.Builder()
                    .copy(existingCart) 
                    .setQuantity(newQuantity) 
                    .build();
            return cartRepository.save(updatedCart);
        }
        return null; 
    }

    public void deleteAllCartItemsForUser(Long userId) {
        List<Cart> userCarts = cartRepository.findByUserLogin_UserId(userId);
        cartRepository.deleteAll(userCarts);
    }
}
