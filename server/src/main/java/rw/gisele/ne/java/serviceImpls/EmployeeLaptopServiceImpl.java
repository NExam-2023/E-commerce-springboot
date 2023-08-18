package rw.gisele.ne.java.serviceImpls;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.gisele.ne.java.dtos.NewEmployeeLaptopDTO;
import rw.gisele.ne.java.exceptions.BadRequestException;
import rw.gisele.ne.java.models.Employee;
import rw.gisele.ne.java.models.EmployeeLaptop;
import rw.gisele.ne.java.models.Laptop;
import rw.gisele.ne.java.repositories.IEmployeeLaptopRepository;
import rw.gisele.ne.java.services.IEmployeeLaptopService;
import rw.gisele.ne.java.services.IEmployeeService;
import rw.gisele.ne.java.services.ILaptopService;

import java.util.Optional;

@Service
public class EmployeeLaptopServiceImpl implements IEmployeeLaptopService {

    private final IEmployeeLaptopRepository repository;

    private final IEmployeeService employeeService;

    private final ILaptopService laptopService;

    public EmployeeLaptopServiceImpl(IEmployeeLaptopRepository repository, IEmployeeService employeeService, ILaptopService laptopService) {
        this.repository = repository;
        this.employeeService = employeeService;
        this.laptopService = laptopService;
    }

    @Override
    public Page<EmployeeLaptop> getEmployeeLaptops(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public EmployeeLaptop addNewEmployeeLaptop(NewEmployeeLaptopDTO dto) {

        Employee employee = employeeService.findById(dto.getEmployeeId());

        Laptop laptop = laptopService.findById(dto.getLaptopId());

        Optional<EmployeeLaptop> findByLaptop = repository.findByLaptop(laptop);
        if(findByLaptop.isPresent()) throw new BadRequestException(String.format("Laptop with serial number ' %s ' already assigned", laptop.getSerialNumber()));

        EmployeeLaptop employeeLaptop = new EmployeeLaptop();
        employeeLaptop.setEmployee(employee);
        employeeLaptop.setLaptop(laptop);

        return repository.save(employeeLaptop);
    }
}
