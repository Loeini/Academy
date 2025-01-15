export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        },
    };

    const obsevers = [];

    function start() {
        const frequency = 3000;

        setInterval(addFruit, frequency);
    }

    function subscribe(observeFunction) {
        obsevers.push(observeFunction);
    }

    function notifyAll(command) {
        for (const observeFunction of obsevers) {
            observeFunction(command);
        }
    }

    function setState(newState) {
        Object.assign(state, newState);
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX =
            "playerX" in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY =
            "playerY" in command
                ? command.playerY
                : Math.floor(Math.random() * state.screen.height);

        state.players[playerId] = {
            x: playerX,
            y: playerY,
        };

        notifyAll({
            type: "add-player",
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
        });
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: "remove-player",
            playerId: playerId,
        });
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
        };

        notifyAll({
            type: "add-fruit",
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY,
        });
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];

        notifyAll({
            type: "remove-fruit",
            fruitId: fruitId,
        });
    }

    function movePlayer(command) {
        notifyAll(command);
        const acceptedMoves = {
            w(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1;
                }
            },
            a(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1;
                }
            },
            s(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y = player.y + 1;
                }
            },
            d(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1;
                }
            },
        };

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[playerId];
        const moveFunction = acceptedMoves[keyPressed];
        if (player && moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }
        return;
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId: fruitId });
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState,
        subscribe,
        notifyAll,
        start,
    };
}
