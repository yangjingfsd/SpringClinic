package ylab.springclinicbackend;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
public class AppointmentController {

    private AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/appointments")
     public ResponseEntity<Collection<AppointmentResponse>> listappointments() {
        Collection<AppointmentResponse> apps = appointmentRepository.findAllWithName();
        return ResponseEntity.ok(apps);
    }
    
    @PostMapping("/appointment")
    ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) throws URISyntaxException {
        Appointment result = appointmentRepository.save(appointment);
        return ResponseEntity.created(new URI("/appointments/"+result.getAppid())).body(result);
    }

    @PutMapping("/appointment/{id}")
    ResponseEntity<Appointment> updateAppointment(@Valid @RequestBody Appointment appointment) {
        Appointment result = appointmentRepository.save(appointment);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/appointment/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
