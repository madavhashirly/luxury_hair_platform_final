package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Cart;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserLogin_UserId(Long userId);

    Cart findByProduct_ProductIdAndUserLogin_UserId(Long productId, Long userId);
}
