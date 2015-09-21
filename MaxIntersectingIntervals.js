/**
 * @fileOverview a simple algorithm that finds the interval with max intersecting intervals of given
 */

var testIntervals = [ [1,2], [0,5], [3,8], [2,10],[0,7], [15, 25], [11,25] ];
function Interval(start, end){
    this.start = start;
    this.end = end;
}
Interval.prototype.compareToStart = function(one, two){
    if(arguments.length == 1){
        two = one;
        one = this;
    }
    return one.start - two.start;
};
Interval.prototype.compareToEnd = function(one, two){
    if(arguments.length == 1){
        two = one;
        one = this;
    }
    return one.end - two.end;
};
function convertToIntervals(array){
    return array.map(function(item){
        return new Interval(item[0], item[1]);
    });
};

function getItertor(intervals){
    var sIndex = 0, eIndex = 0;
    var sIntervals = intervals.slice(0).sort(Interval.prototype.compareToStart);
    var eIntervals = intervals.slice(0).sort(Interval.prototype.compareToEnd);
    return function getNext(){
        if(eIndex < eIntervals.length && (sIndex == sIntervals.length || eIntervals[eIndex].end <=sIntervals[sIndex].start)){
            eIndex++;
            return { point: eIntervals[eIndex-1].end, interval: eIntervals[eIndex-1], isEnd: true};
        } else if(sIndex < sIntervals.length) {
            sIndex++;
            return { point: sIntervals[sIndex-1].start, interval: sIntervals[sIndex-1], isStart: true};
        }else{
            return null;
        }
    }
}

function getMaxCollisionsInterval(intervals){
    var openedIntervals = [];
    var prevPoint = -Number.Infinity;
    var iterator = getItertor(intervals);
    var maxInterval = {count:0};
    var curr = null;
    while(curr = iterator()){
        if(curr.isStart){
            openedIntervals.push(curr.interval);
        } else{
            openedIntervals.splice(openedIntervals.indexOf(curr.interval), 1);
        }
        if(openedIntervals.length > maxInterval.count){
            maxInterval = new Interval(prevPoint, curr.point);
            maxInterval.count = openedIntervals.length;
            maxInterval.intervals = openedIntervals.slice(0);
        }
        prevPoint = curr.point;
    }
    return maxInterval;
}
var intervals = convertToIntervals(testIntervals);
var result = getMaxCollisionsInterval(intervals);
console.log(intervals);
visualize(intervals);
console.log(result);

function visualize(intervals){
    for(var i = 0;  i < intervals.length; i++){
        var interval = intervals[i];
        var line = (new Array(interval.start)).join(".") + (new Array(interval.end - interval.start)).join("-");
        console.log(line);
    }
}

 