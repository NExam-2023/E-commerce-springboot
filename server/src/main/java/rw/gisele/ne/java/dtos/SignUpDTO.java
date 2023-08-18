package rw.gisele.ne.java.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rw.gisele.ne.java.enums.EGender;
import rw.gisele.ne.java.security.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {

    @Email
    private  String email;

    @NotBlank
    private  String name;


    @NotBlank
    @Pattern(regexp = "[0-9]{9,10}", message = "Your phone is not a valid tel we expect 07***")
    private  String mobile;


    @ValidPassword
    private  String password;
}
