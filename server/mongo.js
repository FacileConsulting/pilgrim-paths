const { ObjectId } = require('mongodb');
const Provider = require('./models/providers');

const createProvider = (query) => {
  return new Provider(query);
}

const getAllProviders = async (query) => {
  return await Provider.find(query);
}

const deleteProvider = async (query) => {
  return await Provider.deleteOne({ _id: new ObjectId(query) });
}

const updateProvider = async (query, data) => {
  return await Provider.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const getProvider = async (query) => {
  return await Provider.findOne(query);
}

const saveInDB = async (data) => {
  await data.save();
}

module.exports = {
  getAllProviders,
  createProvider,
  deleteProvider,
  updateProvider,
  getProvider,
  saveInDB
};