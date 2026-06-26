package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class ObjectRelationshipPractice {
    public static void main(String[] args) {
        
        // --- TASK A: Create two instructors ---
        Instructor inst1 = new Instructor("I001", "Mike Rahman", "Java and Spring Boot");
        Instructor inst2 = new Instructor("I002", "Marcus Lee", "React and Frontend Development");

        // --- TASK B: Create two courses ---
        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate");

        // --- TASK C: Assign instructors to courses ---
        course1.setInstructor(inst1);
        course2.setInstructor(inst2);

        System.out.println("=== Courses ===");
        course1.printSummary();
        System.out.println("----------------------------");
        course2.printSummary();
        System.out.println("----------------------------\n");

        // --- TASK F: Add comments explaining composition ---
        /*
         * COMPOSITION EXPLANATION:
         * CourseOffering uses composition because it "has a" Course and "has an" Instructor.
         * Instead of just copying the text names of the course and instructor, it links 
         * the actual objects together into a real, functional relationship.
         */

        // --- TASK D: Create two course offerings ---
        // (Assuming your constructor matches the order: ID, Name, Course, Instructor, Start, End, Capacity, Mode)
        CourseOffering off1 = new CourseOffering("OFF001", "Java Fundamentals June Intake", course1, inst1, "2026-06-29", "2026-06-30", 25, "Physical");
        CourseOffering off2 = new CourseOffering("OFF002", "React Frontend July Intake", course2, inst2, "2026-07-01", "2026-07-03", 20, "Hybrid");

        // --- EXTENSION TASK: Create a third course offering reusing a course ---
        CourseOffering off3 = new CourseOffering("OFF003", "Java Fundamentals July Weekend Intake", course1, inst1, "2026-07-04", "2026-07-05", 30, "Online");

        // --- TASK E: Print the course offerings ---
        System.out.println("=== Course Offerings ===");
        off1.printSummary();
        System.out.println("----------------------------");
        off2.printSummary();
        System.out.println("----------------------------");
        off3.printSummary();
    }
}