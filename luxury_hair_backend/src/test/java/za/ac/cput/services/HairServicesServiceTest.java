package za.ac.cput.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.HairServices;
import za.ac.cput.factory.HairServicesFactory;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class HairServicesServiceTest {

    private HairServices hairService1;
    private HairServices hairService2;
    private HairServices hairService3;

    private Customer customer;

    @Autowired
    private HairServicesService service;

    @Autowired
    private CustomerService customerService;

    @BeforeEach
    void setUp() {
        // Assuming you have a way to create or fetch a customer for testing
        customer = customerService.create(new Customer.Builder().setCustomerId(1L).build());

        // Create hair services with serviceType
        hairService1 = HairServicesFactory.buildHairServices(1, new byte[]{1, 2, 3}, LocalDate.now(), LocalTime.now(), "Notes1", "Wash", customer);
        hairService2 = HairServicesFactory.buildHairServices(2, new byte[]{4, 5, 6}, LocalDate.now().plusDays(1), LocalTime.now().plusHours(1), "Notes2", "Cut", customer);
        hairService3 = HairServicesFactory.buildHairServices(3, new byte[]{7, 8, 9}, LocalDate.now().plusDays(2), LocalTime.now().plusHours(2), "Notes3", "Color", customer);
    }

    @Test
    void create() {
        HairServices createdHairService1 = service.create(hairService1);
        assertNotNull(createdHairService1);
        assertEquals("Wash", createdHairService1.getServiceType());  // Check the serviceType
        System.out.println(createdHairService1);
    }

    @Test
    void read() {
        HairServices createdHairService1 = service.create(hairService1);
        HairServices readHairService = service.read(createdHairService1.getHairServicesId());
        assertNotNull(readHairService);
        assertEquals("Wash", readHairService.getServiceType());  // Check the serviceType
        System.out.println(readHairService);
    }

    @Test
    void update() {
        HairServices createdHairService2 = service.create(hairService2);
        HairServices updatedHairService = new HairServices.Builder().copy(createdHairService2)
                .setAdditionalNotes("Updated Notes")
                .setServiceType("Trim")  // Update the service type
                .build();
        HairServices updated = service.update(updatedHairService);
        assertEquals("Trim", updated.getServiceType());  // Check the updated service type
        System.out.println(updated);
    }

    @Test
    void getall() {
        service.create(hairService1);
        service.create(hairService2);
        service.create(hairService3);
        assertEquals(3, service.getall().size());
    }
}
