# Bootsy Domo
A simple setup to control our Klik Aan Klik Uit lights from the interwebz.

A big shoutout to [Fuzzilogic](https://bitbucket.org/fuzzillogic/) for doing all the heavy lifting.

## Hardware

- [C.H.I.P.](https://docs.getchip.com/chip.html) (with a few tweaks you can use a Raspberry PI)
- [Arduino](https://www.arduino.cc) I used an uno
- [Transmitter module TX433N (433.9MHz)](https://www.bitsandparts.eu/RF/RF-Zender-TX433N-(900-6896)-433MHz-Velleman/p121950)
- [RF Link Transmitter - 434MHz](https://www.sparkfun.com/products/10534)
- A few wires and a breadboard

## How does it work?

There's a node server on the C.H.I.P. which hosts a little website with buttons to turn each light on and off.

The server controls a few pins on the C.H.I.P. through the excellent [Johnny Five](http://johnny-five.io/) platform. These pins are connected to an Arduino.

The Arduino controls the Transmitter through the [433Mhz for Arduino library](https://bitbucket.org/fuzzillogic/433mhzforarduino/wiki/Home).

For setup of the Arduino & retrieving the address of your transmitter, see this [bitbucket](https://bitbucket.org/fuzzillogic/433mhzforarduino/wiki/Home)

### Developing & deploying

Install dependencies:
```
yarn
```

Run a webpack dev server:
```
npm run start
```

Build with stage production:
```
npm run build
```

Run the server & site from the C.H.I.P.
```
sudo run serve
```

Note: to access the pins we need to run with sudo.

## TODO

- Clean up, move relevant stuff to config
- Add more lights
- Add physical buttons
- Beacons!!!
- Move website to heroku
- Use [pubnub](https://www.pubnub.com/) to commincate between node & site
