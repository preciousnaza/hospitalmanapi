const express = require("express");
const router = express.Router();

const { createpatient,readAllPatients,readPatientById,updatePatient, deletepatient,EditPatientInfo} = require("../controllers/patientcontroller");
const { validatePatient, checkValidation,validatePatientId, validatePatientGender } = require("../middleware/patientValidation");


router.post('/patients', validatePatient, checkValidation, createpatient);
router.get('/patients', validatePatientGender, readAllPatients);
router.get('/patients/:id', validatePatientId, checkValidation, readPatientById);
router.put('/patients/:id',validatePatient, validatePatientId, checkValidation, updatePatient);
router.delete('/patients/:id', validatePatientId, checkValidation, deletepatient);
router.patch('/patients/:id', validatePatientId, checkValidation, EditPatientInfo);

module.exports = router;