//mongodb+srv://gabrielffseal:<password>@cluster0.rezkxaz.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://gabrielffseal:tutuga@database01.zl0su17.mongodb.net/?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
  