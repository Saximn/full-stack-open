const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//   console.log('Usage: node mongo.js <password> <name> <number>')
//   process.exit(1)
// }

console.log("argv length: " + process.argv.length)
const password = process.argv[2]

const url = `mongodb+srv://parvezwijaya:${password}@cluster0.zglhvth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

console.log('Mongoose connection state:', mongoose.connection.readyState)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
mongoose.connection.on('connecting', () => {
  console.log('Mongoose connecting');
});



const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
  name: name,
  number: number,
})
console.log(person)
person.save().then(res => {
    console.log("saving...")
    console.log(`added ${name} number ${number} to phonebook`)
    console.log("saved")
})

Person.find({}).then(res => {
    res.forEach(person => {
        console.log(person)
    })
    console.log('finished finding')
    mongoose.connection.close()
})
