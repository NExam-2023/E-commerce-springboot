package rw.gisele.ne.java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.gisele.ne.java.models.Employee;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByPhoneNumber(String phoneNumber);

    Optional<Employee> findByNationalId(String nationalId);
}
