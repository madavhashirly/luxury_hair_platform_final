package za.ac.cput.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CartRepositoryTest {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserLoginRepository userLoginRepository;

    @Test
    public void testSaveCart() {

        UserLogin user = new UserLogin.Builder()
                .setEmail("testuser@example.com")
                .setPassword("securepassword")
                .setFullName("Test User")
                .build();
        userLoginRepository.save(user);

        Product product = new Product.Builder()
                .setHairTexture("Brazilian")
                .setHairStyle("Straight")
                .setHairSize("14 inches")
                .setHairColor("Black")
                .setHairStock(true)
                .setHairPrice(1500.00)
                .build();
        productRepository.save(product);

        Cart cart = new Cart.Builder()
                .setProduct(product)
                .setUserLogin(user)
                .setQuantity(2)
                .build();
        Cart savedCart = cartRepository.save(cart);

        assertNotNull(savedCart);
        assertEquals(2, savedCart.getQuantity());
        assertEquals(product.getProductId(), savedCart.getProduct().getProductId());
        assertEquals(user.getUserId(), savedCart.getUserLogin().getUserId());
    }

    @Test
    public void testFindCartsByUserId() {

        UserLogin user = new UserLogin.Builder()
                .setEmail("finduser@example.com")
                .setPassword("password123")
                .setFullName("Find User")
                .build();
        userLoginRepository.save(user);

        Product product = new Product.Builder()
                .setHairTexture("Peruvian")
                .setHairStyle("Curly")
                .setHairSize("16 inches")
                .setHairColor("Brown")
                .setHairStock(true)
                .setHairPrice(1800.00)
                .build();
        productRepository.save(product);

        Cart cart1 = new Cart.Builder().setProduct(product).setUserLogin(user).setQuantity(3).build();
        cartRepository.save(cart1);

        Cart cart2 = new Cart.Builder().setProduct(product).setUserLogin(user).setQuantity(5).build();
        cartRepository.save(cart2);

        List<Cart> carts = cartRepository.findByUserLogin_UserId(user.getUserId());

        assertNotNull(carts);
        assertEquals(2, carts.size());
        assertEquals(user.getUserId(), carts.get(0).getUserLogin().getUserId());
    }
}
