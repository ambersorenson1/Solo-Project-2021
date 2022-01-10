const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// This route *should* return the logged in users kids
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user', req.user);
  let queryText;
 

  // Conditionally choose a SQL query, based on a user's role:
  if (req.user.role==1){
     queryText = `select *
                     FROM "public.kids"
                     WHERE "kids_id" = '${req.user.user_id}'
                     `;
                    }else{
                      
                       queryText = `select *
                                       FROM "public.kids"
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
  console.log('/children POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "public.kids"
      ("childsName", "diagnosis", "currentSymptoms","ref")
      VALUES
      ($1, $2, $3,$4);
  `;
  console.log('body',req.body)
  let ref ;
  if (req.user.ref){
    ref = req.user.ref;
  }else{
    ref = req.user.username
  }
  
  const sqlValues = [
    req.body.childsName,
    req.body.diagnosis,
    req.body.currentSymptoms,
    ref
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.status(200).send({
        childsName:req.body.childsName,
        diagnosis:req.body.diagnosis,
        currentSymptoms: req.body.currentSymptoms,
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
          let query = `update "public.kids"
                        set "childsName" = '${req.body.childName}',
                        "diagnosis" = '${req.body.diagnosis}',
                        "currentSymptoms" = '${req.body.currentSymptoms}'
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
                     FROM "public.kids"
                     WHERE "kids_id" = '${req.params.id}'`;
        connection.query(query, function (error, results, fields) {
            if (error) throw new Error(error? error : "Child does not exist");
    
           
            res.status(200).send({message: "Child was deleted successfully!",id:req.params.id});
        });
    });
  } catch (err) {
    res.status(500).send({
        message: err.message || "Some error occurred."
    });
  }
})





module.exports = router;