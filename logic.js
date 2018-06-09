var regression = require("regression");
var cov = require("compute-covariance");
var variance = require('compute-variance');

var varTot = 0;
var weights = [.1, .08, .12, .07, .13, .1, .1, .12, .08, .1];


var stockList = [];

var stock1 = [20.1, 22.4, 23.2, 25.8];
var stock2 = [13.1, 11.4, 10.2, 9.5];
var stock3 = [20.1, 22.4, 23.2, 25.8];
var stock4 = [39.1, 58.4, 48.2, 67.5];;
var stock5 = [2.1, 3.4, 4.2, 5.5];;
var stock6 = [29.1, 26.4, 24.2, 25.5];;
var stock7 = [40.1, 43.4, 43.2, 43.5];
var stock8 = [12.1, 11.4, 10.2, 9.5];
var stock9 = [28.1, 12.4, 29.2, 30.5];
var stock10 = [26.1, 12.3, 34.5, 32.2];

stockList.push(stock1);
stockList.push(stock2);
stockList.push(stock3);
stockList.push(stock4);
stockList.push(stock5);
stockList.push(stock6);
stockList.push(stock7);
stockList.push(stock8);
stockList.push(stock9);
stockList.push(stock10);



var covariances = cov(stockList, {});
console.log(covariances);

function calculateVariance() {
    switch (stockList.length) {
        case 1:
            varTot += covariances[0][0]
            break
        case 2:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (2 * (weights[0] * weights[1]) * covariances[0][1]);
            break
        case 3:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]);
            break
        case 4:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]);
            break
        case 5:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]);
            break
        case 6:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (Math.pow(weights[5], 2) * covariances[5][5]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]) + (2 * (weights[0] * weights[5]) * covariances[0][5]) + (2 * (weights[1] * weights[5]) * covariances[1][5]) + (2 * (weights[2] * weights[5]) * covariances[2][5]) + (2 * (weights[3] * weights[5]) * covariances[3][5]) + (2 * (weights[4] * weights[5]) * covariances[4][5]);
            break
        case 7:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (Math.pow(weights[5], 2) * covariances[5][5]) + (Math.pow(weights[6], 2) * covariances[6][6]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]) + (2 * (weights[0] * weights[5]) * covariances[0][5]) + (2 * (weights[1] * weights[5]) * covariances[1][5]) + (2 * (weights[2] * weights[5]) * covariances[2][5]) + (2 * (weights[3] * weights[5]) * covariances[3][5]) + (2 * (weights[4] * weights[5]) * covariances[4][5]) + (2 * (weights[0] * weights[6]) * covariances[0][6]) + (2 * (weights[1] * weights[6]) * covariances[1][6]) + (2 * (weights[2] * weights[6]) * covariances[2][6]) + (2 * (weights[3] * weights[6]) * covariances[3][6]) + (2 * (weights[4] * weights[6]) * covariances[4][6]) + (2 * (weights[5] * weights[6]) * covariances[5][6]);
            break
        case 8:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (Math.pow(weights[5], 2) * covariances[5][5]) + (Math.pow(weights[6], 2) * covariances[6][6]) + (Math.pow(weights[7], 2) * covariances[7][7]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]) + (2 * (weights[0] * weights[5]) * covariances[0][5]) + (2 * (weights[1] * weights[5]) * covariances[1][5]) + (2 * (weights[2] * weights[5]) * covariances[2][5]) + (2 * (weights[3] * weights[5]) * covariances[3][5]) + (2 * (weights[4] * weights[5]) * covariances[4][5]) + (2 * (weights[0] * weights[6]) * covariances[0][6]) + (2 * (weights[1] * weights[6]) * covariances[1][6]) + (2 * (weights[2] * weights[6]) * covariances[2][6]) + (2 * (weights[3] * weights[6]) * covariances[3][6]) + (2 * (weights[4] * weights[6]) * covariances[4][6]) + (2 * (weights[5] * weights[6]) * covariances[5][6]) + (2 * (weights[0] * weights[7]) * covariances[0][7]) + (2 * (weights[1] * weights[7]) * covariances[1][7]) + (2 * (weights[2] * weights[7]) * covariances[2][7]) + (2 * (weights[3] * weights[7]) * covariances[3][7]) + (2 * (weights[4] * weights[7]) * covariances[4][7]) + (2 * (weights[5] * weights[7]) * covariances[5][7]) + (2 * (weights[6] * weights[7]) * covariances[6][7]);
            break
        case 9:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (Math.pow(weights[5], 2) * covariances[5][5]) + (Math.pow(weights[6], 2) * covariances[6][6]) + (Math.pow(weights[7], 2) * covariances[7][7]) + (Math.pow(weights[8], 2) * covariances[8][8]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]) + (2 * (weights[0] * weights[5]) * covariances[0][5]) + (2 * (weights[1] * weights[5]) * covariances[1][5]) + (2 * (weights[2] * weights[5]) * covariances[2][5]) + (2 * (weights[3] * weights[5]) * covariances[3][5]) + (2 * (weights[4] * weights[5]) * covariances[4][5]) + (2 * (weights[0] * weights[6]) * covariances[0][6]) + (2 * (weights[1] * weights[6]) * covariances[1][6]) + (2 * (weights[2] * weights[6]) * covariances[2][6]) + (2 * (weights[3] * weights[6]) * covariances[3][6]) + (2 * (weights[4] * weights[6]) * covariances[4][6]) + (2 * (weights[5] * weights[6]) * covariances[5][6]) + (2 * (weights[0] * weights[7]) * covariances[0][7]) + (2 * (weights[1] * weights[7]) * covariances[1][7]) + (2 * (weights[2] * weights[7]) * covariances[2][7]) + (2 * (weights[3] * weights[7]) * covariances[3][7]) + (2 * (weights[4] * weights[7]) * covariances[4][7]) + (2 * (weights[5] * weights[7]) * covariances[5][7]) + (2 * (weights[6] * weights[7]) * covariances[6][7]) + (2 * (weights[0] * weights[8]) * covariances[0][8]) + (2 * (weights[1] * weights[8]) * covariances[1][8]) + (2 * (weights[2] * weights[8]) * covariances[2][8]) + (2 * (weights[3] * weights[8]) * covariances[3][8]) + (2 * (weights[4] * weights[8]) * covariances[4][8]) + (2 * (weights[5] * weights[8]) * covariances[5][8]) + (2 * (weights[6] * weights[8]) * covariances[6][8]) + (2 * (weights[7] * weights[8]) * covariances[7][8]);
            break
        case 10:
            varTot += (Math.pow(weights[0], 2) * covariances[0][0]) + (Math.pow(weights[1], 2) * covariances[1][1]) + (Math.pow(weights[2], 2) * covariances[2][2]) + (Math.pow(weights[3], 2) * covariances[3][3]) + (Math.pow(weights[4], 2) * covariances[4][4]) + (Math.pow(weights[5], 2) * covariances[5][5]) + (Math.pow(weights[6], 2) * covariances[6][6]) + (Math.pow(weights[7], 2) * covariances[7][7]) + (Math.pow(weights[8], 2) * covariances[8][8]) + (Math.pow(weights[9], 2) * covariances[9][9]) + (2 * (weights[0] * weights[1]) * covariances[0][1]) + (2 * (weights[0] * weights[2]) * covariances[0][2]) + (2 * (weights[1] * weights[2]) * covariances[1][2]) + (2 * (weights[0] * weights[3]) * covariances[0][3]) + (2 * (weights[1] * weights[3]) * covariances[1][3]) + (2 * (weights[2] * weights[3]) * covariances[2][3]) + (2 * (weights[0] * weights[4]) * covariances[0][4]) + (2 * (weights[1] * weights[4]) * covariances[1][4]) + (2 * (weights[2] * weights[4]) * covariances[2][4]) + (2 * (weights[3] * weights[4]) * covariances[3][4]) + (2 * (weights[0] * weights[5]) * covariances[0][5]) + (2 * (weights[1] * weights[5]) * covariances[1][5]) + (2 * (weights[2] * weights[5]) * covariances[2][5]) + (2 * (weights[3] * weights[5]) * covariances[3][5]) + (2 * (weights[4] * weights[5]) * covariances[4][5]) + (2 * (weights[0] * weights[6]) * covariances[0][6]) + (2 * (weights[1] * weights[6]) * covariances[1][6]) + (2 * (weights[2] * weights[6]) * covariances[2][6]) + (2 * (weights[3] * weights[6]) * covariances[3][6]) + (2 * (weights[4] * weights[6]) * covariances[4][6]) + (2 * (weights[5] * weights[6]) * covariances[5][6]) + (2 * (weights[0] * weights[7]) * covariances[0][7]) + (2 * (weights[1] * weights[7]) * covariances[1][7]) + (2 * (weights[2] * weights[7]) * covariances[2][7]) + (2 * (weights[3] * weights[7]) * covariances[3][7]) + (2 * (weights[4] * weights[7]) * covariances[4][7]) + (2 * (weights[5] * weights[7]) * covariances[5][7]) + (2 * (weights[6] * weights[7]) * covariances[6][7]) + (2 * (weights[0] * weights[8]) * covariances[0][8]) + (2 * (weights[1] * weights[8]) * covariances[1][8]) + (2 * (weights[2] * weights[8]) * covariances[2][8]) + (2 * (weights[3] * weights[8]) * covariances[3][8]) + (2 * (weights[4] * weights[8]) * covariances[4][8]) + (2 * (weights[5] * weights[8]) * covariances[5][8]) + (2 * (weights[6] * weights[8]) * covariances[6][8]) + (2 * (weights[7] * weights[8]) * covariances[7][8]) + (2 * (weights[0] * weights[9]) * covariances[0][9]) + (2 * (weights[1] * weights[9]) * covariances[1][9]) + (2 * (weights[2] * weights[9]) * covariances[2][9]) + (2 * (weights[3] * weights[9]) * covariances[3][9]) + (2 * (weights[4] * weights[9]) * covariances[4][9]) + (2 * (weights[5] * weights[9]) * covariances[5][9]) + (2 * (weights[6] * weights[9]) * covariances[6][9]) + (2 * (weights[7] * weights[9]) * covariances[7][9]) + (2 * (weights[8] * weights[9]) * covariances[8][9]);
            break
        default:
            console.log("error");
            break
    }
}

calculateVariance();
console.log(varTot);