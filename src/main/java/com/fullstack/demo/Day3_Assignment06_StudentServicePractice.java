package com.fullstack.demo;

import com.fullstack.demo.exception.StudentNotFoundException;
import com.fullstack.demo.model.Student;
import com.fullstack.demo.repository.InMemoryStudentRepository;
import com.fullstack.demo.repository.StudentRepository;
import com.fullstack.demo.service.StudentService;
import java.util.List;

public class Day3_Assignment06_StudentServicePractice {
    public static void main(String[] args) {
        
        StudentRepository repository = new InMemoryStudentRepository();
        StudentService service = new StudentService(repository);

        System.out.println("=== Register Students ===");
        try {
            service.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
            service.registerStudent(new Student("S002", "Priya Nair", "priya@example.com"));
            service.registerStudent(new Student("S003", "Lee Salazae", "lee@example.com"));
            System.out.println("3 students successfully registered.\n");
        } catch (Exception e) {
            System.out.println("Error registering students: " + e.getMessage());
        }

        System.out.println("=== All Students ===");
        for (Student s : service.getAllStudents()) {
            // UPDATED: Using getStudentName()
            System.out.println(s.getStudentId() + " - " + s.getStudentName() + " (" + s.getEmail() + ")");
        }

        System.out.println("\n=== Find Student By ID (S002) ===");
        try {
            Student found = service.getStudentById("S002");
            // UPDATED: Using getStudentName()
            System.out.println("Found: " + found.getStudentName());
        } catch (StudentNotFoundException e) {
            System.out.println(e.getMessage());
        }

        System.out.println("\n=== Search Student By Name ('ee') ===");
        List<Student> searchResults = service.searchByNameUsingLoop("ee");
        for (Student s : searchResults) {
            // UPDATED: Using getStudentName()
            System.out.println("Match: " + s.getStudentName());
        }

        System.out.println("\n=== Missing Student Test (S999) ===");
        try {
            service.getStudentById("S999");
        } catch (StudentNotFoundException e) {
            System.out.println("Friendly message: " + e.getMessage());
        }
    }
}