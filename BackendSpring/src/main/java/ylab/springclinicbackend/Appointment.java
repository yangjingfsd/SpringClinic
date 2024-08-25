package ylab.springclinicbackend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data

public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appid")
    private Long appid;

    @Column(name = "docid")
    private Long docid;

    @Column(name = "patid")
    private Long patid;

    @Column(name = "date")
    private String date;

    @Column(name = "time")
    private String time;

    @Column(name = "service")
    private String service;

}
