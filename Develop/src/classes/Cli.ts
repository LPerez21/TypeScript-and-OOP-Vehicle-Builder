// src/classes/Cli.ts
import inquirer from 'inquirer';
import Truck from './Truck.js';
import Car from './Car.js';
import Motorbike from './Motorbike.js';
import Wheel from './Wheel.js';

type Vehicle = Car | Truck | Motorbike;

export default class Cli {
  private vehicles: Vehicle[];
  private selectedVehicleVin?: string;
  private exit = false;

  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  /** Generate a random VIN */
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /** Entry point */
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'mode',
          message: 'Create a new vehicle or select an existing one?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.mode === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  /** Select from existing vehicles */
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vin',
          message: 'Select a vehicle to perform actions on',
          choices: this.vehicles.map((v) => ({
            name: `${v.vin} — ${v.make} ${v.model}`,
            value: v.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.vin;
        this.performActions();
      });
  }

  /** Pick which type to create */
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        switch (answers.type) {
          case 'Car':
            this.createCar();
            break;
          case 'Truck':
            this.createTruck();
            break;
          case 'Motorbike':
            this.createMotorbike();
            break;
        }
      });
  }

  /** Create a Car */
  private createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((a) => {
        const car = new Car(
          Cli.generateVin(),
          a.color,
          a.make,
          a.model,
          parseInt(a.year),
          parseInt(a.weight),
          parseInt(a.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  /** Create a Truck */
  private createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
      ])
      .then((a) => {
        const truck = new Truck(
          Cli.generateVin(),
          a.color,
          a.make,
          a.model,
          parseInt(a.year),
          parseInt(a.weight),
          parseInt(a.topSpeed),
          [],
          parseInt(a.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  /** Create a Motorbike */
  private createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'frontWheelDiameter', message: 'Front Wheel Diameter' },
        { type: 'input', name: 'frontWheelBrand', message: 'Front Wheel Brand' },
        { type: 'input', name: 'rearWheelDiameter', message: 'Rear Wheel Diameter' },
        { type: 'input', name: 'rearWheelBrand', message: 'Rear Wheel Brand' },
      ])
      .then((a) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          a.color,
          a.make,
          a.model,
          parseInt(a.year),
          parseInt(a.weight),
          parseInt(a.topSpeed),
          [
            new Wheel(parseInt(a.frontWheelDiameter), a.frontWheelBrand),
            new Wheel(parseInt(a.rearWheelDiameter), a.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  /** Helper for towing */
  private findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'targetVin',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((v) => ({
            name: `${v.vin} — ${v.make} ${v.model}`,
            value: v.vin,
          })),
        },
      ])
      .then((ans) => {
        const toTow = this.vehicles.find((v) => v.vin === ans.targetVin)!;
        if (toTow.vin === truck.vin) {
          console.log('\nYou cannot tow yourself.\n');
        } else {
          truck.tow(toTow);
        }
        // after towing, return to the same menu
        this.performActions();
      });
  }

  /** Main action loop */
  performActions(): void {
    // find current vehicle
    const vehicle = this.vehicles.find((v) => v.vin === this.selectedVehicleVin)!;

    // build menu fresh
    const choices: string[] = [
      'Print details',
      'Start vehicle',
      'Accelerate 5 MPH',
      'Decelerate 5 MPH',
      'Stop vehicle',
      'Turn right',
      'Turn left',
      'Reverse',
    ];

    if (vehicle instanceof Truck)    choices.push('Tow');
    if (vehicle instanceof Motorbike) choices.push('Wheelie');

    choices.push('Select or create another vehicle', 'Exit');

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: `Select an action for your ${vehicle.make} ${vehicle.model}:`,
          choices,
        },
      ])
      .then((answers) => {
        const action = answers.action;

        switch (action) {
          case 'Print details':
            vehicle.printDetails();
            break;

          case 'Start vehicle':
            vehicle.start();
            break;

          case 'Accelerate 5 MPH':
            vehicle.accelerate(5);
            break;

          case 'Decelerate 5 MPH':
            vehicle.decelerate(5);
            break;

          case 'Stop vehicle':
            vehicle.stop();
            break;

          case 'Turn right':
            vehicle.turn('right');
            break;

          case 'Turn left':
            vehicle.turn('left');
            break;

          case 'Reverse':
            vehicle.reverse();
            break;

          case 'Tow':
            if (vehicle instanceof Truck) {
              return this.findVehicleToTow(vehicle);
            } else {
              console.log('\nThis action is only available for trucks.\n');
            }
            break;

          case 'Wheelie':
            if (vehicle instanceof Motorbike) {
              vehicle.wheelie();
            } else {
              console.log('\nThis action is only available for motorbikes.\n');
            }
            break;

          case 'Select or create another vehicle':
            return this.startCli();

          case 'Exit':
            this.exit = true;
            return;

          default:
            console.log('\nUnknown action — please choose again.\n');
            break;
        }

        // loop again unless they chose Exit or switched menus
        if (!this.exit) {
          this.performActions();
        }
      });
  }
}
