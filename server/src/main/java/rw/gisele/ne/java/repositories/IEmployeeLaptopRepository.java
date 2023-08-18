package rw.gisele.ne.java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.gisele.ne.java.models.EmployeeLaptop;
import rw.gisele.ne.java.models.Laptop;

import java.util.Optional;
import java.util.UUID;

public interface IEmployeeLaptopRepository extends JpaRepository<EmployeeLaptop, UUID> {

    Optional<EmployeeLaptop> findByLaptop(Laptop laptop);

}
