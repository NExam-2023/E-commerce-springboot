package rw.gisele.ne.java.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import rw.gisele.ne.java.enums.EGender;
import rw.gisele.ne.java.enums.ERole;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.UUID;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"}), @UniqueConstraint(columnNames = {"phone_number"})})
@OnDelete(action = OnDeleteAction.CASCADE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;


    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;


    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private ERole role = ERole.ADMIN;

    @JsonIgnore
    @NotBlank
    @Column(name = "password")
    private String password;

    public User(String name, String phoneNumber, String email) {
        this.name = name;

        this.phoneNumber = phoneNumber;
        this.email = email;

    }

    public User(String name,String phoneNumber, String email, ERole role) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.role = role;
    }

    public User(String name, String phoneNumber, String email, String password) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public User(String name, String phoneNumber, String email, String password, ERole role) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
