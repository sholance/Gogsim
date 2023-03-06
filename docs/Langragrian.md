CODE DOCUMENTATION

The `LagrangianModel` simulates the movement of particles in a fluid. It takes as input the number of particles, their initial position and size, and the current speed and direction of the fluid.

It initializes the particles with zero velocity and random positions within a given range. It then updates the particle positions and velocities based on the current speed and direction of the fluid, as well as any wind velocity that is applied. The model assumes that the particles move with the fluid, but are not affected by it, and that they are small enough that they can be treated as point particles.

The class provides methods to simulate particle movement for a given time period, and to get the current positions of the particles. It also includes a private method to update particle velocities based on wind, which can be used to model the effect of wind on particle movement.

The LagrangianModel class simulates the movement of particles based on the input provided through the `ModelInput` interface.

The `ModelInput` interface defines the input parameters for the simulation. It includes the following properties:

`particles`: an array of particles
`particleCount`: the number of particles in the simulation
`currentSpeed`: the speed at which the particles are moving
`currentDirection`: the direction in which the particles are moving
The `Particle` interface defines the properties of a particle. It includes the following properties:

`position`: the current position of the particle represented as an array with two numbers indicating the x and y coordinates
`velocity`: the current velocity of the particle represented as an array with two numbers indicating the x and y components of the velocity vector
`size`: the size of the particle
`mass`: the mass of the particle
`id`: the id of the particle
`type`: the type of the particle
`timestep`: the timestep of the particle
The `LagrangianModel` class has the following methods:

`constructor(input: ModelInput)`: initializes the `input` and `particles` properties of the class based on the input provided. It creates an array of `particles` based on the `particleCount` input and initializes their `position`, `velocity`, and `size` properties.
`updatePositions()`: updates the `position` of each particle based on the `currentSpeed` and `currentDirection` input. It calculates the velocity vector based on the `currentSpeed` and `currentDirection` input and updates the position of each particle based on their current position and velocity.
`updateVelocities()`: updates the `velocity` of each particle based on wind conditions. It calculates the wind vector based on the `windSpeed` and `windDirection` input and updates the velocity of each particle based on their current velocity.
`simulate(time: number)`: simulates the movement of particles for a specified amount of `time`. It repeatedly calls the `updatePositions()` and `updateVelocities()` methods for `time` number of iterations.
`getParticlePositions()`: returns the current `position` of all particles as an array of arrays, where each inner array contains the x and y coordinates of a particle.
`getParticle()`: returns the `particles` array. 



**GENERIC USAGE

Sample code
`model.simulate(100, 10, 10);`


In the example usage of the LagrangianModel class, we simulate the movement of 100 particles for 100 iterations. The particles move at a speed of 10 m/s in a direction of 10 degrees.

**USING IN A REACT APP (Typescript)

Step 1: 
Install the package(package will be published to npm soon):

Import the `LagrangianModel` class from the package (import from docs folder for now):

`import { LagrangianModel } from '../docs/LagrangianModel';`

step 2:
Provide particle data in the following format:
```TypeScript
const particlesSample = [  {
    position: [0, 0],
    velocity: [0, 0],
    size: 1,
    mass: 1,
    id: 1,
    type: 'plastic',
    timestep: 0,
  },
  {
    position: [0, 0],
    velocity: [0, 0],
    size: 1,
    mass: 1,
    id: 2,
    type: 'plastic',
    timestep: 0,
  },
  {
    position: [0, 0],
    velocity: [0, 0],
    size: 1,
    mass: 1,
    id: 3,
    type: 'plastic',
    timestep: 0,
  },
];

```

Step 3: 
Define the input parameters for the model:

`const modelInput: ModelInput = { particleCount: particlesSample.length, particles: particlesSample,  currentSpeed: 0.5, currentDirection: 0, };`

Step 4:
Create an instance of the `LagrangianModel` class:

`const model = new LagrangianModel(modelInput);`

Step 5:
Call the `simulate()` method to simulate the movement of particles for a specified amount of time, wind speed and wind direction:

`model.simulate(100, 10, 10);`

Step 6:
Call the `getParticlePositions()` method to get the current position of all particles:

`const particlePositions = model.getParticlePositions();`

This will return an array of [x, y] positions for each particle.

To log the positions of all particles to the console, you can use the following code:

`console.log(particlePositions);`


****Notes we started with.

<!-- The Lagrangian model is what we will be using to simulate the movement of marine litter in the Gulf Of Guinea. The model will help us in calculating the movement of marine litter based on the ocean currents and winds.

How we can use the Lagrangian model to simulate the movement of marine litter in the Gulf of Guinea:

Data: we have to gather data on the ocean currents and winds in the Gulf of Guinea. We'll be sourcing this from other researches and researchers. The data we need has to show location, amount, type of marine litter, ocean currents, wind patterns, and tides that can influence the movement of marine litter. 

Then we have to determine the ocean velocity field in the Gulf of Guinea. This field represents the velocity of the water at each point in the region.

We create a set of Lagrangian particles to represent the marine litter. Each particle represents a piece of marine litter and its movement is determined by the velocity field.

For each time step, calculate the position of each particle using the velocity field. The equation for the movement of a particle at position (x, y) at time t is given by:

x(t + Δt) = x(t) + u(x(t), y(t)) * Δt
y(t + Δt) = y(t) + v(x(t), y(t)) * Δt

where u and v are the components of the velocity field and Δt is the time step.

This article might be a lot to take in, but it's a good start (https://www.tandfonline.com/doi/full/10.1080/1755876X.2019.1611708?src=recsys). If you have any questions, feel free to raise a question in FAQ

First iteration of the Lagrangian model is in the docs folder (LangrangianCodeV0.ts), final and current usable iteration is (LangrangianCode.ts). The model is written in Typescript and can be used in a React app. Will be adding more documentation to the model soon. -->