// Define interface for the model input
interface ModelInput {
    particles: Particle[];
    particleCount: number;
    currentSpeed: number;
    currentDirection: number;
}

// Define interface for the particle object
interface Particle {
    position: [number, number];
    velocity: [number, number];
    size: number;
    id: number;
    mass?: number;
    type?: string;
    timestamp: number;
}

// Define LagrangianModel 
class LagrangianModel {
    private particles: Particle[];
    private input: ModelInput;

    constructor(input: ModelInput, particles?: Particle[]) {
        this.input = input;
        this.particles = particles || [];

        // Initialize particles if not provided
        if (!particles) {
            for (let i = 0; i < input.particleCount; i++) {
                this.particles.push({
                    position: [0, 0],
                    velocity: [0, 0],
                    size: 0,
                    id: 0,
                    mass: 0,
                    type: "",
                    timestamp: 0,
                });
            }
        }
    }

    // Function to update particle positions based on current
    private updatePositionsv0() {
        const { currentSpeed, currentDirection } = this.input;
        const currentVelocity = {
            x: currentSpeed * Math.cos(currentDirection),
            y: currentSpeed * Math.sin(currentDirection),
        };

        this.particles.forEach((particle) => {
            particle.position[0] += currentVelocity.x;
            particle.position[1] += currentVelocity.y;
        });
    }

    // Function to update particle positions based on current and elapsed time
    private updatePositions(currentTime: number, elapsedTime: number) {
        const { currentSpeed, currentDirection } = this.input;
        const currentVelocity = {
            x: currentSpeed * Math.cos(currentDirection),
            y: currentSpeed * Math.sin(currentDirection),
        };

        this.particles.forEach((particle) => {
            const timeSinceLastUpdate = currentTime - particle.timestamp;
            const deltaDistance = timeSinceLastUpdate * Math.sqrt(currentVelocity.x ** 2 + currentVelocity.y ** 2);
            particle.position[0] += deltaDistance * Math.cos(currentDirection);
            particle.position[1] += deltaDistance * Math.sin(currentDirection);
            particle.timestamp = currentTime;
        });
    }

    // Function to update particle velocities based on wind
    private updateVelocities(windSpeed: number, windDirection: number) {
        const windVelocity = {
            x: windSpeed * Math.cos(windDirection),
            y: windSpeed * Math.sin(windDirection),
        };

        this.particles.forEach((particle) => {
            particle.velocity[0] += windVelocity.x;
            particle.velocity[1] += windVelocity.y;
        });
    }

    // Function to simulate particle movement
    public simulatev0(time: number, windSpeed: number, windDirection: number) {
        // Update particle positions and velocities
        for (let t = 0; t < time; t++) {
            // this.updatePositions();
            this.updateVelocities(windSpeed, windDirection);
        }
    }
    // Function to simulate particle movement
    public simulate(time: number, windSpeed: number, windDirection: number) {
        let currentTime = Date.now();
        let lastUpdateTime = currentTime;
        // Update particle positions and velocities
        for (let t = 0; t < time; t++) {
            currentTime = Date.now();
            const elapsedTime = currentTime - lastUpdateTime;
            lastUpdateTime = currentTime;
            this.updatePositions(currentTime, elapsedTime);
            this.updateVelocities(windSpeed, windDirection);
        }
    }


    // Function to get particle positions
    public getParticlePositions() {
        return this.particles.map((particle) => particle.position);
    }

    // Function to get particle
    public getParticles() {
        return this.particles;
    }
}
// Example usage


const particlesSample: Particle[] = [
    { position: [0, 0], velocity: [0, 0], size: 1, id: 0, mass: 0, type: "", timestamp: 0 },
    { position: [1, 1], velocity: [0, 0], size: 1, id: 0, mass: 0, type: "", timestamp: 0 },
    { position: [2, 2], velocity: [0, 0], size: 1, id: 0, mass: 0, type: "", timestamp: 0 },
];

const modelInput: ModelInput = {
    particleCount: particlesSample.length,
    particles: particlesSample,
    currentSpeed: 0.5,
    currentDirection: 0,
};

const model = new LagrangianModel(modelInput);

model.simulate(100, 10, 10);

const particlePositions = model.getParticlePositions();

console.log(particlePositions);
