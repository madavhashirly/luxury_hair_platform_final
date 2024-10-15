package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.HairServices;
import za.ac.cput.services.HairServicesService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/hair-services")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for the specified origin
public class HairServicesController {

    @Autowired
    private HairServicesService hairServicesService;

    @PostMapping(value = "/save", consumes = "multipart/form-data")
    public ResponseEntity<HairServices> saveHairServices(
            @RequestParam("serviceType") String serviceType,
            @RequestParam("date") String date,
            @RequestParam("time") String time,
            @RequestParam("image") MultipartFile image,
            @RequestParam("additionalNotes") String additionalNotes) {

        try {
            HairServices hairServices = new HairServices.Builder()
                    .setServiceType(serviceType)  // Set service type
                    .setDate(LocalDate.parse(date))
                    .setTime(LocalTime.parse(time))
                    .setAdditionalNotes(additionalNotes)
                    .setImage(image != null ? image.getBytes() : null)
                    .build();

            HairServices savedHairServices = hairServicesService.create(hairServices);
            return new ResponseEntity<>(savedHairServices, HttpStatus.CREATED);

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Catch any other exceptions
        }
    }

    @PostMapping("/save/json")
    public ResponseEntity<HairServices> createHairService(@RequestBody HairServices hairServices) {
        HairServices createdHairService = hairServicesService.create(hairServices);
        return ResponseEntity.ok(createdHairService);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<HairServices> getHairService(@PathVariable Integer id) {
        HairServices hairServices = hairServicesService.read(id);
        if (hairServices != null) {
            return ResponseEntity.ok(hairServices);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<HairServices> updateHairService(@RequestBody HairServices hairServices) {
        HairServices updatedHairService = hairServicesService.update(hairServices);
        return ResponseEntity.ok(updatedHairService);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<HairServices>> getallHairServices() {
        List<HairServices> hairServicesList = hairServicesService.getall();
        return ResponseEntity.ok(hairServicesList);
    }
}
