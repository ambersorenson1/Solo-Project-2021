const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// This route *should* return the logged in users pets
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user', req.user);
  let queryText;
 

  // Conditionally choose a SQL query, based on a user's role:
  if (req.user.role==1){
     queryText = `select *
                     FROM "public.kids_medications"
                     WHERE "kids_id" = '${req.user.user_id}'
                     `;
                    }else{
                      
                       queryText = `select *
                                       FROM "public.kids_medications"
                                       WHERE "ref" = '${req.user.ref}'
                                       `;
  }

  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/medication POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "public.kids_medications"
      ("medicationName", "dosage", "timeOfMeds", "kids_id","ref" )
      VALUES
      ($1, $2, $3, $4,$5);
  `;
  console.log('body',req.body)
  const sqlValues = [
    req.body.medicationName,
    req.body.dosage,
    req.body.timeOfMeds,
    req.user.user_id,
    req.user.username
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.status(200).send({
        medicationName:req.body.medicationName,
        dosage:req.body.dosage,
        timeOfMeds: req.body.timeOfMeds,
        user_id: req.user.user_id
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    });
});

router.put('/:id',rejectUnauthenticated, async (req, res) => {console.log('params',req.params)
console.log('body', req.body);


  try {
      pool.connect((err, connection, release) => {
          if (err) throw err;
          let id = req.params.id;
          let query = `update "public.kids_medications"
                        set "medicationName" = '${req.body.medicationName}',
                        "dosage" = '${req.body.dosage}',
                        "timeOfMeds" = '${req.body.timeOfMeds}'
                        WHERE "meds_id" = '${id}' 

                      RETURNING *`;
          connection.query(query, function (error, results, fields) {
              if (error) throw error;
              release();
              res.end(JSON.stringify(results.rows));
          });
      });
  } catch (err) {
      res.status(500).send({
          message: err.message || "Some error occurred."
      });
  }
});

router.delete("/:id", rejectUnauthenticated, (req,res)=>{
  try {
    pool.connect((err, connection) => {
        if (err) throw err;
        let query = `DELETE
                     FROM "public.kids_medications"
                     WHERE "meds_id" = '${req.params.id}'`;
        connection.query(query, function (error, results, fields) {
            if (error) throw new Error(error? error : "Medicine does not exist");
    
           
            res.status(200).send({message: "Medication was deleted successfully!",id:req.params.id});
        });
    });
  } catch (err) {
    res.status(500).send({
        message: err.message || "Some error occurred."
    });
  }
})





module.exports = router;