const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Error: 'Error getting actions' });
        });
});

router.post('/', (req, res) => {
    const action = req.body;

    Actions.insert(action)
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(error => {
            res.status(500).json({ Error: 'Could not add action' });
        });
});

router.post('/:id/actions', (req, res) => {
    const id = req.params.id;
    const projectId = req.body.id;
    const postAction = req.body

    Projects.get(id)
    if(!projectId) {
        res.status(400).json({ Message: 'ID not associated with any project' })
    } else {
        Actions.insert(postAction)
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Error: 'Could not add action to project' })
        });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Actions.update(id, changes)
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(error => {
            res.status(500).json({ Error: 'Could not update action' });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Actions.remove(id)
        .then(actions => {
            res.status(200).json({ Message: 'Action deleted' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Error: 'Error deleting action' });
        });
})

module.exports = router;