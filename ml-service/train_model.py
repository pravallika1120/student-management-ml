import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# Load dataset
data = pd.read_csv("dataset/student_performance.csv")

print("Dataset loaded successfully")
print(data.head())


# Input features
X = data[
    [
        "attendance",
        "internal_marks",
        "assignment_marks",
        "previous_marks",
        "study_hours",
        "backlogs"
    ]
]

# Target
y = data["performance"]


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# Train model
model.fit(X_train, y_train)


# Prediction on test data
y_pred = model.predict(X_test)


# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Training Completed")
print("Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# Save model
joblib.dump(model, "student_model.pkl")

print("\nModel saved as student_model.pkl")