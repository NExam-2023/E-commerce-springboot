package rw.gisele.ne.java.dtos;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class NewEmployeeLaptopDTO {

    @NotNull
    public UUID employeeId;

    @NotNull
    public UUID laptopId;
}
