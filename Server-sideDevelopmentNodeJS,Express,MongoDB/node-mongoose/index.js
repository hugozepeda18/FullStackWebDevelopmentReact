const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)

//FORM 1
/* connect.then((db) => {
    console.log('Connected correctly to server')

    var newDish = Dishes({
        name: 'Uthappizza', 
        description: 'test'
    })

    newDish.save()
        .then((dish) => {
            console.log(dish)

            return Dishes.find({}).exec()
        })
        .then(dishes => {
            console.log(dishes)

            return Dishes.remove({})
        })
        .then(() => {
            return moongose.connection.close()
        })
        .catch((err) => {
            console.log(err)
        })
}) */
//FORM 2
connect.then((db) => {
    console.log('Connected correctly to server')

    Dishes.create({
        name: 'Uthappizza', 
        description: 'test'
    })
    .then((dish) => {
        console.log(dish)

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'},
        },{ 
            new: true
        }).exec()
    })
    .then(dish => {
        console.log(dish)

        dish.comments.push({
            rating: 5,
            comment: 'I am getting a sinking feeling.',
            author: 'Hugo Zepeda'
        })

        return dish.save()
    })
    .then((dish) => {
        console.log(dish)
        return Dishes.remove({})
    })
    .then(() => {
        return moongose.connection.close()
    })
    .catch((err) => {
        console.log(err)
    })
})