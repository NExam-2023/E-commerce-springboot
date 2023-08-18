package rw.gisele.ne.java.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gisele.ne.java.dtos.CreateOrUpdateLaptopDTO;
import rw.gisele.ne.java.models.Laptop;

import java.util.List;
import java.util.UUID;

public interface ILaptopService {

    Page<Laptop> getLaptopsPaginated(Pageable pageable);

    Laptop findById(UUID laptopId);

    List<Laptop> getLaptops();

    Laptop addNewLaptop(CreateOrUpdateLaptopDTO dto);
}
