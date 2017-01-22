#include <NewRemoteReceiver.h>
#include <NewRemoteTransmitter.h>


int inputPins[] = {3, 4};
int transmitterPin = 11;


// is light on or off, false means off
int currentStates[] = {false, false};

NewRemoteTransmitter transmitter(19925766, transmitterPin, 258);


void setup() {
  for (int i = 0; i < (sizeof(inputPins) / sizeof(int)); i++) {
    pinMode(inputPins[i], INPUT_PULLUP);
  }
  Serial.begin(115200);
}

void loop() {
  for (int i = 0; i < (sizeof(inputPins) / sizeof(int)); i++) {
    int reading = digitalRead(inputPins[i]);
    

    if (reading == HIGH && currentStates[i] == false) {
      toggle(true, i);
    }
  
    if (reading == LOW && currentStates[i] == true) {
      toggle(false, i);
    }
  }
}

void toggle(int state, int index) {
  currentStates[index] = state;
  transmitter.sendUnit(index, state);
}

