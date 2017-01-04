import CHIP_IO.GPIO as GPIO
import sys, json

# We need a way to control multiple lights,
# we could use multiple pins, but perhaps PWM or
# UART would give us more options available for communicating
#
# @TODO get pin setup from config
GPIO.setup('XIO-P0', GPIO.OUT)

for line in sys.stdin:
  print(line)
  parsed_json = json.loads(line)
  if parsed_json['state']:
    print('GPIO.HIGH')
    GPIO.output('XIO-P0', GPIO.HIGH)
  else:
    print('GPIO.LOW')
    GPIO.output('XIO-P0', GPIO.LOW)
