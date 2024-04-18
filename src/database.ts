import mongoose from "mongoose";
import Bluebird from "bluebird";

export default async function Database(){
  return new Promise(resolve => {
    mongoose.Promise = Bluebird;



    //@ts-ignore
    mongoose.connect('mongodb+srv://digitalmoon:032211@cluster0.p1zcpyw.mongodb.net/afasys-cred');

    mongoose.connection.on(`connected`, async () => {
      console.log(`MongoDB connected`);

    });

    mongoose.connection.on(`error`, (error:any) => {
      console.log(`MongoDB error => `, error)
    })

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('connected', resolve);



  })
}