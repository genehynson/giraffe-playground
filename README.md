# Giraffe Playground

This playground contains examples of the React-based [Giraffe](https://github.com/influxdata/giraffe) virtualization library created by InfluxData.

Giraffe examples included thus far:
- Band plot

## What's inside:

**Client:**

React app created with create-react-app that uses Giraffe to render plots. See the `client` directory.

**Server**

ExpressJS server that uses both the [InfluxDB API](https://docs.influxdata.com/influxdb/v2.0/reference/api/) and the [influxdb-client-js](https://github.com/influxdata/influxdb-client-js) library to query data from an InfluxDB instance. See `server` directory.

## How to:

**Start server**

1. Navigate to `server` directory in terminal
2. Export your environment variables

```sh
export INFLUX_URL=http://localhost:9999
export INFLUX_TOKEN=foo
export ORG_ID=1234
export BUCKET_NAME=my-bucket
```
3. `npm run server`
4. Server starts on port 3001

**Start UI**

1. Navigate to `client` directory in second terminal
2. `npm start`
3. Navigate to `localhost:3000`

# Examples

## Band Plot - CPU Usage

To show off the Band plot, we'll be plotting our CPU usage! 

TODO: add setup instructions for influxdb, telegraf

# Credits

This project was inspired by @hoorayimhelping 's [giraffeboi](https://github.com/hoorayimhelping/giraffeboi).