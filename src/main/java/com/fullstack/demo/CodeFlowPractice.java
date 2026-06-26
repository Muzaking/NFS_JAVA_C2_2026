package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {
    public static void main(String[] args) {
        
        System.out.println("=== Add and Find Course ===\n");

        // --- TASK A: Create Repository and Service ---
        
        // Q: Why do we create the repository first?
        // A: The repository represents the database or data storage. The service cannot 
        //    do its job without having a place to actually store and retrieve the data.
        CourseRepository courseRepository = new InMemoryCourseRepository();

        // Q: Why does CourseService need CourseRepository?
        // A: This is called "Dependency Injection". The Service is the "manager" that handles 
        //    business rules (like validating durations), but it delegates the actual saving 
        //    and finding of data to its dependency, the Repository.
        CourseService courseService = new CourseService(courseRepository);

        try {
            // --- TASK B: Create one new course ---
            Course newCourse = new Course("C004", "Spring Boot API Development", 18, "Intermediate");
            courseService.createCourse(newCourse);

            // --- TASK C: Retrieve the course by ID ---
            Course retrievedCourse = courseService.getCourseById("C004");
            
            // Print the result using the model's built-in method
            retrievedCourse.printSummary();

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // --- TASK D: Add trace comments ---
        /*
         * UNDERSTANDING THE CODE FLOW:
         * 1. Demo class calls CourseService.
         * 2. CourseService validates the course.
         * 3. CourseService asks CourseRepository to save or find the course.
         * 4. InMemoryCourseRepository stores the course in memory.
         * 5. Course object is returned to the demo class.
         */
    }
}