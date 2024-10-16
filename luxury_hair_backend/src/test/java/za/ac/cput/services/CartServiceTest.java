package za.ac.cput.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.repository.CartRepository;
import za.ac.cput.repository.ProductRepository;
import za.ac.cput.repository.UserLoginRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest

public class CartServiceTest {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserLoginRepository userLoginRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    private UserLogin user;
    private Product product;

    @BeforeEach
    void setUp() {
        user = new UserLogin.Builder()
                .setEmail("test@example.com")
                .setPassword("password")
                .setFullName("Test User")
                .setUserType("CUSTOMER")
                .build();
        userLoginRepository.save(user);

        product = new Product.Builder()
                .setHairTexture("Brazilian")
                .setHairStyle("Straight")
                .setHairSize("18 inches")
                .setHairColor("Black")
                .setHairStock(true)
                .setHairPrice(99.99)
                .build();
        productRepository.save(product);
    }

    @Test
    void testAddProductToCart_NewItem() {
        Cart cart = cartService.addProductToCart(product, user, 1);

        assertThat(cart).isNotNull();
        assertThat(cart.getProduct()).isEqualTo(product);
        assertThat(cart.getUserLogin()).isEqualTo(user);
        assertThat(cart.getQuantity()).isEqualTo(1);
    }

    @Test
    void testAddProductToCart_ExistingItem() {
        cartService.addProductToCart(product, user, 1);
        Cart cart = cartService.addProductToCart(product, user, 2);

        assertThat(cart).isNotNull();
        assertThat(cart.getQuantity()).isEqualTo(3); 
    }

    @Test
    void testGetCartByUserId() {
        cartService.addProductToCart(product, user, 1);
        List<Cart> carts = cartService.getCartByUserId(user.getUserId());

        assertThat(carts).isNotEmpty();
        assertThat(carts.size()).isEqualTo(1);
        assertThat(carts.get(0).getUserLogin()).isEqualTo(user);
    }

    @Test
    void testGetCartById() {
        Cart cart = cartService.addProductToCart(product, user, 1);
        Cart foundCart = cartService.getCartById(cart.getCartId()).orElse(null);

        assertThat(foundCart).isNotNull();
        assertThat(foundCart.getCartId()).isEqualTo(cart.getCartId());
    }

    @Test
    void testDeleteCartItem() {
        Cart cart = cartService.addProductToCart(product, user, 1);
        cartService.deleteCartItem(cart.getCartId());
        cartService.deleteCartItem(11L);

        assertThat(cartService.getCartById(cart.getCartId())).isEmpty(); 
    }

}
