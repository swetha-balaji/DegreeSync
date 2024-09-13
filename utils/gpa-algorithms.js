
// Function to calculate Semester GPA
function calculateSemesterGPA(grades, creditHours) {
    let totalQualityPoints = 0;
    let totalCreditHours = 0;

    for (let i = 0; i < grades.length; i++) {
        let gradeValue;

        // Convert letter grade to GPA value
        switch (grades[i].toUpperCase()) {
            case 'A':
                gradeValue = 4;
                break;
            case 'B':
                gradeValue = 3;
                break;
            case 'C':
                gradeValue = 2;
                break;
            case 'D':
                gradeValue = 1;
                break;
            case 'F':
                gradeValue = 0;
                break;
            default:
                throw new Error('Invalid grade input: ' + grades[i]);
        }

        // Calculate quality points and add to total
        totalQualityPoints += gradeValue * creditHours[i];
        totalCreditHours += creditHours[i];
    }

    if (totalCreditHours === 0) {
        throw new Error('Total credit hours cannot be zero.');
    }

    // Calculate GPA for the semester
    return totalQualityPoints / totalCreditHours;
}

// Function to calculate Cumulative GPA
function calculateCumulativeGPA(semesters) {
    let totalQualityPoints = 0;
    let totalGPAHours = 0;

    for (let i = 0; i < semesters.length; i++) {
        totalQualityPoints += semesters[i].qualityPoints;
        totalGPAHours += semesters[i].gpaHours;
    }

    if (totalGPAHours === 0) {
        throw new Error('Total GPA hours cannot be zero.');
    }

    // Calculate cumulative GPA
    return totalQualityPoints / totalGPAHours;
}

// Export functions for use in other parts of the app
module.exports = {
    calculateSemesterGPA,
    calculateCumulativeGPA
};

