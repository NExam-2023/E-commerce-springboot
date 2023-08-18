package rw.gisele.ne.java.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.gisele.ne.java.dtos.CreateOrUpdateEmployeeDTO;
import rw.gisele.ne.java.payload.ApiResponse;
import rw.gisele.ne.java.utils.Constants;
import rw.gisele.ne.java.services.IEmployeeService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin
public class EmployeeController {
    private final IEmployeeService service;


    @Autowired
    public EmployeeController(IEmployeeService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAll() {
        return ResponseEntity.ok(ApiResponse.success(service.getEmployees()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getPaginated(
            @RequestParam(value = "page", defaultValue = Constants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "limit", defaultValue = Constants.DEFAULT_PAGE_SIZE) int limit) {
        Pageable pageable = PageRequest.of(page, limit, Sort.Direction.DESC, "id");
        return ResponseEntity.ok(ApiResponse.success(this.service.getEmployeesPaginated(pageable)));
    }


    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CreateOrUpdateEmployeeDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(this.service.addNewEmployee(dto)));
    }
}
