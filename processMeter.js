#!/usr/bin/node

process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        //process.stdout.write('we have a chunk: \n');
        //console.log(chunk.length);
        process.stdout.write(chunk);
        let myData = JSON.parse(chunk);
        let packetDate = new Date(myData.Time);
        let intervalOffset = myData.Message.TransmitTimeOffset / 16 * 1000;
        var intervalEndtime = new Date(packetDate - intervalOffset);

        console.log("StartTime\tEndTime\tkWh\tAvgWattage");
        let x = 0;
        while(x < myData.Message.DifferentialConsumptionIntervals.length){
            let intervalStarttime = new Date(intervalEndtime - 300000); //300000 miliseconds in 5 minutes
            let wattage = Math.trunc(myData.Message.DifferentialConsumptionIntervals[x] * 10 / 0.0833);
            let kwhours = myData.Message.DifferentialConsumptionIntervals[x] / 100;
            kwhours = kwhours.toFixed(2);
            console.log(intervalStarttime.toLocaleTimeString() + "\t" + intervalEndtime.toLocaleTimeString() + "\t" + kwhours + "\t" + wattage); 
            intervalEndtime = intervalStarttime;
            x++;
        }
    }
});
