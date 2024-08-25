package ylab.springclinicbackend;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DoctorController {

@Autowired
private DoctorRepository doctorRepository;
@Autowired
private PatientRepository patientRepository;

    @GetMapping("/doclist")
     public ResponseEntity<Collection<Doctor>> listdoctors() {
        Collection<Doctor> docs = doctorRepository.findDoclist();
        return ResponseEntity.ok(docs);
    }

    @GetMapping("/patlist")
     public ResponseEntity<Collection<Patient>> listpats() {
        Collection<Patient> docs = patientRepository.findPatlist();
        return ResponseEntity.ok(docs);
    }

}
