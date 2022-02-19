const Person = require('../models/person');

module.exports = async function verifyUser(username, password) {

    await Person.findOne({
        where: { username: username },
        attributes: ['id', 'username', 'password', 'usertype']
    }).then(person => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        // project.get('title') will contain the name of the project
        console.log(person.password)
        return person.password == password ? person : null
    })

}