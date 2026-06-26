package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import java.util.List;
import java.util.Optional;

public class RepositoryPractice {
    public static void main(String[] args) {
        
        // --- TASK A: Create the repository using the interface type ---
        // The variable type is CourseRepository (the Interface), 
        // but the actual object is InMemoryCourseRepository (the Implementation).
        CourseRepository courseRepository = new InMemoryCourseRepository();

        // --- TASK B: Save three courses directly through the repository ---
        Course apiCourse = new Course("C005", "API Documentation", 7, "Beginner");
        courseRepository.save(apiCourse);

        Course collectionsCourse = new Course("C006", "Java Collections Practice", 12, "Beginner");
        courseRepository.save(collectionsCourse);

        Course cleanCodeCourse = new Course("C007", "Clean Code Basics", 8, "Intermediate");
        courseRepository.save(cleanCodeCourse);

        // --- TASK C: Print all courses ---
        System.out.println("=== All Courses ===");
        List<Course> courses = courseRepository.findAll();
        for (Course course : courses) {
            course.printSummary();
        }

        // --- TASK D: Find one course using Optional ---
        System.out.println("\n=== Find C006 ===");
        Optional<Course> optionalCourse = courseRepository.findById("C006");
        
        // Optional forces us to safely check if the data exists before trying to use it
        if (optionalCourse.isPresent()) {
            Course foundCourse = optionalCourse.get();
            foundCourse.printSummary();
        } else {
            System.out.println("Course not found.");
        }

        // --- TASK E: Check if a course exists ---
        System.out.println("\n=== Exists Check ===");
        boolean exists = courseRepository.existsById("C007");
        System.out.println("C007 exists: " + exists);
    }
}