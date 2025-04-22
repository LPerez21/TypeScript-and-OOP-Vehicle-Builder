// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class should extend the Vehicle class
class Motorbike extends Vehicle {
  // Declare properties of the Motorbike class
  // The properties should include vin, color, make, model, year, weight, top speed, and wheels
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // The constructor should call the constructor of the parent class, Vehicle
    super();

    // The constructor should initialize the properties of the Motorbike class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;

    // The constructor should check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
    if (wheels.length !== 2) {
      this.wheels = [new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }

    // Implement the wheelie method
    // The method should log the message "Motorbike [make] [model] is doing a wheelie!"
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // The method should call the printDetails method of the parent class
    super.printDetails();

    // The method should log the details of the Motorbike
    // The details should include the VIN, make, model, year, weight, top speed, color, and wheels
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Wheels: ${this.wheels.length}`);  // Logs number of wheels
  }

  public wheelie(): void {
    // The method should log the message "Motorbike [make] [model] is doing a wheelie!"
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
