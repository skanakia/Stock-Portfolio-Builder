var regression = require("regression");
var cov = require("compute-covariance");
var variance = require('compute-variance');

var varTot = 0;
var weights = [.25, .25, .5];


var stockList = [];
var stock1 = [20.1, 22.4, 23.2, 25.8];
var stock2 = [13.1, 11.4, 10.2, 9.5];
var stock3 = [20.1, 22.4, 23.2, 25.8];

stockList.push(stock1);
stockList.push(stock2);
stockList.push(stock3);


var covariances = cov(stockList, {});
console.log(covariances);

function calculateVariance() {
    switch (stockList.length) {
        case 1:
            varTot += covariances[0][0]
            break
        case 2:
            varTot += (Math.pow(weights[0],2) * covariances[0][0]) + (Math.pow(weights[1],2) * covariances[1][1]) + (2 * (weights[0] * weights[1]) * covariances[0][1]);
            break
        case 3:
            varTot += (Math.pow(weights[0],2) * covariances[0][0]) + (Math.pow(weights[1],2) * covariances[1][1]) + (Math.pow(weights[2],2) * covariances[2][2]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]);
            break
        case 4:
            varTot += (Math.pow(weights[0],2) * covariances[0][0]) + (Math.pow(weights[1],2) * covariances[1][1]) + (Math.pow(weights[2],2) * covariances[2][2]) + (Math.pow(weights[3],2) * covariances[3][3]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]);
            break
        case 5:

            break
        case 6:

            break
        case 7:

            break
        case 8:

            break
        case 9:

            break
        case 10:

            break
        default:
            console.log("error");
            break
    }
}

calculateVariance();
console.log(varTot);