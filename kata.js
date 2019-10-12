let rover = {
    direction: 'N',
    x: 0,
    y: 0,
    travelLog:[],
};

let grid = {
    rows: 10,
    columns: 10,
    obstacles: [{ x: 1, y: 1 }, { x: 5, y: 6 }],
    rovers: []
};

function turnLeft(rover) {
    switch (rover.direction) {
        case 'N':
            rover.direction = 'W';
            break;
        case 'W':
            rover.direction = 'S';
            break;
        case 'S':
            rover.direction = 'E';
            break;
        case 'E':
            rover.direction = 'N';
            break;
    };
    console.log(`Rover turned facing ${rover.direction}`);
};

function turnRight(rover) {
    switch (rover.direction) {
        case 'N':
            rover.direction = 'E';
            break;
        case 'E':
            rover.direction = 'S';
            break;
        case 'S':
            rover.direction = 'W';
            break;
        case 'W':
            rover.direction = 'N';
            break;
    };
    console.log(`Rover turned facing ${rover.direction}`);
};

function moveForward(rover) {
    newPosition = { x: rover.x, y: rover.y }
    switch (rover.direction) {
        case 'W':
            newPosition.y--;
            break;
        case 'S':
            newPosition.x++;
            break;
        case 'E':
            newPosition.y++;
            break;
        case 'N':
            newPosition.x--;
            break;
    };
    let canMove = isValidPosition(grid, newPosition)

    if (canMove) {
        rover.x = newPosition.x
        rover.y = newPosition.y
        travelLog(rover);
    } else {
        console.log("Rover found obstacle at ", newPosition)
    }

};

function moveBackwards(rover) {
    newPosition = { x: rover.x, y: rover.y }
    switch (rover.direction) {
        case 'W':
            newPosition.y++;
            break;
        case 'S':
            newPosition.x--;
            break;
        case 'E':
            newPosition.y--;
            break;
        case 'N':
            newPosition.x++;
            break;
    };
    let canMove = isValidPosition(grid, newPosition)

    if (canMove) {
        rover.x = newPosition.x
        rover.y = newPosition.y
        travelLog(rover);
    } else {
        console.log("Rover found obstacle at ", newPosition)
    }
};

function travelLog(rover) {
    rover.travelLog.push({ x: rover.x, y: rover.y });
    console.log(`Rover has moved and his new position is x: ${rover.x} and y: ${rover.y}`);
};

function commands(rover, orders) {
    orders.split('').forEach((order) => {
        command(rover, order);
    })
};

function command(rover, order) {
    switch (order) {
        case "f":
            moveForward(rover);
            break;
        case "b":
            moveBackwards(rover);
            break;
        case "r":
            turnRight(rover);
            break;
        case "l":
            turnLeft(rover);
            break;
    };
};

function isValidPosition(grid, newPosition) {
    if (newPosition.x < 0 || newPosition.y < 0) {
        return false
    }

    if (newPosition.x > grid.columns) {
        return false
    }

    if (newPosition.y > grid.rows) {
        return false
    }

    let collidesWithAnObstacle = false;
    grid.obstacles.forEach((obstacle) => {
        if (obstacle.x === newPosition.x && obstacle.y === newPosition.y) {
            collidesWithAnObstacle = true;
        }
    })
    return !collidesWithAnObstacle;
}
console.log(`Rover initial position is x: ${rover.x} y: ${rover.y} facing ${rover.direction}`);
commands(rover, "rfrflfb");
console.log("Rover travel log:");
console.log(rover.travelLog);

