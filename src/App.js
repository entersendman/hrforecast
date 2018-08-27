import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

// Import Material UI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
    margin: 10,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
});

class App extends Component {
  state = {
    data: [],
  };

  // Get weather data from https://www.ncdc.noaa.gov/cdo-web
  componentWillMount() {
    axios
      .get(
        'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?limit=1000&datasetid=GHCND&stationid=GHCND:USW00003928&startdate=2017-05-01&enddate=2017-06-01&datatypeid=TMIN&datatypeid=TMAX&datatypeid=PRCP&datatypeid=AWND&datatypeid=TAVG',
        { headers: { token: 'toKZtqQKUbUWGgzqyuqXJNwiInoNDBSi' } },
      )
      .then(res => {
        const data = res.data.results.sort(function(a, b) {
          return a.value - b.value;
        });
        console.log(data);
        this.setState({
          data: data,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.state.data.map(item => {
          return (
            <Card className={classes.card} key={Math.random()}>
              <CardContent>
                <Typography
                  variant="headline"
                  component="h2"
                  className={classes.title}
                  color="textSecondary"
                >
                  Date: {item.date}
                </Typography>
                <Typography variant="headline" component="h3">
                  Attributes: {item.attributes}
                </Typography>
                <Typography variant="headline" component="h3">
                  Value: {item.value}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(App);
