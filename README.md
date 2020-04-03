# US COVID-19 Tracker

https://www.us-covid-tracker.com/

![Screen Shot 2020-03-27 at 6 35 33 PM](https://user-images.githubusercontent.com/875591/77811766-dbc8ed80-7059-11ea-9825-75b0fdd72b1a.png)

## Sources, Methodology, Exceptions

New York Times cases/deaths data: https://github.com/nytimes/covid-19-data
Our "Daily New Cases" and "Daily New Deaths" values are calculated by taking the difference between the "cases"/"deaths" value of that day and the day before.

Testing data from The COVID Tracking project: https://covidtracking.com/about-data

## Development

```
yarn dev
```

Make changes to the files in /src. The files in the root of the project are the final versions that will be visible on github pages.

Deploy with `yarn deploy`
