import express from "express";

let FAKEDB = [
  {
    id: 1,
    name: "Single Cheeseburger",
    description: "A basic Cheeseburger",
    price: "$2.50",
  },
  {
    id: 2,
    name: "Double Cheeseburger",
    description: "A double Cheeseburger",
    price: "$3.50",
  },
  {
    id: 3,
    name: "Triple Cheeseburger",
    description: "A triple Cheeseburger",
    price: "$4.50",
  },
];

export default class BurgerController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:burgerId", this.getOne)
      .post("", this.create)
      .delete("/:burgerId", this.delete)
      .use(this.defaultError);
  }
  getAll(req, res, next) {
    res.send(FAKEDB);
  }
  getOne(req, res, next) {
    let foundBurger = FAKEDB.find((burger) => burger.id == req.params.burgerId);
    if (!foundBurger) {
      return res.status(400).send("Invalid ID");
    }
    res.send(foundBurger);
  }
  create(req, res, next) {
    let newBurger = {
      id: FAKEDB.length + 1,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    FAKEDB.push(newBurger);
    res.send({ message: "Successfully created data!", newBurger });
  }
  delete(req, res, next) {
    let index = FAKEDB.findIndex((burger) => burger.id == req.params.burgerId);
    if (index == -1) {
      return res.status(400).send("Invalid ID");
    }
    FAKEDB.splice(index, 1);
    res.send("Deleted");
  }
  defaultError(req, res, next) {
    res.status(404).send("Route not found in Burger Controller");
  }
}
