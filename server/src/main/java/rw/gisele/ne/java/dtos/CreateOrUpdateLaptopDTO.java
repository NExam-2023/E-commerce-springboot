package rw.gisele.ne.java.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CreateOrUpdateLaptopDTO {

    @NotBlank
    private String manufacturer;

    @NotBlank
    private String model;

    @NotBlank
    private String serialNumber;
}
