package za.ac.cput.services;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Product;
import za.ac.cput.factory.ProductFactory;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class ProductServiceTest {

    @Autowired
    private ProductService productService;

    Product product;


    @Test
    @BeforeEach
    void setUp() {
        byte[] image;
        try{
            image = Files.readAllBytes(Paths.get("src/main/resources/images/NickiBang.jpg"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        product = ProductFactory.buildProduct("Peruvian", "Straight Bang", "24 inches ",
                 "Black", true, 3000, image);
         assertNotNull(product);
        System.out.println(product);
    }


    @Test
    @Order(1)
    void create() {
        Product create = productService.create(product);
        assertNotNull(create);
        System.out.println(create);
    }

    @Test
    @Order(2)
    void read() {
        Product read = productService.read(product.getProductId());
        assertNotNull(read);
        System.out.println(read);
    }

    @Test
    @Order(3)
    void update() {
        Product updateProduct = new Product.Builder().copy(product).setProductId(21L).build();
        Product updated = productService.update(updateProduct);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Order(4)
    void getall() {
        System.out.println(productService.getall());

    }
}