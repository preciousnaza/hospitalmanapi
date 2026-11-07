const pool = require("../configs/db");

const createpatient = async (req,res) => {
   const { name, age, gender, phone, address, medical_history } = req.body;

   try{
      const [result] = await pool.query(
        "INSERT INTO patients (name, age, gender, phone, address, medical_history ) value(?,?,?,?,?,?)",
        [name, age, gender, phone, address, medical_history ]
      )

      return res.status(201).json({
        message: "patient creates successfully",
        patientId: result.insertId
      })

   }catch(error){
      console.log(error)

      re.status(500).json({
        message: "something went wrong while creating patient"
      })
   }
}

const readAllPatients = async (req,res) => {
 const gender = req.query.gender;

  try{
    const [result] = await pool.query(
      "SELECT * FROM patients WHERE gender = ? OR ? IS NULL",
      [gender, gender]
    )

    if(gender && result.length === 0){
      return res.status(404).json({
        message: `No patients found with gender '${gender}'`
      })
    }

    return res.status(200).json({
      message: "Patients retrieved successfully",
      patients: result
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while retrieving patients"
    });
  }
}

const readPatientById = async (req,res) => {
  const {id} = req.params;

  try{
    const [result] = await pool.query(
      "SELECT * FROM patients WHERE id=?",
      [id]
    )

     if (result.length === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

    res.status(200).json({
      message: "Patient retrieved sucessfully",
      patient: result
    })
  }catch(error){
    console.log(error)

    res.status(500).json({
      message: "Something went wrong while retrieving patients"
    })
  }
}

const updatePatient = async (req,res) => {
  const {name, age, gender, phone, address, medical_history} = req.body;
  const {id} = req.params;

  try{
    const [result]= await pool.query(
      "UPDATE patients SET name=?, age=?, gender=?, phone=?, address=?, medical_history=? WHERE id=?",
      [name, age, gender, phone, address, medical_history,id]
    )

    if (result.affectedRows === 0) {
    return res.status(404).json({
        message: "Patient not found"
    });
}

    res.status(200).json({
      message: "Patient updated successfully",
      patient: result
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "Something went wrong while updating patient"
    })
  }
}

const deletepatient = async (req,res) => {
  const {id} = req.params;

  try{
    const [result] = await pool.query(
      "DELETE FROM patients WHERE id =?",
      [id]
    )

    res.status(200).json({
      message: "Patient deleted successfully",
      patient: result
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "Something went wrong while deleting patient"
    })
  }
}

const EditPatientInfo = async (req,res) => {
  const update = req.body;
  const {id} = req.params;

  const field = Object.keys(update);
  const value = Object.values(update);

  try{
    const [result] = await pool.query(`UPDATE patients SET ${field.map(field => `${field} = ?`).join(", ")} WHERE id = ?`, [...value, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
          message: "Patient not found"
      });
  }

    res.status(200).json({
      message: "Patient information updated successfully",
      patient: result
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "Something went wrong while updating patient information"
    })
  }
}

module.exports = { createpatient, readAllPatients ,readPatientById, updatePatient, deletepatient, EditPatientInfo};