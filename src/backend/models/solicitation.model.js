const {model, Schema} = require('mongoose');

const solicitationSchema = Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    amount: {type: Number, default: 1, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    requiredCenter: {type: Schema.Types.ObjectId, ref: 'Center'}
})

const Solicitation = model('Solicitation', solicitationSchema);
module.exports = Solicitation;