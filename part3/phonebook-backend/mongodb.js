// atXCvDtGsOdiOvJh;
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const [, , password, name, number] = process.argv

const url = `mongodb+srv://fullstack:${password}@cluster0.owo1n.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url).then(() => {
  console.log('database connected!')
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person.save().then((result) => {
    console.log(
      `Added ${result.name} number ${result.number} to the phonebook`,
    )
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((persons) => {
    console.log('phonebook')
    persons.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}
