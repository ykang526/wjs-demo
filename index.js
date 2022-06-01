const Joi = require('joi'); // npm i joi
const express = require ('express');
const app = express();

app.use(express.json());



const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//posting to the collection of course's'
app.post('/api/courses', (req,res)=> {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.ValidationError(req.body, schema); // returns an object
    console.log(result);

    if (result.error) { // checking if client sent a valid input
        //400 bad request by convention
        //res.status(400).send('This is not a valid input'); USE JOI INSTEAD
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //If it doesn't exist, return 404
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    //validate
    //If invalid, return 400 - bad request
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.ValidationError(req.body, schema); // returns an object
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //update course
    //return the updated course
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
