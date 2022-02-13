const router = require('express').Router(); 
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/notes");
const { notes } = require("../../db/notes");


router.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  router.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
  
  router.post('/api/notes', (req, res) => { 
      // set id based on what the next index of the array will be
      req.body.id = notes.length.toString();
      
      if (!validateNote(req.body)) {
          res.status(400).send('The note MUST include a title and text.');
      }
      else {
          const note = createNewNote(req.body, notes);
            res.json(note);
      }
  });

  module.exports  = router;