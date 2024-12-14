document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-btn");
    const resultsDiv = document.getElementById("results");

    startButton.addEventListener("click", function () {
        // Hide the user input section
        const userInputs = document.querySelector(".user-input");
        userInputs.style.display = "none";

        // Get selected symptoms
        const selectedSymptoms = [];
        const symptomCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        symptomCheckboxes.forEach(checkbox => {
            selectedSymptoms.push(checkbox.value);
        });

        if (selectedSymptoms.length > 0) {
            const userResults = document.createElement("div");
            userResults.innerHTML = "<h2>Questionnaire Results</h2>";

            // Collect user's age and gender
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;

            // Calculate BMI
            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value);
            const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
            userResults.innerHTML += <p>Your BMI: ${bmi}</p>;

            // Loop through selected symptoms and ask questions
            for (const symptom of selectedSymptoms) {
                userResults.innerHTML += <h3>${symptom}</h3>;
                
                // Define questions and logic for each symptom
                const symptomInfo = symptomMappings[symptom];
                if (symptomInfo && symptomInfo.questions) {
                    symptomInfo.questions.forEach(question => {
                        const answer = prompt(question);
                        userResults.innerHTML += <p>${question}: ${answer}</p>;
                    });
                }

                // Get disease and prescription information from symptomMappings
                if (symptomInfo) {
                    userResults.innerHTML += <p>Disease: ${symptomInfo.Disease}</p>;
                    userResults.innerHTML += <p>Precautions: ${symptomInfo.Precautions}</p>;
                    const prescription = getPrescription(symptom, age, gender, symptomInfo.Medicines);
                    userResults.innerHTML += <p>Prescription for ${symptom}: ${prescription}</p>;
                }
            }

            // Display the results
            resultsDiv.innerHTML = "";
            resultsDiv.appendChild(userResults);
            resultsDiv.style.display = "block";
        }
    });
});

// Define prescription logic based on symptom, age, gender, and medicines
function getPrescription(symptom, age, gender, medicines) {
    const ageGroup = getAgeGroup(age);

    if (medicines && medicines[gender] && medicines[gender][ageGroup]) {
        return medicines[gender][ageGroup];
    } else {
        return "Consult a healthcare professional for proper guidance.";
    }

    function getAgeGroup(age) {
        if (age < 18) {
            return "Under 18";
        } else if (age >= 19 && age <= 40) {
            return "19-40";
        } else if (age >= 41 && age <= 60) {
            return "41-60";
        } else {
            return "61+";
        }
    }
}

const symptomMappings = {
    "Cough": {
        "Disease": "Common Cold",
        "Precautions": "Rest, drink fluids, and take OTC cold medication.",
        "Medicines": {
            "Male": {
                "Under 18": "Children's cough syrup",
                "19-40": "Adult cough syrup",
                "41-60": "Cough syrup plus antibiotics",
                "61+": "Cough syrup for seniors",
            },
            "Female": {
                "Under 18": "Children's cough syrup",
                "19-40": "Adult cough syrup",
                "41-60": "Cough syrup plus antibiotics",
                "61+": "Cough syrup for seniors",
            },
        },
        "questions": [
            "Do you have a cough?",
            "Is the cough dry or productive?",
            "Do you have a sore throat?"
            // Add more questions as needed
        ]
    },
    "Fever": {
        "Disease": "Influenza (Flu)",
        "Precautions": "Rest, drink fluids, and take antiviral medication if prescribed.",
        "Medicines": {
            "Male": {
                "Under 18": "Children's fever reducer",
                "19-40": "Adult fever reducer",
                "41-60": "Fever reducer plus antiviral",
                "61+": "Fever reducer for seniors",
            },
            "Female": {
                "Under 18": "Children's fever reducer",
                "19-40": "Adult fever reducer",
                "41-60": "Fever reducer plus antiviral",
                "61+": "Fever reducer for seniors",
            },
        },
        "questions": [
            "Do you have a fever?",
            "How high is your temperature? (High/Medium/Low)",
            "Do you have chills?"
            // Add more questions as needed
        ]
    },
    "Headache (Migraine)": {
        "Disease": "Migraine",
        "Precautions": "Rest in a dark, quiet room, stay hydrated, and take prescribed medication.",
        "Medicines": {
            "Male": {
                "Under 18": "Children's pain relievers",
                "19-40": "Adult pain relievers",
                "41-60": "Pain relievers and migraine-specific medication",
                "61+": "Migraine medication for seniors",
            },
            "Female": {
                "Under 18": "Children's pain relievers",
                "19-40": "Adult pain relievers",
                "41-60": "Pain relievers and migraine-specific medication",
                "61+": "Migraine medication for seniors",
            },
        },
        "questions": [
            "Do you have a migraine headache?",
            "How long does your migraine headache typically last? (Hours/Days)",
            "Do you have any known migraine triggers?"
            // Add more questions as needed
        ]
    },
    "Chest Pain": {
        "Disease": "Heart Attack",
        "Precautions": "Seek emergency medical help immediately. Chew an aspirin if available.",
        "Medicines": {
            "Male": {
                "Under 18": "Not recommended",
                "19-40": "Aspirin, nitroglycerin if prescribed",
                "41-60": "Aspirin, nitroglycerin if prescribed",
                "61+": "Aspirin, nitroglycerin if prescribed",
            },
            "Female": {
                "Under 18": "Not recommended",
                "19-40": "Aspirin, nitroglycerin if prescribed",
                "41-60": "Aspirin, nitroglycerin if prescribed",
                "61+": "Aspirin, nitroglycerin if prescribed",
            },
        },
        "questions": [
            "Do you have chest pain?",
            "Is the pain radiating to other areas, like the arm or jaw?",
            "Do you have shortness of breath or nausea?"
            // Add more questions as needed
        ]
    },
    "Stomach Pain": {
        "Disease": "Indigestion",
        "Precautions": "Avoid heavy, spicy meals and overeating. Try antacids for relief.",
        "Medicines": {
            "Male": {
                "Under 18": "Not recommended",
                "19-40": "Antacids",
                "41-60": "Antacids, digestive enzymes if prescribed",
                "61+": "Antacids, digestive enzymes if prescribed",
            },
            "Female": {
                "Under 18": "Not recommended",
                "19-40": "Antacids",
                "41-60": "Antacids, digestive enzymes if prescribed",
                "61+": "Antacids, digestive enzymes if prescribed",
            },
        },
        "questions": [
            "Do you have stomach pain?",
            "Is the pain related to eating?",
            "Do you have acidity or bloating?"
            // Add more questions as needed
        ]
    },
    "Shortness of Breath": {
        "Disease": "Respiratory Distress",
        "Precautions": "Sit upright, use an inhaler if prescribed, and seek medical attention.",
        "Medicines": {
            "Male": {
                "Under 18": "Not recommended",
                "19-40": "Rescue inhaler",
                "41-60": "Rescue inhaler, oxygen therapy if prescribed",
                "61+": "Rescue inhaler, oxygen therapy if prescribed",
            },
            "Female": {
                "Under 18": "Not recommended",
                "19-40": "Rescue inhaler",
                "41-60": "Rescue inhaler, oxygen therapy if prescribed",
                "61+": "Rescue inhaler, oxygen therapy if prescribed",
            },
        },
        "questions": [
            "Do you experience shortness of breath?",
            "Is it related to physical activity?",
            "Have you ever had respiratory problems?"
            // Add more questions as needed
        ]
    },
    // Add more symptoms and their details
};

    // Add more symptoms and their details