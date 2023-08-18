package rw.gisele.ne.java.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gisele.ne.java.dtos.NewEmployeeLaptopDTO;
import rw.gisele.ne.java.models.EmployeeLaptop;

public interface IEmployeeLaptopService {

    Page<EmployeeLaptop> getEmployeeLaptops(Pageable pageable);

    EmployeeLaptop addNewEmployeeLaptop(NewEmployeeLaptopDTO dto);

}
