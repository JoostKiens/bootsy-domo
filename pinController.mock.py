import sys, json
for line in sys.stdin:
  parsed_json = json.loads(line)
  if parsed_json['state']:
    print('GPIO.HIGH')
  else:
    print('GPIO.LOW')
