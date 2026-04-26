import express from 'express';
import databass from 'database.js';
import database from './database';


const app = new express();

const clinicController = async (req, res, variant) => {
};

const yearsController = async (req, res,variant) => {
    let table='usertypes';
    let fields=['YearID', 'YearName', ];
    

    let where
    const id = parseInt(req.params.id);
    switch(variant){
        case 'primary':
        const id = req.params.id;
            where = 'WHERE YearID = ${id}';
            break;
    

    }

    const sql = `SELECT ${fields.join(', ')} FROM ${table}`;
    try{
        const [result] = await database.query(sql);
        if (result.length===0)res.status(404).json({message:'No records found'});
        else res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({message:`Failed to execute query: ${error.message}`});
    }
};

app.get('/api/clinics',(req, res) => clinicController(req, res,'null'));
app.get('/api/clinics/:id', (req, res) => clinicController(req, res,'primary'));
app.get('/api/clinics/:id/doctors', async (req, res) => clinicController(req, res,'doctors'));

app.get('/api/patienttypes', async (req, res) => patienttypesController(req, res,'null'));
app.get('/api/patienttypes/:id', async (req, res) => patienttypesController(req, res,'primary'));

app.get('/api/clinics/:id/years', async (req, res) => yearsController(req, res,'null'));
app.get('/api/clinics/:id/patients', async (req, res) => yearsController(req, res,'primary'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
