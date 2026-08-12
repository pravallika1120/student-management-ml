function StudentCard({ student, onDelete }) {

  return (
    <div
      className="card shadow mb-4"
      style={{
        backgroundColor: "#242424",
        border: "1px solid #3a3a3a",
        borderRadius: "12px"
      }}
    >

      <div className="card-body">

        <h5
          style={{
            color: "#ffffff",
            fontWeight: "600"
          }}
        >
          {student.name}
        </h5>


        <p
          style={{
            color: "#aaaaaa",
            marginBottom: "5px"
          }}
        >
          Student ID: {student.studentId}
        </p>


        <p
          style={{
            color: "#aaaaaa",
            marginBottom: "5px"
          }}
        >
          Email: {student.email}
        </p>


        <p
          style={{
            color: "#aaaaaa",
            marginBottom: "5px"
          }}
        >
          Department: {student.department}
        </p>


        <p
          style={{
            color: "#aaaaaa",
            marginBottom: "5px"
          }}
        >
          Year: {student.year}
        </p>


        <div className="row mt-3">

          <div className="col-md-4">

            <strong
              style={{
                color: "#ffffff"
              }}
            >
              CGPA
            </strong>

            <p style={{ color: "#aaaaaa" }}>
              {student.cgpa}
            </p>

          </div>


          <div className="col-md-4">

            <strong
              style={{
                color: "#ffffff"
              }}
            >
              Attendance
            </strong>

            <p style={{ color: "#aaaaaa" }}>
              {student.attendance}%
            </p>

          </div>


          <div className="col-md-4">

            <strong
              style={{
                color: "#ffffff"
              }}
            >
              Backlogs
            </strong>

            <p style={{ color: "#aaaaaa" }}>
              {student.backlogs}
            </p>

          </div>

        </div>


        {onDelete && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(student._id)}
          >
            Delete
          </button>
        )}

      </div>

    </div>
  );
}

export default StudentCard;