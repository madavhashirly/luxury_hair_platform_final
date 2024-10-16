package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.services.CartService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addProductToCart(@RequestBody CartRequest cartRequest) {
        Cart cart = cartService.addProductToCart(cartRequest.getProduct(), cartRequest.getUser(), cartRequest.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
        List<Cart> cartList = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cartList);
    }

    @GetMapping("/item/{cartId}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
        Optional<Cart> cart = cartService.getCartById(cartId);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{cartId}")
    public ResponseEntity<Cart> updateCartQuantity(@PathVariable Long cartId, @RequestParam int newQuantity) {
        Cart updatedCart = cartService.updateCartQuantity(cartId, newQuantity);
        if (updatedCart != null) {
            return ResponseEntity.ok(updatedCart);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartId) {
        cartService.deleteCartItem(cartId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<Void> clearCartForUser(@PathVariable Long userId) {
        cartService.deleteAllCartItemsForUser(userId);
        return ResponseEntity.ok().build();
    }

    public static class CartRequest {
        private Product product;
        private UserLogin user;
        private int quantity;

        public Product getProduct() {
            return product;
        }

        public void setProduct(Product product) {
            this.product = product;
        }

        public UserLogin getUser() {
            return user;
        }

        public void setUser(UserLogin user) {
            this.user = user;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
