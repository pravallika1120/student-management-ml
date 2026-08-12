from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained ML model
model = joblib.load("student_model.pkl")

print("ML model loaded successfully")


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Student Performance ML API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        print("Received data:")
        print(data)

        # Get input values
        attendance = float(data["attendance"])
        internal_marks = float(data["internal_marks"])
        assignment_marks = float(data["assignment_marks"])
        previous_marks = float(data["previous_marks"])
        study_hours = float(data["study_hours"])
        backlogs = int(data["backlogs"])

        # Create input DataFrame
        input_data = pd.DataFrame([{
            "attendance": attendance,
            "internal_marks": internal_marks,
            "assignment_marks": assignment_marks,
            "previous_marks": previous_marks,
            "study_hours": study_hours,
            "backlogs": backlogs
        }])

        # Make prediction
        prediction = model.predict(input_data)[0]

        print("Prediction:", prediction)

        return jsonify({
            "success": True,
            "prediction": prediction
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )