# virus-simulation

This p5.js web-application simulates a virus and shows important values via a graph. <br>
It is also applicable to COVID-19 with adjusting the parameters. <br>
Parameters you can adjust are:
- number of cells
- diameter of a cell (i.e. size of a cell)
- ticks per day
- infection propability
- propability of dying
- propability of getting the virus again after the cell has recovered

![virus simulator](https://github.com/moritzmitterdorfer/virus-simulation/blob/master/img.PNG)

<br>
It contains: 

## Cells
Things that can be infected. Four possible states:
- dead
- recovere
- infected
- healthy

## System
The system contains cells and simulates an environment. 

## System Observer
Used to keep track of the number of dead, infected and healthy cells and cells that have already recovered. 
