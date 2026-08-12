import joblib
import pandas as pd

# Load trained model
model = joblib.load("student_model.pkl")

# Test student
student = pd.DataFrame([
    {
        "attendance": 85,
        "internal_marks": 72,
        "assignment_marks": 80,
        "previous_marks": 75,
        "study_hours": 4,
        "backlogs": 0
    }
])

# Predict
prediction = model.predict(student)

print("Predicted Performance:", prediction[0])