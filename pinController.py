import CHIP_IO.GPIO as GPIO
import sys, json

# We need a way to control multiple lights,
# we could use multiple pins, but perhaps PWM or
# UART would give us more options available for communicating
#
# @TODO get pin setup from config
GPIO.setup('XIO-P0', GPIO.OUT)
GPIO.setup('XIO-P1', GPIO.OUT)

def main():
  for line in sys.stdin:
    parsed_json = json.loads(line)
    if parsed_json['state']:
      print('XIO-P' + str(parsed_json['index']), 'GPIO.HIGH')
      GPIO.output('XIO-P' + str(parsed_json['index']), GPIO.HIGH)
    else:
      print('XIO-P' + str(parsed_json['index']), 'GPIO.LOW')
      GPIO.output('XIO-P' + str(parsed_json['index']), GPIO.LOW)

if __name__ == '__main__':
  main()
