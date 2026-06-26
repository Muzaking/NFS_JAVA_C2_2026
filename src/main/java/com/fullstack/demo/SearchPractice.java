package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
import java.util.List;

public class SearchPractice {
    public static void main(String[] args) {
        
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        // --- Create 4 Courses ---
        try {
            courseService.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
            courseService.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
            courseService.createCourse(new Course("C003", "MongoDB Basics", 14, "Beginner"));
            courseService.createCourse(new Course("C004", "Spring Boot API Development", 18, "Intermediate"));
        } catch (Exception e) {
            System.out.println("Setup Error: " + e.getMessage());
        }

        // --- Test Loop Version ---
        System.out.println("=== Beginner Courses (Using Loop) ===");
        List<Course> beginnerCourses = courseService.searchByLevelUsingLoop("Beginner");
        for (Course c : beginnerCourses) {
            System.out.println(c.getCourseId() + " - " + c.getTitle());
        }

        // --- Test Stream Version (Optional Task D) ---
        System.out.println("\n=== Intermediate Courses (Using Stream) ===");
        List<Course> intermediateCourses = courseService.searchByLevelUsingStream("Intermediate");
        for (Course c : intermediateCourses) {
            System.out.println(c.getCourseId() + " - " + c.getTitle());
        }

        // --- Test Minimum Duration (Optional Task E) ---
        System.out.println("\n=== Courses >= 18 Hours (Using Loop) ===");
        List<Course> longCourses = courseService.searchByMinimumDurationUsingLoop(18);
        for (Course c : longCourses) {
            System.out.println(c.getCourseId() + " - " + c.getTitle() + " (" + c.getDurationHours() + " hours)");
        }
    }
}