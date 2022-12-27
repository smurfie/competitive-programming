# Advent of Code JS Solutions

This folder contains all the solution of Advent of Code made in Javascript

## How it works

For each year it has a folder with all the solutions numbered 1 to 25 twice for each day (1a, 1b).

To run a solution edit the index.html and change the "main.js" src for the solution you want to run. I.ex:

`<script src="2015/2b.js"></script>`

You can add more than one problem and they will run one after the other.

In each folder there is also an `index.html` file with all the problems in a single file.

## Things to consider

The code written is not optimal, sometimes runs for more than 10 seconds (I usually comment these cases in the code and show a message in the console/output) and a few ones more than one minute. Also the code can be hard to understand or bad structured because it is written fast. Sorry for that.

Open the console to avoid the browser to show a message when the JS takes too long and because it shows the logs in real time.

Also there are some problems (very few) that a preprocessing is needed (study the input and modify it in some way, or don't use it). I tried to comment those also in the code and in the output.

## Closures and timeouts

To be able to execute various files at the same run I added closures to all files.

To let the DOM update between different problems I added timeout between each run.

As these things could let the debugger work weird sometimes. If you want to debug the code you can set debug mode to true with:

`Utils.debug = true`

And the code will run syncronously
