package com.example.assettracker.util;

/*
Validation: what inputs are allowed and what are not

Sanitisation: can this input be safely cleaned before saving/validating
"   SN-LAP-A1B2C3D4    "    -> "SN-LAP-A1B2C3D4"  trim spaces
"sn-lap-a1b2c3d4"    -> "SN-LAP-A1B2C3D4"  uppercase
empty serialNumber -> reject
script tags in name -> reject do not render as HTML
*/
public class InputSanitizer {
    
    private InputSanitizer() {
        // Private constructor to prevent instantiation
    }

    public static String trimToNull(String value){
        if (value == null) {
            return null;
        }
        String trimmedValue = value.trim();
        return trimmedValue.isEmpty() ? null : trimmedValue;
    }

    public static String cleanText(String value) {
        String trimmedValue = trimToNull(value);
        if (trimmedValue == null) {
            return null;
        }
        
        return trimmedValue
            .replaceAll("[\\p{Cntrl}]", "") // Corrected regex to remove control characters
            .replaceAll("[^\\p{L}\\p{N}\\s\\-]", "")  // Remove special characters except letters, numbers, spaces, and hyphens
            .replaceAll("\\s+", " ")  // Replace multiple spaces with a single space
            .trim(); // Final trim in case space replacements pushed a space to the edge
    }

    public static String upperCode(String value) {
        String cleaned = cleanText(value);
        return cleaned == null ? null : cleaned.toUpperCase();
    }
}