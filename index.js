const Joi = require('joi'); // npm i joi
const express = require('express');
const app = express();

app.use(express.json());
// user requests an image
// the request comes in and the middleware catches it first.
//
app.use(express.static('public'));


const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
]





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Get image data (base64)

app.get('/api/image/:imageFilename', (req, res) => {
    res.send(courses);
});


// Upload image data 
app.post('/api/image/upload', (req, res) => {
    res.send(courses);
});









app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//posting to the collection of course's'
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // same as result.error
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: "course " + Number(courses.length + 1)
    };
    courses.push(course);
    res.send(course);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.put('/api/courses/', (req, res) => {
    //look up the course
    //If it doesn't exist, return 404
    //const course = courses.find(c => c.id === parseInt(req.params.id));
    //if (!course) return res.status(404).send('The course with the given ID was not found');

    //validate
    //If invalid, return 400 - bad request
    //const result = validateCourse(req.body);
    //const { error } = validateCourse(req.body); // same as result.error
    //if (error) return res.status(400).send(error.details[0].message);
    //update course
    courses[1].name = "changed";
    //return the updated course
    res.send(courses);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course);
}

app.delete('/api/courses/', (req, res) => {
    var lastelem = courses.length - 1;
    const retval = courses[lastelem];
    courses.splice(lastelem, 1);

    //return the same course
    res.send(retval);
});