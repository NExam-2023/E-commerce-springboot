package rw.gisele.ne.java.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gisele.ne.java.dtos.CreateOrUpdateEmployeeDTO;
import rw.gisele.ne.java.models.Employee;

import java.util.List;
import java.util.UUID;

public interface IEmployeeService {

    Employee findById(UUID employeeId);

    Page<Employee> getEmployeesPaginated(Pageable pageable);

    List<Employee> getEmployees();

    Employee addNewEmployee(CreateOrUpdateEmployeeDTO dto);
}
