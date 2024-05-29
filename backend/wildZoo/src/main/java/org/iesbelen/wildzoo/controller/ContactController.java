package org.iesbelen.wildzoo.controller;


import org.iesbelen.wildzoo.model.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<Boolean> sendEmail(@RequestBody ContactForm contactForm) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(contactForm.getEmail());
            message.setSubject("Gracias por contactar con Wild Zoo Spain");
            message.setText("Hola " + contactForm.getName() + ",\n\n" +
                    "Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos lo antes posible.\n\n" +
                    "Detalles de tu mensaje:\n" +
                    "Nombre: " + contactForm.getName() + "\n" +
                    "Teléfono: " + contactForm.getPhone() + "\n" +
                    "Descripción: " + contactForm.getDescription() + "\n\n" +
                    "Saludos,\n" +
                    "Wild Zoo Spain");
            message.setFrom("wildzoospain@gmail.com");

            mailSender.send(message);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
}
