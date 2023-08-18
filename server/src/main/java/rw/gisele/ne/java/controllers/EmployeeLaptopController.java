package rw.gisele.ne.java.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.gisele.ne.java.dtos.NewEmployeeLaptopDTO;
import rw.gisele.ne.java.payload.ApiResponse;
import rw.gisele.ne.java.utils.Constants;
import rw.gisele.ne.java.services.IEmployeeLaptopService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/employee-laptops")
@CrossOrigin
public class EmployeeLaptopController {
    private final IEmployeeLaptopService service;

    @Autowired
    public EmployeeLaptopController(IEmployeeLaptopService service) {
        this.service = service;
    }


    @GetMapping
    public ResponseEntity<ApiResponse> getPaginated(
            @RequestParam(value = "page", defaultValue = Constants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "limit", defaultValue = Constants.DEFAULT_PAGE_SIZE) int limit) {
        Pageable pageable = PageRequest.of(page, limit, Sort.Direction.DESC, "id");
        return ResponseEntity.ok(ApiResponse.success(this.service.getEmployeeLaptops(pageable)));
    }


    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody NewEmployeeLaptopDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(this.service.addNewEmployeeLaptop(dto)));
    }
}
