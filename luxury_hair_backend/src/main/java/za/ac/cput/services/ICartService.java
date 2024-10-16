package za.ac.cput.services;

import za.ac.cput.domain.Cart;


import java.util.List;

public interface ICartService extends IService<Cart, Long> {
    List<Cart> getall();
    void delete(Long cartId);



}
