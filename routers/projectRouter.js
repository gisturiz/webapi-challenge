const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Error: 'Error getting projects' });
        });
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;

    Projects.getProjectActions(id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ Error: 'Error getting project actions '});
    });
})

router.post('/', (req, res) => {
    const project = req.body;

    Projects.insert(project)
        .then(projects => {
            res.status(201).json(projects);
        })
        .catch(error => {
            res.status(500).json({ Error: 'Could not add project' });
        });
});

router.post('/:id/actions', (req, res) => {
    const id = req.params.id;
    const projectId = req.body.project_id;
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

    Projects.update(id, changes)
        .then(projects => {
            res.status(201).json(projects);
        })
        .catch(error => {
            res.status(500).json({ Error: 'Could not update project' });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Projects.remove(id)
        .then(projects => {
            res.status(200).json({ Message: 'Project deleted' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Error: 'Error deleting project' });
        });
})

module.exports = router;