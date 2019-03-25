import React, { Component } from 'react';
import data from './IBM_Prices.json';

class Graph extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.drawGraph(data);
    }

    drawGraph = (dataArr) => {
        const canvas = this.refs.canvas; // refers to the ref attribute in render()
        const ctx = canvas.getContext("2d"); // create an object to draw on

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // declare graph start and end
        let graphTop = 50;
        let graphBottom = 475;
        let graphLeft = 50;
        let graphRight = 975;
        let graphHeight = 425; // graphBottom - graphTop
        let graphMax = 23;
        let graphMin = 19;
        let arrayLen = dataArr.length; // length of data set
        let graphLen = 10; // number of data points to be plotted

        ctx.font = "16px Arial"; // set font for fillText()

        // draw X and Y axis
        ctx.beginPath();
        ctx.moveTo( graphLeft, graphBottom);
        ctx.lineTo( graphRight, graphBottom);
        ctx.lineTo( graphRight, graphTop);
        ctx.stroke();

        // draw reference line at top of graph
        ctx.beginPath();
        // set light grey color for reference lines
        ctx.strokeStyle = "#BBB";
        ctx.moveTo( graphLeft, graphTop );
        ctx.lineTo( graphRight, graphTop );
        // draw reference values for price
        ctx.fillText( "23", graphRight + 15, graphTop);
        ctx.fillText( "19", graphRight + 15, graphBottom);
        ctx.stroke();
        
        // draw reference line 1/4 up from the bottom of the graph
        ctx.beginPath();
        ctx.moveTo( graphLeft, ( graphHeight ) / 4 * 3 + graphTop );
        ctx.lineTo( graphRight, ( graphHeight ) / 4 * 3 + graphTop );
        ctx.fillText( "20", graphRight + 15, ( graphHeight ) / 4 * 3 + graphTop);
        ctx.stroke();
        
        // draw reference line 1/2 way up the graph
        ctx.beginPath();
        ctx.moveTo( graphLeft, ( graphHeight ) / 2 + graphTop );
        ctx.lineTo( graphRight, ( graphHeight ) / 2 + graphTop );
        ctx.fillText( "21", graphRight + 15, ( graphHeight ) / 2 + graphTop);
        ctx.stroke();
        
        // draw reference line 3/4 up from the bottom of the graph
        ctx.beginPath();
        ctx.moveTo( graphLeft, ( graphHeight ) / 4 * 1 + graphTop );
        ctx.lineTo( graphRight, ( graphHeight ) / 4 * 1 + graphTop );
        ctx.fillText( "22", graphRight + 15, ( graphHeight ) / 4 * 1 + graphTop);
        ctx.stroke();

        // draw titles
        ctx.fillText( "20-Day Moving Average of IBM Closing Price", graphLeft, graphTop / 2);
        ctx.fillText( "Date", graphRight / 2 + graphLeft, graphBottom + 75);
        ctx.fillText( "Price", graphRight + 50, graphHeight / 2 + graphTop);

        // draw lines and points for graph
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.font = "14px Arial";
        // add first point in the graph
        let firstPoint = this.get20DayMovingAverage(dataArr, 20);
        let ptX = graphLeft;
        let ptY = graphHeight - (firstPoint - graphMin) / (graphMax - graphMin) * graphHeight  + graphTop;
        ctx.moveTo( ptX, ptY );
        ctx.arc(ptX, ptY, 5, 0, 2 * Math.PI, false)
        // draw reference value for date
        ctx.fillText( dataArr[ 20 ].Date, graphLeft - 35, graphBottom + 25);

        // loop over data and add points starting from the next index in the array as the first has been added already
        for( let i = 21; i < arrayLen; i++ ) {
            let movingAvg = this.get20DayMovingAverage(dataArr, i);
            let ptX = graphRight / graphLen * (i - 20) + graphLeft;
            let ptY = graphHeight - (movingAvg - graphMin) / (graphMax - graphMin) * graphHeight  + graphTop;
            ctx.lineTo( ptX, ptY );
            ctx.arc(ptX, ptY, 5, 0, 2 * Math.PI, false)
            // draw reference value for date
            ctx.fillText( dataArr[ i ].Date, graphRight / graphLen * (i - 20) + graphLeft - 35, graphBottom + 25);
            
        }
        
        ctx.stroke(); // draw the graph
    }

    get20DayMovingAverage = (dataArr, i) => {
        let total = 0;
        let subData = dataArr.slice(i - 19, i + 1)
        for (let j = 0; j < subData.length; j++) {
            total += subData[j].Close
        }
        console.log("movingAvg", total/20)
        return total/20;
    }

    render() {
            return (
            <div className="graph">
                <canvas ref="canvas"/>
            </div>
          );
        }
}

export default Graph;