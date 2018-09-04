import { Layer, architect, Construct, methods, Neat } from "neataptic"

let arr = []
for (let i = 1; i < 101; i++) {
    arr.push(i);
}


module.exports = async function execute(stock) {

    if (network) {
        network.clear();
        inputL.clear();
        hidden1.clear();
        hidden2.clear();
        hidden3.clear();
        output.clear();
    }

    var inputL = new Layer.Dense(1);
    var hidden1 = new Layer.LSTM(10);
    var hidden2 = new Layer.LSTM(10);
    var hidden3 = new Layer.LSTM(10);
    var output = new Layer.Dense(1);

    // connect however you want
    inputL.connect(hidden1);
    hidden1.connect(hidden2);
    hidden2.connect(hidden3);
    hidden3.connect(output);

    var network = architect.Construct([inputL, hidden1, hidden2, hidden3, output]);


    var trainingData = []

    for (let i = 0; i < stock.length - 1; i++) {
        var inout = { input: [(stock[i] / stock[stock.length] * 1.6)], output: [stock[i + 1] / (stock[stock.length] * 1.6)] };
        trainingData.push(inout);
    }



    network.train(trainingData, {
        log: 500,
        iterations: 20000,
        error: 0.03,
        clear: true,
        rate: 0.05,
    });

    await network.evolve(trainingData, {
        mutation: methods.mutation.ALL,
        mutationRate: 0.4,
        clear: true,
        cost: methods.cost.MSE,
        error: 0.03,
        log: 1000,
        iterations: 20000
    }).then(function (res) {
        var results = {
            error: methods.cost.mse,
            generations: Neat.generation,
            time: Date.now() - Neat.start,
            evolved: Neat.fittest
        };
    });



    for (var i in trainingData) {
        var input = trainingData[i].input;
        var output = network.activate([input]);
    }

    for (var i = 0; i < 1; i++) {
        var input = output;
        var output = network.activate([input]);
        console.log(output * (stock[stock.length] * 1.6));
        $(".predict").text(output * (stock[stock.length] * 1.6)).attr("class", "centerHighlight");
    }

}
