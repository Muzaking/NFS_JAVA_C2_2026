package com.fullstack.demo;

public class Course {
    private String courseId;
    private String title;
    private int durationHours;
    private String level;
    
    // Added new fields
    private String category;
    private boolean active;
    
    private Instructor instructor;

    // Updated constructor to include category and active status
    public Course(String courseId, String title, int durationHours, String level, String category, boolean active) {
        this.courseId = courseId;
        this.title = title;
        this.durationHours = durationHours;
        this.level = level;
        this.category = category;
        this.active = active;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getTitle() {
        return title;
    }

    public int getDurationHours() {
        return durationHours;
    }

    public String getLevel() {
        return level;
    }

    // Added getters for new fields
    public String getCategory() {
        return category;
    }

    public boolean isActive() {
        return active;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    // Added setters for new fields
    public void setCategory(String category) {
        this.category = category;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    // Updated printSummary to include Category and formatted Status
    public void printSummary() {
        System.out.println("Course ID: " + courseId);
        System.out.println("Title: " + title);
        System.out.println("Duration: " + durationHours + " hours");
        System.out.println("Level: " + level);
        
        // Output new fields
        System.out.println("Category: " + category);
        
        // Ternary operator to print friendly text instead of true/false
        String statusText = this.active ? "Active" : "Inactive";
        System.out.println("Status: " + statusText);

        if (instructor == null) {
            System.out.println("Instructor: Not assigned yet");
        } else {
            System.out.println("Instructor: " + instructor.getInstructorName());
        }
    }
}