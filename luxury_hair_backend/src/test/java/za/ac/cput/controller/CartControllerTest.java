package za.ac.cput.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import za.ac.cput.domain.Cart;
import za.ac.cput.domain.Product;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.repository.CartRepository;
import za.ac.cput.repository.ProductRepository;
import za.ac.cput.repository.UserLoginRepository; 
import org.springframework.http.HttpMethod;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@CrossOrigin(origins = "http://localhost:5173")
public class CartControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository; 

    @Autowired
    private UserLoginRepository userLoginRepository; 

    private final String BASE_URL = "http://localhost:8080/LuxuryHairVendingSystemDB/cart";

    private Product product;
    private UserLogin user;
    private CartController.CartRequest cartRequest; 

    @BeforeEach
    public void setup() {
    
        product = new Product.Builder()
                .setHairTexture("Brazilian")
                .setHairStyle("Straight")
                .setHairSize("16")
                .setHairColor("Black")
                .setHairStock(true)
                .setHairPrice(100.0)
                .build();

        user = new UserLogin.Builder()
                .setEmail("testuser@example.com")
                .setPassword("password123")
                .setFullName("Test User")
                .setUserType("Customer")
                .build();


        product = productRepository.save(product);
        user = userLoginRepository.save(user);


        cartRequest = new CartController.CartRequest();
        cartRequest.setProduct(product);
        cartRequest.setUser(user);
        cartRequest.setQuantity(2);
    }

    @Test
    public void testAddProductToCart() {
        ResponseEntity<Cart> response = restTemplate.postForEntity(
                BASE_URL + "/add", cartRequest, Cart.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getQuantity()).isEqualTo(2);
    }

    @Test
    public void testGetCartByUserId() {

        restTemplate.postForEntity(BASE_URL + "/add", cartRequest, Cart.class);

        ResponseEntity<Cart[]> response = restTemplate.getForEntity(
                BASE_URL + "/user/" + 1002, Cart[].class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(List.of(response.getBody())).isNotEmpty();
        System.out.println(Arrays.toString(response.getBody()));
    }

    @Test
    public void testGetCartById() {

        ResponseEntity<Cart> postResponse = restTemplate.postForEntity(BASE_URL + "/add", cartRequest, Cart.class);
        Long existingCartId = postResponse.getBody().getCartId(); 

        ResponseEntity<Cart> response = restTemplate.getForEntity(
                BASE_URL + "/item/" + existingCartId, Cart.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getCartId()).isEqualTo(existingCartId);
    }

    @Test
    public void testUpdateCartQuantity() {

        ResponseEntity<Cart> postResponse = restTemplate.postForEntity(BASE_URL + "/add", cartRequest, Cart.class);
        Long existingCartId = postResponse.getBody().getCartId();

        int newQuantity = 5;
        ResponseEntity<Cart> response = restTemplate.exchange(
                BASE_URL + "/update/" + existingCartId + "?newQuantity=" + newQuantity,
                HttpMethod.PUT,
                null,
                Cart.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getQuantity()).isEqualTo(newQuantity);
    }


    @Test
    public void testClearCartForUser() {

        restTemplate.postForEntity(BASE_URL + "/add", cartRequest, Cart.class);

        ResponseEntity<Void> response = restTemplate.exchange(
                BASE_URL + "/user/" + user.getUserId() + "/clear",
                HttpMethod.DELETE,
                null,
                Void.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);

        ResponseEntity<Cart[]> getResponse = restTemplate.getForEntity(
                BASE_URL + "/user/" + user.getUserId(), Cart[].class);

        assertThat(getResponse.getStatusCodeValue()).isEqualTo(200);
        assertThat(getResponse.getBody()).isNotNull();
        assertThat(List.of(getResponse.getBody())).isEmpty();
    }
}
